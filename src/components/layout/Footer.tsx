import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tighter">Wonep.</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Современный магазин одежды для тех, кто ценит стиль, качество и комфорт.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Магазин</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link to="/catalog?filter=men" className="hover:text-white transition-colors">Мужское</Link></li>
              <li><Link to="/catalog?filter=women" className="hover:text-white transition-colors">Женское</Link></li>
              <li><Link to="/catalog?filter=accessories" className="hover:text-white transition-colors">Аксессуары</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Помощь</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">Доставка</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Возврат</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Таблица размеров</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Рассылка</h4>
            <p className="text-sm text-gray-400 mb-4">Подпишитесь на новости и получите скидку 10%.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-gray-900 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-white"
              />
              <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 Wonep Store. Все права защищены.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
