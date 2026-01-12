import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/product/ProductCard";
import { products } from "../data/products";
import { motion } from "framer-motion";

export const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Fashion Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase"
          >
            Новая Коллекция
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-light mb-8 max-w-lg"
          >
            Элегантность и комфорт в каждой детали. Откройте для себя стиль этого сезона.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/catalog">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 border-none">
                Смотреть Каталог
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-10 tracking-tight text-gray-900 dark:text-white">Категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Женщинам", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { name: "Мужчинам", img: "https://images.unsplash.com/photo-1617137968427-85924c809a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { name: "Аксессуары", img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          ].map((cat, idx) => (
            <Link to="/catalog" key={idx} className="group relative h-96 overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src={cat.img} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {cat.name} <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Популярное</h2>
            <Link to="/catalog" className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
              Все товары
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
