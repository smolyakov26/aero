import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !isValidEmail(email)) {
      setIsInvalid(true);
      return;
    }
    
    setIsInvalid(false);
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Спасибо! Промокод отправлен на ${email}`);
      onClose();
    }, 2000);
  };
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="center" 
      backdrop="blur"
      classNames={{
        backdrop: "bg-secondary/40",
        base: "border border-white/20"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b-0 pt-6">
              <button
                className="absolute right-4 top-4 text-default-400 hover:text-default-600"
                onClick={onClose}
                aria-label="Закрыть"
              >
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </ModalHeader>
            <ModalBody className="text-center px-8 pb-8">
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full bg-warning/20 flex items-center justify-center mx-auto">
                  <Icon icon="lucide:gift" className="text-warning text-4xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Скидка 25% на первый опыт!</h3>
              <p className="text-default-500 mb-8">
                Оставьте e-mail — мгновенно пришлём промокод на тандем прыжок
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? "Пожалуйста, введите корректный email адрес" : ""}
                    isDisabled={isSubmitting}
                    size="lg"
                    startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                    variant="bordered"
                  />
                </div>
                <Button
                  type="submit"
                  color="warning"
                  size="lg"
                  className="w-full py-6"
                  startContent={<Icon icon="lucide:gift" />}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Получить промокод
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}