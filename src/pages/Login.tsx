import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email) {
      try {
        login(email, ""); // name не используется при логине, берется из сохраненных данных
        navigate("/account");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка входа");
      }
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Войдите в аккаунт
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Или{" "}
            <Link to="/register" className="font-medium text-black dark:text-white underline hover:text-gray-700 dark:hover:text-gray-300">
              зарегистрируйтесь
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                type="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-800 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white sm:text-sm sm:leading-6 px-3"
                placeholder="Email адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
