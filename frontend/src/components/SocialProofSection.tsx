import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface StatItemProps {
  icon: string;
  value: string;
  label: string;
  delay: number;
}

function StatItem({ icon, value, label, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="inline-flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-300">
        <Icon icon={icon} className="text-4xl" />
      </div>
      <h3 className="font-bold text-2xl mb-1">{value}</h3>
      <p className="text-sm opacity-90">{label}</p>
    </motion.div>
  );
}

export function SocialProofSection() {
  return (
    <section className="py-8 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <StatItem
            icon="lucide:star"
            value="4.9"
            label="На основе 2 847+ отзывов"
            delay={0.1}
          />
          <StatItem
            icon="lucide:award"
            value="USPA"
            label="Сертифицированные инструкторы"
            delay={0.2}
          />
          <StatItem
            icon="lucide:shield-check"
            value="FAA"
            label="Лётная школа Part 141"
            delay={0.3}
          />
          <StatItem
            icon="lucide:trending-up"
            value="98%"
            label="Успешности у студентов"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}