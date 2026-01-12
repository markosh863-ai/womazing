import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { formatPrice } from "../lib/utils";

export const Account = () => {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Личный кабинет</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Добро пожаловать, {user.name}!</p>
        </div>
        <Button variant="outline" onClick={() => { logout(); navigate("/"); }}>
          Выйти
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* User Info */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Мои данные</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Имя</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
              <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Orders History */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">История заказов</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Заказ #{order.id}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">от {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">{formatPrice(order.total)}</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 mt-1">
                        В обработке
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">У вас пока нет заказов</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
