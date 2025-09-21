import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Первый тандем-прыжок с Skybound Academy стал самым ярким опытом в моей жизни! Инструктор Алексей всё объяснил, и я почувствовала себя в надёжных руках. Теперь планирую AFF!",
      name: "Анна Петрова",
      role: "Тандем-прыжок, 2023",
      image: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
    },
    {
      id: 2,
      quote: "Пройдя курс AFF в Skybound, я получил сертификат за 25 дней. Инструкторы Мария и Дмитрий - настоящие профессионалы. Теперь я самостоятельный скайдайвер с 50 прыжками!",
      name: "Дмитрий Иванов",
      role: "AFF курс, 2022",
      image: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2"
    },
    {
      id: 3,
      quote: "Ознакомительный полёт на Cessna с инструктором Сергеем перевернул моё представление о полётах. Взял управление сам! Skybound - идеальное место для первых шагов в авиацию.",
      name: "Елена Смирнова",
      role: "Ознакомительный полёт, 2021",
      image: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Icon 
          icon="lucide:quote" 
          className="absolute -top-10 -left-10 text-primary text-[200px] opacity-10" 
        />
        <Icon 
          icon="lucide:quote" 
          className="absolute -bottom-10 -right-10 text-primary text-[200px] opacity-10 rotate-180" 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-medium mb-2 inline-block">ОТЗЫВЫ</span>
          <h2 className="font-serif text-4xl font-bold mb-4">Отзывы наших клиентов</h2>
          <p className="text-default-500 text-lg max-w-2xl mx-auto">
            Узнайте, что говорят о нас те, кто уже достиг своих целей
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            key={testimonials[currentTestimonial].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="bg-white shadow-lg">
              <CardBody className="text-center p-10">
                <div className="mb-8">
                  <Icon icon="lucide:quote" className="text-primary text-6xl opacity-80" />
                </div>
                <blockquote className="mb-10">
                  <p className="text-xl leading-relaxed italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover mr-5 border-4 border-white shadow-md"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-primary font-medium">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          <Button
            isIconOnly
            variant="flat"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white/80 backdrop-blur-sm hover:bg-white"
            onPress={prevTestimonial}
            aria-label="Предыдущий отзыв"
            size="lg"
            radius="full"
          >
            <Icon icon="lucide:chevron-left" />
          </Button>
          
          <Button
            isIconOnly
            variant="flat"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white/80 backdrop-blur-sm hover:bg-white"
            onPress={nextTestimonial}
            aria-label="Следующий отзыв"
            size="lg"
            radius="full"
          >
            <Icon icon="lucide:chevron-right" />
          </Button>
          
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? "bg-primary w-8" 
                    : "bg-default-200 hover:bg-default-300"
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
                aria-current={index === currentTestimonial ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}