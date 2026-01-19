import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "../types";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered";
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, name: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  addOrder: (items: CartItem[], total: number) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Загрузка данных при инициализации
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Загружаем заказы для текущего пользователя
      const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
      const userOrders = allOrders.filter((order: Order & { userId?: string }) => order.userId === userData.id);
      setOrders(userOrders);
    }
  }, []);

  // Сохранение заказов при изменении
  useEffect(() => {
    if (user && orders.length >= 0) {
      const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
      // Удаляем старые заказы этого пользователя
      const otherOrders = allOrders.filter((order: Order & { userId?: string }) => order.userId !== user.id);
      // Добавляем новые заказы с userId
      const ordersWithUserId = orders.map(order => ({ ...order, userId: user.id }));
      localStorage.setItem("allOrders", JSON.stringify([...otherOrders, ...ordersWithUserId]));
    }
  }, [orders, user]);

  const login = (email: string, _name: string) => {
    // Получаем список всех зарегистрированных пользователей
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Ищем пользователя по email
    const existingUser = registeredUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      // Если пользователь найден, используем его данные
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));
      
      // Загружаем заказы этого пользователя
      const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
      const userOrders = allOrders.filter((order: Order & { userId?: string }) => order.userId === existingUser.id);
      setOrders(userOrders);
    } else {
      // Если пользователь не найден, показываем ошибку
      throw new Error("Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь.");
    }
  };

  const register = (email: string, name: string) => {
    // Получаем список всех зарегистрированных пользователей
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Проверяем, не существует ли уже пользователь с таким email
    const existingUser = registeredUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      throw new Error("Пользователь с таким email уже зарегистрирован. Пожалуйста, войдите в аккаунт.");
    }
    
    // Создаем нового пользователя
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    // Сохраняем в список зарегистрированных пользователей
    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    
    // Автоматически входим в аккаунт
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setOrders([]); // Новый пользователь без заказов
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("user");
  };

  const addOrder = (items: CartItem[], total: number) => {
    if (!user) return;
    
    const newOrder: Order = {
      id: Math.floor(Math.random() * 1000000).toString(),
      date: new Date().toLocaleDateString("ru-RU"),
      items,
      total,
      status: "processing",
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        register,
        logout,
        addOrder,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
