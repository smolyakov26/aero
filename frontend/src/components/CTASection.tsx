import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-5xl font-bold mb-6">Готовы покорить небо?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Запишитесь на консультацию и получите персональную программу обучения или первый прыжок со скидкой!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              color="warning"
              variant="solid"
              as="a"
              href="#contact"
              className="font-medium text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
              startContent={<Icon icon="lucide:calendar-plus" className="text-xl" />}
            >
              Записаться на консультацию
            </Button>
            <Button
              size="lg"
              color="default"
              variant="bordered"
              as="a"
              href="tel:+74951234567"
              className="font-medium text-lg px-8 py-6 text-white border-white hover:bg-white/10 transition-colors"
              startContent={<Icon icon="lucide:phone" className="text-xl" />}
            >
              Позвонить сейчас
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}