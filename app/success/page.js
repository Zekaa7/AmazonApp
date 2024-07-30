"use client";

import React from "react";
import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thnak you, your order has been confirmed!
            </h1>
          </div>
        </div>
        <p>
          Thank you for shipping with us. We'll send a confirmation once your
          item has shipped. If you would like to buy more stuffs, please press
          the link below
        </p>
        <button onClick={() => router.push("/")} className="button mt-8">
          Go to my orders
        </button>
      </main>
    </div>
  );
}
