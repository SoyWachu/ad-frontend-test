import Image from "next/image";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    title: "The Witcher 3",
    price: 19990,
    imageUrl: "/games/witcher.jpg",
    genre: "rpg",
  },
  {
    id: 2,
    title: "FIFA 24",
    price: 29990,
    imageUrl: "/games/fifa.jpg",
    genre: "sports",
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    price: 25990,
    imageUrl: "/games/cyberpunk.jpg",
    genre: "rpg",
  },
  {
    id: 4,
    title: "Minecraft",
    price: 14990,
    imageUrl: "/games/minecraft.jpg",
    genre: "sandbox",
  },
];

export default function Catalog() {
  return (
    <div>
      <section className="px-5 sm:px-5 lg:px-32 pt-8">
        <h2 className="text-2xl text-title font-bold mb-2 uppercase sm:normal-case">
          Top Sellers
        </h2>

        <div className="flex justify-end mb-6">
          <div className="relative inline-block text-left">
            <button className="flex items-center rounded-md px-4 py-2  justify-between">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-xl text-title">Genre</span>
                <span className="border-l h-5 mx-3"></span>
                <span className="text-xl text-title font-normal w-40 text-left">
                  All
                </span>
              </span>
              <Image
                alt="dropdown"
                src="/icons/dropdown.png"
                className="w-6 h-6 cursor-pointer"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 mb-6 w-full" />
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-5 lg:px-32">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              genre={product.genre}
              price={product.price}
              isNew={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
