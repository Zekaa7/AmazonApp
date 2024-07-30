"use client";

import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { useSession } from "next-auth/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe.js outside of the component to avoid recreating the instance on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();

  const sumPrice = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("/api/create-checkout-session", {
        items,
        email: session?.user?.email,
      });

      const { id } = response.data;

      // Wait for the Stripe.js script to load and get the Stripe instance
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      // Redirect to Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (error) {
        console.error("Stripe redirection error:", error);
        alert("An error occurred during redirect.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <NumericFormat
                    value={sumPrice(items)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"£"}
                  />
                </span>
              </h2>
              <button
                role="link"
                onClick={handleCheckout}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
