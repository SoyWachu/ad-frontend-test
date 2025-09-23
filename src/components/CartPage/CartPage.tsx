"use client";
import React from "react";
import { useApp } from "@/app/context/AppContext/AppContext";
import Link from "next/link";

export default function CartPage() {
  const { state, dispatch } = useApp();

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const totalItems = state.cart.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );
  const totalPrice = state.cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="flex flex-col gap-6 p-6 px-5 sm:px-5 lg:px-32">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
        >
          <span>← Back to Catalog</span>
        </Link>
      </div>

      <p className="text-lg font-bold sm:text-4xl">Your Cart</p>
      <p className="text-xl">
        {totalItems} item{totalItems !== 1 ? "s" : ""}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div data-testid="cart-product-list" className="flex-1 space-y-6">
          {state.cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            state.cart.map((item) => (
              <div
                key={item.id}
                data-testid="cart-item"
                className="flex flex-col sm:flex-row gap-4 border-b p-4 transition hover:bg-gray-50 w-[95%]"
              >
                <div className="flex justify-between items-start w-full sm:w-auto">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full sm:w-72 h-54 sm:h-40 object-cover"
                  />
                  <button
                    aria-label={`remove ${item.title}`}
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors sm:hidden ml-2"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between mt-2 sm:mt-0">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400 uppercase">
                      {item.genre}
                    </p>
                    <button
                      aria-label={`remove ${item.title}`}
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-1">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    {item.quantity && item.quantity > 1 && (
                      <p className="text-gray-500 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end mt-2">
                    <p className="font-semibold">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full lg:w-[40%] flex flex-col">
          <div
            data-testid="order-summary"
            className="bg-white border rounded-lg shadow p-6"
          >
            <h2 className="font-semibold text-lg mb-1">Order Summary</h2>
            <p className="text-gray-500 text-sm mb-6">
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </p>

            <div className="space-y-3 mb-6">
              {state.cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="border-gray-300 mb-6 w-full" />

            <div className="flex justify-between font-semibold">
              <span>Order Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-4 w-full bg-[#585660] text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
