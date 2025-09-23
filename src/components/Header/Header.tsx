"use client";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext/AppContext";
import Image from "next/image";

export default function Header() {
  const { state } = useApp();
  return (
    <header className="flex justify-between items-center px-5 sm:px-5 lg:px-32 py-4 bg-header text-white">
      <Link href="/" className="text-2xl text-[#585660] font-bold">
        GamerShop
      </Link>
      <Link href="/cart" className="relative">
        <Image
          alt="cart"
          src="/icons/cart.png"
          className="w-6 h-6 cursor-pointer"
          width={24}
          height={24}
        />
        {state.cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {state.cart.length}
          </span>
        )}
      </Link>
    </header>
  );
}
