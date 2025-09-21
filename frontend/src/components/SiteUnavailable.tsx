import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface SiteUnavailableProps {
  onRetry: () => void;
}

export function SiteUnavailable({ onRetry }: SiteUnavailableProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-none">
          <CardHeader className="flex flex-col items-center gap-3 pb-0 pt-6">
            <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center">
              <Icon icon="lucide:wifi-off" className="text-danger text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-center">Сайт временно недоступен</h1>
          </CardHeader>
          <CardBody className="text-center px-8 py-6">
            <p className="text-default-600 mb-4">
              К сожалению, в данный момент сервер недоступен. Мы уже работаем над устранением проблемы.
            </p>
            <div className="flex items-center justify-center gap-2 text-default-500 text-sm mb-4">
              <Icon icon="lucide:clock" />
              <span>Пожалуйста, попробуйте зайти позже</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-default-100 rounded-medium px-4 py-2 text-sm">
                <span className="font-mono">Ошибка: Сервер API недоступен</span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col gap-3 pt-0 pb-6">
            <Button 
              color="primary" 
              className="w-full" 
              startContent={<Icon icon="lucide:refresh-cw" />}
              onPress={onRetry}
            >
              Попробовать снова
            </Button>
            <Button 
              as="a"
              href="tel:+74951234567"
              variant="flat" 
              className="w-full" 
              startContent={<Icon icon="lucide:phone" />}
            >
              Связаться с нами
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-6 text-center text-default-500 text-sm">
          <p>Skybound Academy &copy; {new Date().getFullYear()}</p>
        </div>
      </motion.div>
    </div>
  );
}