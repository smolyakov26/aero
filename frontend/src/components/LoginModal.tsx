import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email, password);
      onClose();
      
      // Reset form
      setEmail("");
      setPassword("");
    }, 1000);
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="center" 
      backdrop="blur"
      size={{
        '@initial': 'sm',
        '@xs': 'sm',
        '@sm': 'md',
      }}
      classNames={{
        backdrop: "bg-secondary/40",
        base: "border border-white/20 mx-4 sm:mx-auto",
        wrapper: "p-0 sm:p-4"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <Icon icon="lucide:log-in" className="text-primary text-lg sm:text-xl mr-2" />
                <span className="text-lg sm:text-xl">Вход в личный кабинет</span>
              </div>
            </ModalHeader>
            <ModalBody className="py-4 sm:py-6">
              {error && (
                <div className="bg-danger/10 text-danger p-4 rounded-medium mb-4 flex items-center">
                  <Icon icon="lucide:alert-circle" className="mr-2" />
                  {error}
                </div>
              )}
              
              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="bordered"
                    isRequired
                    size="lg"
                    startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                    isDisabled={isLoading}
                  />
                  
                  <Input
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="bordered"
                    isRequired
                    size="lg"
                    startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                    isDisabled={isLoading}
                  />
                  
                  <div className="flex justify-between items-center">
                    <Checkbox
                      isSelected={rememberMe}
                      onValueChange={setRememberMe}
                      isDisabled={isLoading}
                    >
                      Запомнить меня
                    </Checkbox>
                    
                    <Link href="#" size="sm" className="text-primary">
                      Забыли пароль?
                    </Link>
                  </div>
                </div>
              </form>
              
              <div className="mt-6">
                <p className="text-center text-default-500">
                  Еще нет аккаунта?{" "}
                  <Link href="#" className="text-primary font-medium">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="border-t flex-col sm:flex-row gap-2 sm:gap-0">
              <Button 
                variant="flat" 
                onPress={onClose} 
                isDisabled={isLoading}
                className="w-full sm:w-auto px-4 sm:px-6 order-2 sm:order-1"
              >
                Отмена
              </Button>
              <Button
                color="primary"
                type="submit"
                form="loginForm"
                startContent={<Icon icon="lucide:log-in" />}
                isLoading={isLoading}
                isDisabled={isLoading}
                className="w-full sm:w-auto px-4 sm:px-6 order-1 sm:order-2"
              >
                Войти
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}