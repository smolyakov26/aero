import React from "react";
import { Card, CardBody, Button, Badge, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { api, Product } from "../services/api";

interface ProgramProps {
  image: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
  level: "beginner" | "intermediate" | "advanced";
  onBookingClick: (service: string) => void;
  slug: string; // ⚡ добавил
}

function Program({
  image,
  title,
  description,
  price,
  duration,
  popular,
  level,
  onBookingClick,
  slug
}: ProgramProps) {
  const levelIcons = {
    beginner: "lucide:circle",
    intermediate: "lucide:circle-dot",
    advanced: "lucide:circle-check"
  };
  
  const levelLabels = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый"
  };

  return (
    <Card 
      className="overflow-visible h-full group"
      isHoverable
      isPressable
      disableRipple
      shadow="md"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {popular && (
          <div className="absolute top-0 right-0 m-3">
            <div className="bg-primary text-white text-xs px-2 py-1 rounded-medium flex items-center">
              <Icon icon="lucide:star" className="mr-1" />
              <span>Популярно</span>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 m-3">
          <div className="bg-white/90 text-default-700 text-xs px-2 py-1 rounded-medium flex items-center">
            <Icon icon={levelIcons[level]} className="mr-1" />
            <span>{levelLabels[level]}</span>
          </div>
        </div>
      </div>
      <CardBody className="flex flex-col p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-default-500 text-sm sm:text-base mb-4 flex-grow">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg sm:text-xl font-bold text-primary">{price}</span>
          <span className="text-default-500 text-xs sm:text-sm flex items-center">
            <Icon icon="lucide:clock" className="mr-1" />
            {duration}
          </span>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button
            variant="flat"
            color="primary"
            className="w-full text-sm sm:text-base"
            startContent={<Icon icon="lucide:info" />}
            as={RouterLink}
            to={`/product/${encodeURIComponent(slug)}`} // ⚡ безопасная ссылка
          >
            Подробнее
          </Button>
          <Button
            color="primary"
            className="w-full text-sm sm:text-base"
            startContent={<Icon icon="lucide:calendar-plus" />}
            onPress={() => onBookingClick(title)}
          >
            {title === "Тандем прыжок" 
              ? "Записаться" 
              : title === "Ознакомительный полёт" 
                ? "Записаться" 
                : "Начать обучение"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

interface ProgramsSectionProps {
  onBookingClick: (service: string) => void;
}

export function ProgramsSection({ onBookingClick }: ProgramsSectionProps) {
  const [programs, setPrograms] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchPrograms() {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await api.getProducts();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError('Failed to load programs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPrograms();
  }, []);

  const shouldShowError = error && programs.length === 0;

  return (
    <section id="programs" className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Наши программы</h2>
          <p className="text-default-600 max-w-2xl mx-auto">
            Мы предлагаем разнообразные программы для всех уровней подготовки. Выберите подходящую для вас и начните свое воздушное приключение!
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" color="primary" />
          </div>
        ) : shouldShowError ? (
          <div className="text-center py-12">
            <Icon icon="lucide:alert-circle" className="text-danger text-5xl mx-auto mb-4" />
            <p className="text-default-600">{error}</p>
            <Button 
              color="primary" 
              variant="flat" 
              className="mt-4"
              onPress={() => window.location.reload()}
              startContent={<Icon icon="lucide:refresh-cw" />}
            >
              Попробовать снова
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.slug || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Program
                  image={program.mainImage}
                  title={program.title}
                  description={program.description}
                  price={program.price}
                  duration={program.duration}
                  popular={index === 0}
                  level={program.level}
                  onBookingClick={onBookingClick}
                  slug={program.slug} // ⚡ передаём slug из API
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
