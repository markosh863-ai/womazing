import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { Trash2, ShoppingBag } from "lucide-react";

export const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useShop();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold tracking-tight mb-10 text-gray-900 dark:text-white">Корзина</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 dark:border-gray-800">
                <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                    </div>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Количество: {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 px-6 py-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Итого</h2>
              
              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600 dark:text-gray-400">Подытог</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{formatPrice(cartTotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600 dark:text-gray-400">Доставка</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">Бесплатно</dd>
                  </div>
                  <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-800">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Всего</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">{formatPrice(cartTotal)}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8">
                <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => navigate("/checkout")}
                >
                  Оформить заказ
                </Button>
              </div>
              
              <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями публичной оферты.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ваша корзина пуста</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            Похоже, вы еще ничего не добавили. Перейдите в каталог, чтобы найти что-то особенное.
          </p>
          <Link to="/catalog">
            <Button>Начать покупки</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
