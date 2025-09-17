import Image from "next/image";

interface ProductCardProps {
  readonly imageUrl: string;
  readonly title: string;
  readonly genre: string;
  readonly price: number;
  readonly isNew?: boolean;
}

export default function ProductCard({
  imageUrl,
  title,
  genre,
  price,
  isNew = false,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded font-semibold">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-xs uppercase">{genre}</p>
        <h2 className="font-bold text-lg mt-1">{title}</h2>
        <p className="font-semibold mt-1">${price}</p>
        <button className="mt-4 w-full border border-gray-400 rounded px-4 py-2 font-semibold hover:bg-gray-100 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
