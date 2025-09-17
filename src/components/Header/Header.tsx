import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-5 sm:px-5 lg:px-32 py-4 bg-header text-white">
      <h1 className="text-2xl text-[#585660] font-bold">GamerShop</h1>
      <Image
        alt="cart"
        src="/icons/cart.png"
        className="w-6 h-6 cursor-pointer"
        width={24}
        height={24}
      />
    </header>
  );
}
