// File: /home/luka/Documents/Amazon/amazon-test/app/page.tsx
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductFeed from "./components/ProductFeed";
import { Provider } from "react-redux";
import { store } from "./store";

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}
