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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedOrders = localStorage.getItem("orders");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = (email: string, name: string) => {
    const newUser = { id: Date.now().toString(), email, name };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const register = (email: string, name: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: Math.floor(Math.random() * 1000000).toString(),
      date: new Date().toLocaleDateString("ru-RU"),
      items,
      total,
      status: "processing",
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
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
