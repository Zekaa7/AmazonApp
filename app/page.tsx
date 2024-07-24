// File: /home/luka/Documents/Amazon/amazon-test/app/page.tsx
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductFeed from "./components/ProductFeed"; // Ako koristiš TypeScript

export default async function Home() {
  const data = await getData();
  console.log(data.products);
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* {Banner} */}
        <Banner />

        {/* {ProductFeed} */}
        <ProductFeed products={data.products} />
      </main>
    </div>
  );
}

export async function getData() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products = await res.json();
    return {
      products,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      products: [],
    };
  }
}
