import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function Feature({ icon, title, description, delay }: FeatureProps) {
  return (
    <motion.div
      className="text-center h-full group px-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="bg-primary text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
        <Icon icon={icon} className="text-2xl sm:text-3xl" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-default-500 text-sm sm:text-base">{description}</p>
    </motion.div>
  );
}

export function AboutSection() {
  const features = [
    {
      icon: "lucide:shield",
      title: "Безопасность превыше всего",
      description: "Сертифицированные инструкторы USPA, современное оборудование, строгое соблюдение протоколов безопасности"
    },
    {
      icon: "lucide:award",
      title: "Профессиональные инструкторы",
      description: "Опытные пилоты и инструкторы с международными сертификатами. Тысячи часов налёта и безупречная репутация"
    },
    {
      icon: "lucide:plane",
      title: "Современный парк",
      description: "Новейшие самолёты и парашютное оборудование. Регулярное техническое обслуживание и сертификация"
    },
    {
      icon: "lucide:map-pin",
      title: "Удобное расположение",
      description: "Аэродром в 40 минутах от Москвы. Трансфер от метро, парковка, кафе на территории"
    },
    {
      icon: "lucide:camera",
      title: "Фото и видео",
      description: "Профессиональная съёмка вашего прыжка. Сохраните незабываемые моменты на память"
    },
    {
      icon: "lucide:users",
      title: "Дружелюбная атмосфера",
      description: "Поддерживающее сообщество любителей неба, мотивирующая атмосфера и позитивный настрой"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-medium mb-2 inline-block">НАШИ ПРЕИМУЩЕСТВА</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Почему выбирают нас</h2>
          <p className="text-default-500 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Безопасность, профессионализм и незабываемые впечатления — наши главные приоритеты
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-4">
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}