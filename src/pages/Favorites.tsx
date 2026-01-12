import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/Button";

export const Favorites = () => {
  const { favorites } = useShop();
  
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold tracking-tight mb-10 text-gray-900 dark:text-white">Избранное</h1>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
            <Heart className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ваш список избранного пуст</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            Сохраняйте понравившиеся товары, чтобы не потерять их.
          </p>
          <Link to="/catalog">
            <Button>Перейти в каталог</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
