"use client";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { useApp } from "@/app/context/AppContext/AppContext";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Catalog() {
  const { state, fetchGames } = useApp();
  const { games, loading, availableFilters, currentPage, totalPages } = state;

  const searchParams = useSearchParams();
  const router = useRouter();
  const genre = searchParams.get("genre") || undefined;

  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    fetchGames(1, genre)?.finally(() => {
      setFilterLoading(false);
    });
  }, [genre]);

  const handleGenreChange = (value: string) => {
    setFilterLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("genre");
    } else {
      params.set("genre", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <section className="px-5 sm:px-5 lg:px-32 pt-8">
        <div className="flex justify-start lg:justify-start mb-6 w-full">
          <h2 className="text-2xl text-title font-bold uppercase sm:normal-case w-full lg:w-auto">
            Top Sellers
          </h2>
        </div>

        <div className="flex justify-start lg:justify-end mb-10 w-full">
          <div className="relative w-full lg:w-72">
            <label className="flex items-center gap-2 w-full px-4 py-2 text-xl font-semibold text-title bg-white rounded-md">
              Genre
              <span className="border-l h-5"></span>
              <select
                className="flex-1 w-full bg-white border-none px-2 py-1 text-xl font-normal text-title focus:outline-none appearance-none cursor-pointer"
                value={genre || "All"}
                onChange={(e) => handleGenreChange(e.target.value)}
              >
                <option value="All">All</option>
                {availableFilters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </label>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                alt="dropdown"
                src="/icons/dropdown.png"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 mb-10 w-full" />

      <section>
        {filterLoading ? (
          <div className="flex justify-center py-20">
            <span
              role="status"
              className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"
            ></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-5 lg:px-32">
            {games.map((game) => (
              <ProductCard
                key={game.id}
                id={game.id}
                imageUrl={game.image}
                title={game.name}
                genre={game.genre}
                price={game.price}
                isNew={game.isNew}
                description={game.description}
              />
            ))}
          </div>
        )}

        {loading && !filterLoading && (
          <div className="flex justify-center py-6">
            <span
              role="status"
              className="w-6 h-6 mt-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
            ></span>
          </div>
        )}
      </section>

      <section className="my-10 px-5 sm:px-5 lg:px-32 w-full flex justify-start">
        {currentPage < totalPages && (
          <div className="flex justify-center my-10">
            <button
              className="bg-[#585660] rounded text-white py-3 px-6 hover:bg-[#6a6872] transition flex items-center gap-2"
              onClick={() => fetchGames(currentPage + 1, genre, true)}
              disabled={loading}
            >
              SEE MORE
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
