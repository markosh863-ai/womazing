import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "../../types";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const liked = isFavorite(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-3"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Fallback изображение из Unsplash
            target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-white dark:bg-black px-2 py-1 text-xs font-medium uppercase tracking-wider text-black dark:text-white rounded-md">
            New
          </span>
        )}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product.id);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
                <Heart
                    className={`h-5 w-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-black dark:text-white"}`}
                />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black shadow-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                <ShoppingBag className="h-5 w-5" />
            </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
};
