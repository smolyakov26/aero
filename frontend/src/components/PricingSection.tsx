import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, RadioGroup, Radio } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  price: number;
  color: "primary" | "warning" | "secondary";
  features: string[];
  buttonText: string;
  onBookingClick: (service: string) => void;
}

function PricingCard({
  title,
  price,
  color,
  features,
  buttonText,
  onBookingClick
}: Omit<PricingCardProps, "discountedPrice" | "isPriceToggled">) {
  return (
    <Card className="h-full relative overflow-hidden group" shadow="md">
      <CardHeader className={`bg-${color} text-white text-center py-8`}>
        <h3 className="text-2xl font-bold">{title}</h3>
      </CardHeader>
      <CardBody className="text-center p-6">
        <div className="mb-8 relative">
          <span className="text-5xl font-bold">{price.toLocaleString()}</span>
          <span className="text-xl text-default-500"> ₽</span>
        </div>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Icon icon="lucide:check-circle" className="text-success mr-3 flex-shrink-0" />
              <span className="text-left">{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="pt-0 pb-6 px-6">
        <Button 
          color={color} 
          className="w-full py-6 group-hover:shadow-lg transition-shadow"
          startContent={<Icon icon="lucide:calendar-plus" />}
          onPress={() => onBookingClick(title)}
          size="lg"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface AdditionalServiceProps {
  icon: string;
  title: string;
  price: number;
  discountedPrice: number;
  isPriceToggled: boolean;
}

function AdditionalService({
  icon,
  title,
  price
}: Omit<AdditionalServiceProps, "discountedPrice" | "isPriceToggled">) {
  return (
    <div className="flex items-center p-4 bg-slate-50 rounded-medium">
      <Icon icon={icon} className="text-primary text-2xl mr-4" />
      <div>
        <h4 className="font-medium">{title}</h4>
        <span className="text-primary font-bold">{price.toLocaleString()} ₽</span>
      </div>
    </div>
  );
}

interface PricingSectionProps {
  onBookingClick: (service: string) => void;
}

export function PricingSection({ onBookingClick }: PricingSectionProps) {
  // Remove the pricing tier state
  
  const pricingCards = [
    {
      title: "Тандем прыжок",
      price: 15000,
      color: "primary" as const,
      features: [
        "Инструктаж 30 мин",
        "Подъём на высоту 4000м",
        "60 сек свободного падения",
        "Приземление под куполом",
        "Сертификат о прыжке"
      ],
      buttonText: "Записаться"
    },
    {
      title: "Курс AFF",
      price: 85000,
      color: "warning" as const,
      features: [
        "Теоретический курс 8 ч",
        "7 уровней обучения",
        "Самостоятельные прыжки",
        "Получение лицензии",
        "Поддержка инструктора"
      ],
      buttonText: "Начать курс"
    },
    {
      title: "Ознакомительный полёт",
      price: 8000,
      color: "secondary" as const,
      features: [
        "Предполётный брифинг",
        "30 мин в воздухе",
        "Управление самолётом",
        "Опытный инструктор",
        "Журнал полётов"
      ],
      buttonText: "Записаться"
    }
  ];
  
  const additionalServices = [
    {
      icon: "lucide:video",
      title: "Видеосъёмка",
      price: 5000
    },
    {
      icon: "lucide:camera",
      title: "Фотосъёмка",
      price: 3500
    },
    {
      icon: "lucide:bus",
      title: "Трансфер",
      price: 2000
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-medium mb-2 inline-block">ПРОЗРАЧНАЯ СТОИМОСТЬ</span>
          <h2 className="font-serif text-4xl font-bold mb-4">Наши цены</h2>
          <p className="text-default-500 text-lg max-w-2xl mx-auto">
            Прозрачные цены без скрытых платежей. Выберите подходящий пакет для вашего уровня
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <PricingCard
                {...card}
                onBookingClick={onBookingClick}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Remove the additional services section */}
      </div>
    </section>
  );
}