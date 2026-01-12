import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, Search, Menu, X, Sun, Moon, User } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

export const Header = () => {
  const { cartCount, favorites } = useShop();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Главная", path: "/" },
    { name: "Каталог", path: "/catalog" },
    { name: "Новинки", path: "/catalog?filter=new" },
    { name: "О нас", path: "/about" },
  ];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Button */}
        <button 
            className="lg:hidden p-2 -ml-2 text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        {!isSearchOpen && (
          <Link to="/" className="text-2xl font-bold tracking-tighter uppercase text-black dark:text-white">
            Wonep<span className="text-gray-400">.</span>
          </Link>
        )}

        {/* Desktop Nav */}
        <nav className={`hidden lg:flex items-center gap-8 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                  isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar Overlay (Desktop & Mobile) */}
        {isSearchOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-950 px-4 z-10">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl flex items-center gap-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск товаров..."
                className="flex-1 bg-transparent border-none text-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 px-0"
              />
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-black dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </form>
          </div>
        )}

        {/* Icons */}
        <div className={`flex items-center gap-4 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button 
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <Link to={isAuthenticated ? "/account" : "/login"} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hidden sm:block">
            <User className="h-5 w-5" />
          </Link>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <Link to="/favorites" className="relative text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[10px] font-bold text-white dark:text-black">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[10px] font-bold text-white dark:text-black">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !isSearchOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 h-screen">
            <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}
                
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                
                <Link
                    to={isAuthenticated ? "/account" : "/login"}
                    className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <User className="h-5 w-5" /> {isAuthenticated ? "Мой аккаунт" : "Войти"}
                </Link>
            </nav>
        </div>
      )}
    </header>
  );
};
