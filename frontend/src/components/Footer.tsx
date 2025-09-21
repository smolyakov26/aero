import React from "react";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-primary/20 to-transparent"></div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h5 className="font-bold text-2xl mb-6 flex items-center">
              <Icon icon="lucide:plane" className="text-primary mr-2" />
              Skybound Academy
            </h5>
            <p className="text-white/80 mb-6 text-lg">
              Школа парашютного спорта и лётная подготовка. Тандем прыжки, курсы AFF,
              обучение пилотированию и незабываемые полёты для всех уровней подготовки.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h6 className="font-semibold text-lg mb-6">Навигация</h6>
            <ul className="space-y-3">
              <li>
                <Link href="#" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Главная
                </Link>
              </li>
              <li>
                <Link href="#about" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  О нас
                </Link>
              </li>
              <li>
                <Link href="#programs" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Программы
                </Link>
              </li>
              <li>
                <Link href="#pricing" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Цены
                </Link>
              </li>
              <li>
                <Link href="#contact" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h6 className="font-semibold text-lg mb-6">Услуги</h6>
            <ul className="space-y-3">
              <li>
                <Link href="#programs" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Тандем прыжки
                </Link>
              </li>
              <li>
                <Link href="#programs" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Курсы AFF
                </Link>
              </li>
              <li>
                <Link href="#programs" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Обучение пилотированию
                </Link>
              </li>
              <li>
                <Link href="#programs" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Ознакомительные полёты
                </Link>
              </li>
              <li>
                <Link href="#programs" color="foreground" className="text-white/80 hover:text-white text-lg flex items-center">
                  <Icon icon="lucide:chevron-right" className="mr-2 text-primary" />
                  Экстремальные полёты
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h6 className="font-semibold text-lg mb-6">Контакты</h6>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon icon="lucide:map-pin" className="text-primary" />
                </div>
                <span className="text-white/80">ул. Примерная, 123, Москва</span>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon icon="lucide:phone" className="text-primary" />
                </div>
                <a href="tel:+74951234567" className="text-white/80 hover:text-white">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon icon="lucide:mail" className="text-primary" />
                </div>
                <a href="mailto:info@skyboundacademy.ru" className="text-white/80 hover:text-white">
                  info@skyboundacademy.ru
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon icon="lucide:clock" className="text-primary" />
                </div>
                <span className="text-white/80">
                  Пн-Вс: 8:00-20:00<br />Полёты по погоде
                </span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors" aria-label="Facebook">
                <Icon icon="lucide:facebook" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors" aria-label="Instagram">
                <Icon icon="lucide:instagram" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors" aria-label="Telegram">
                <Icon icon="lucide:send" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors" aria-label="YouTube">
                <Icon icon="lucide:youtube" />
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-10 border-white/10" />
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 mb-6 md:mb-0">
            &copy; 2024 Skybound Academy. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="#" color="foreground" className="text-white/70 hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="#" color="foreground" className="text-white/70 hover:text-white">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}