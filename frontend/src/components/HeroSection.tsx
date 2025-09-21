import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  onBookingClick: (service: string) => void;
}

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  service: string;
}

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  
  const slides: HeroSlide[] = [
    {
      id: 0,
      image: "https://img.heroui.chat/image/landscape?w=1920&h=1080&u=1",
      title: "Ощути настоящую свободу",
      description: "С 4000 метров или из кабины — ваше путешествие начинается здесь.",
      buttonText: "Начать приключение сегодня",
      service: "Консультация"
    },
    {
      id: 1,
      image: "https://img.heroui.chat/image/landscape?w=1920&h=1080&u=2",
      title: "Accelerated Freefall (AFF)",
      description: "От нуля до сертификата за 7 уровней с опытными инструкторами.",
      buttonText: "Начать AFF",
      service: "Курс AFF"
    },
    {
      id: 2,
      image: "https://img.heroui.chat/image/landscape?w=1920&h=1080&u=3",
      title: "Ознакомительный полёт",
      description: "Возьмите управление под присмотром сертифицированного инструктора.",
      buttonText: "Записаться на полёт",
      service: "Ознакомительный полёт"
    }
  ];

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <header className="relative h-[85vh] sm:h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
              animation: 'slowZoom 20s infinite alternate ease-in-out'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/60 to-secondary/80" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-white text-center"
          >
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 text-shadow-md text-white/90 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
            <Button
              size="lg"
              color="warning"
              variant="shadow"
              radius="full"
              className="px-6 sm:px-8 py-5 sm:py-6 font-semibold text-base sm:text-lg transition-all hover:scale-105 hover:shadow-lg"
              onPress={() => onBookingClick(slides[currentSlide].service)}
            >
              {slides[currentSlide].buttonText}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation controls - updated for better mobile experience */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110 backdrop-blur-sm z-10"
        aria-label="Предыдущий слайд"
      >
        <Icon icon="lucide:chevron-left" width={20} height={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110 backdrop-blur-sm z-10"
        aria-label="Следующий слайд"
      >
        <Icon icon="lucide:chevron-right" width={20} height={20} />
      </button>

      {/* Dots navigation - updated for better mobile experience */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white w-5 sm:w-6 shadow-lg" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </header>
  );
}