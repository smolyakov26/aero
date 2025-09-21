import React from "react";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface NavbarProps {
  onBookingClick: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onProfileClick: () => void;
}

export function Navbar({ onBookingClick, onLoginClick, isLoggedIn, onProfileClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroNavbar
      className={`${
        isScrolled ? "shadow-sm" : ""
      } transition-all duration-300 backdrop-blur-md border-b border-slate-100/50 px-2 sm:px-4`}
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered={false}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <motion.div 
            className="flex items-center gap-1 sm:gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon icon="lucide:plane" className="text-primary text-xl sm:text-2xl" />
            <span className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-secondary">
              Skybound Academy
            </span>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="#" color="foreground" className="font-medium">
            <Icon icon="lucide:home" className="mr-1" />
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#about" color="foreground" className="font-medium">
            <Icon icon="lucide:info" className="mr-1" />
            О нас
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#programs" color="foreground" className="font-medium">
            <Icon icon="lucide:plane" className="mr-1" />
            Программы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#pricing" color="foreground" className="font-medium">
            <Icon icon="lucide:tag" className="mr-1" />
            Цены
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#contact" color="foreground" className="font-medium">
            <Icon icon="lucide:mail" className="mr-1" />
            Контакты
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarItem>
            <Button 
              color="primary"
              variant="flat"
              onPress={onProfileClick}
              className="font-medium mr-1 sm:mr-2 text-sm sm:text-base px-2 sm:px-3"
              startContent={<Icon icon="lucide:user" className="text-sm sm:text-base" />}
              size="sm"
              radius="full"
            >
              <span className="hidden xs:inline">Личный кабинет</span>
            </Button>
          </NavbarItem>
        ) : (
          null
        )}
        <NavbarItem>
          <Button 
            color="warning" 
            variant="shadow" 
            onPress={onBookingClick}
            className="font-medium transition-transform hover:scale-105 text-sm sm:text-base px-2 sm:px-3"
            startContent={<Icon icon="lucide:calendar-plus" className="text-sm sm:text-base" />}
            size="sm"
            radius="full"
          >
            <span className="hidden xs:inline">Записаться</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarMenu className="pt-4 pb-6 px-2">
        <NavbarMenuItem>
          <Link 
            href="#" 
            color="foreground" 
            className="w-full flex items-center py-3 text-lg"
            onPress={() => setIsMenuOpen(false)}
          >
            <Icon icon="lucide:home" className="mr-2" />
            Главная
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            href="#about" 
            color="foreground" 
            className="w-full flex items-center py-3 text-lg"
            onPress={() => setIsMenuOpen(false)}
          >
            <Icon icon="lucide:info" className="mr-2" />
            О нас
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            href="#programs" 
            color="foreground" 
            className="w-full flex items-center py-3 text-lg"
            onPress={() => setIsMenuOpen(false)}
          >
            <Icon icon="lucide:plane" className="mr-2" />
            Программы
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            href="#pricing" 
            color="foreground" 
            className="w-full flex items-center py-3 text-lg"
            onPress={() => setIsMenuOpen(false)}
          >
            <Icon icon="lucide:tag" className="mr-2" />
            Цены
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            href="#contact" 
            color="foreground" 
            className="w-full flex items-center py-3 text-lg"
            onPress={() => setIsMenuOpen(false)}
          >
            <Icon icon="lucide:mail" className="mr-2" />
            Контакты
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {isLoggedIn ? (
            <Button 
              color="primary"
              className="w-full mt-4"
              size="lg"
              onPress={() => {
                onProfileClick();
                setIsMenuOpen(false);
              }}
              startContent={<Icon icon="lucide:user" />}
            >
              Личный кабинет
            </Button>
          ) : (
            <Button 
              color="primary"
              className="w-full mt-4"
              size="lg"
              onPress={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              startContent={<Icon icon="lucide:log-in" />}
            >
              Войти
            </Button>
          )}
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button 
            color="warning" 
            className="w-full mt-4"
            size="lg"
            onPress={() => {
              onBookingClick();
              setIsMenuOpen(false);
            }}
            startContent={<Icon icon="lucide:calendar-plus" />}
          >
            Записаться
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}