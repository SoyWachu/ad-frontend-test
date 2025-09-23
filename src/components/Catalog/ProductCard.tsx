"use client";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext/AppContext";

interface ProductCardProps {
  readonly id: string;
  readonly imageUrl: string;
  readonly title: string;
  readonly genre: string;
  readonly price: number;
  readonly isNew?: boolean;
  readonly description: string;
}

export default function ProductCard({
  id,
  imageUrl,
  title,
  genre,
  price,
  isNew = false,
  description,
}: ProductCardProps) {
  const { state, dispatch } = useApp();
  const isInCart = state.cart.some((item) => item.id === id);

  const handleClick = () => {
    if (isInCart) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id,
          quantity: 1,
          title,
          price,
          imageUrl,
          genre,
          description,
        },
      });
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="w-full h-60 object-fill py-5 px-5 rounded-tl-[36px] rounded-tr-[36px]"
        />
        {isNew && (
          <span className="absolute top-8 left-8 bg-white text-black text-xs px-2 py-1 rounded font-normal border border-gray-500">
            New
          </span>
        )}
      </div>
      <div className="px-6">
        <p className="text-gray-500 text-xs uppercase">{genre}</p>
        <div className="flex justify-between align-center min-h-16">
          <h2 className="font-bold text-lg mt-1">{title}</h2>
          <p className="font-semibold mt-1">${price}</p>
        </div>
        <button
          onClick={handleClick}
          className={`mb-5 w-full border rounded px-4 py-2 font-semibold transition ${
            isInCart
              ? "bg-red-500 text-white hover:bg-red-600 border-red-500"
              : "border-gray-400 hover:bg-gray-100"
          }`}
        >
          {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
