"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import NumberFormat from "react-number-format";

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
}) {
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    setRating(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    setHasPrime(Math.random() < 0.5);
  }, []);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 text-black">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
        {/* Optional: add empty stars for remaining */}
        {Array(5 - rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-gray-300" key={`empty-${i}`} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <NumberFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"£"}
        />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052018/untitled-1_282.png?zBgfG0XEfdsPUq33GRuhu6udfY3Yu_rs&itok=39OQ7JCF"
            alt="logo"
            className="w-12"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}
