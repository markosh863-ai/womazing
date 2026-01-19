import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white">
          О нас
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Наша история
            </h2>
            <p className="text-lg leading-relaxed">
              Мы — современный fashion-бренд, который создает стильную и качественную одежду для всех. 
              Наша миссия — сделать модную одежду доступной каждому, не жертвуя при этом качеством и стилем.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Наши ценности
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-black dark:text-white font-semibold mr-2">•</span>
                <span><strong>Качество:</strong> Мы тщательно отбираем материалы и контролируем каждый этап производства</span>
              </li>
              <li className="flex items-start">
                <span className="text-black dark:text-white font-semibold mr-2">•</span>
                <span><strong>Стиль:</strong> Наши коллекции создаются с учетом последних трендов моды</span>
              </li>
              <li className="flex items-start">
                <span className="text-black dark:text-white font-semibold mr-2">•</span>
                <span><strong>Доступность:</strong> Мы стремимся сделать качественную одежду доступной для всех</span>
              </li>
              <li className="flex items-start">
                <span className="text-black dark:text-white font-semibold mr-2">•</span>
                <span><strong>Устойчивость:</strong> Мы заботимся об окружающей среде и используем экологичные материалы</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Что мы предлагаем
            </h2>
            <p className="text-lg leading-relaxed">
              В нашем каталоге вы найдете широкий ассортимент одежды для мужчин и женщин: от базовых вещей 
              до стильных аксессуаров. Мы регулярно обновляем коллекции, добавляя новые модели и актуальные тренды.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Свяжитесь с нами
            </h2>
            <div className="space-y-2 text-lg">
              <p>
                <strong className="text-gray-900 dark:text-white">Email:</strong> info@fashionstore.ru
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Телефон:</strong> +7 (800) 123-45-67
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Адрес:</strong> г. Москва, ул. Модная, д. 1
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
