import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { formatPrice } from "../lib/utils";

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const { user, addOrder, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
        // Simple alert for guest checkout simulation or redirect to login
        alert("Пожалуйста, войдите в аккаунт для оформления заказа");
        navigate("/login");
        return;
    }

    // Create Order
    addOrder(cart, cartTotal);
    clearCart();
    navigate("/account");
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-10 text-gray-900 dark:text-white">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Контактная информация</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Имя</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Телефон</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Адрес доставки</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Город</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Индекс</label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white sm:text-sm py-2 px-3 border"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Ваш заказ</h2>
          <div className="flow-root mb-6">
            <ul className="-my-4 divide-y divide-gray-200 dark:divide-gray-800">
              {cart.map((item) => (
                <li key={item.id} className="flex py-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 dark:text-gray-400">Кол-во: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600 dark:text-gray-400">Подытог</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(cartTotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600 dark:text-gray-400">Доставка</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">Бесплатно</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Итого</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">{formatPrice(cartTotal)}</dd>
            </div>
          </div>

          <div className="mt-6">
            <Button form="checkout-form" type="submit" className="w-full" size="lg">
              Подтвердить заказ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
