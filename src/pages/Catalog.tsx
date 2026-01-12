import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/product/ProductCard";
import { products } from "../data/products";
import { Search, X } from "lucide-react";
import { Button } from "../components/ui/Button";

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const filterQuery = searchParams.get("filter") || "";
  
  const [sortBy, setSortBy] = useState("default");

  // Filter products based on search and other filters
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Category/Type filter (simple implementation)
    if (filterQuery === "new") {
      return product.isNew;
    }
    
    if (filterQuery === "men") {
        // Mock logic: assuming some categories are men's
        return ["Худи", "Джинсы", "Костюмы", "Обувь", "Рубашки", "Брюки"].includes(product.category);
    }
    
    if (filterQuery === "women") {
        // Mock logic
        return ["Платья", "Топы", "Юбки", "Аксессуары"].includes(product.category);
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  const clearSearch = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
            {searchQuery ? `Результаты поиска: "${searchQuery}"` : "Каталог"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Найдено {filteredProducts.length} товаров
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          {searchQuery && (
            <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSearch}
                className="flex items-center gap-2"
            >
                <X className="h-4 w-4" /> Сбросить поиск
            </Button>
          )}

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-gray-300 dark:border-gray-700 py-2 pl-3 pr-10 text-base focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm rounded-none border bg-transparent text-gray-900 dark:text-white dark:bg-gray-950"
          >
            <option value="default" className="dark:bg-gray-900">Сортировка: По умолчанию</option>
            <option value="price-asc" className="dark:bg-gray-900">Цена: По возрастанию</option>
            <option value="price-desc" className="dark:bg-gray-900">Цена: По убыванию</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-gray-900 rounded-lg">
          <Search className="h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ничего не найдено</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            Попробуйте изменить поисковый запрос или посмотрите весь каталог.
          </p>
          <Button onClick={clearSearch}>
            Показать все товары
          </Button>
        </div>
      )}
    </div>
  );
};
