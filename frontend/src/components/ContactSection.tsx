import React from "react";
import { Card, CardBody, Input, Textarea, Button, Select, SelectItem, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    agreement: false
  });
  
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isWorkingHours, setIsWorkingHours] = React.useState(true);
  
  React.useEffect(() => {
    const updateWorkingStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      if (day >= 1 && day <= 5) {
        setIsWorkingHours(hour >= 6 && hour < 23);
      } else {
        setIsWorkingHours(hour >= 8 && hour < 22);
      }
    };
    
    updateWorkingStatus();
    const interval = setInterval(updateWorkingStatus, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (isSelected: boolean) => {
    setFormData((prev) => ({ ...prev, agreement: isSelected }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.agreement) {
      return;
    }
    
    setFormStatus("submitting");
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
        agreement: false
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-medium mb-2 inline-block">СВЯЗАТЬСЯ С НАМИ</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Свяжитесь с нами</h2>
          <p className="text-default-500 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Готовы к приключению? Свяжитесь с нами для записи или консультации
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-md">
              <CardBody className="p-4 sm:p-8">
                <h3 className="text-xl font-bold mb-6 sm:mb-8 flex items-center">
                  <Icon icon="lucide:info" className="text-primary mr-2" />
                  Информация
                </h3>
                
                <div className="space-y-5 sm:space-y-8">
                  <div className="group">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon icon="lucide:map-pin" className="text-primary text-lg sm:text-xl" />
                      </div>
                      <strong className="text-base sm:text-lg">Адрес</strong>
                    </div>
                    <p className="ml-14 sm:ml-16 text-default-500 text-sm sm:text-base">ул. Примерная, 123, Москва, 123456</p>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon icon="lucide:phone" className="text-primary text-lg sm:text-xl" />
                      </div>
                      <strong className="text-base sm:text-lg">Телефон</strong>
                    </div>
                    <p className="ml-14 sm:ml-16">
                      <a href="tel:+74951234567" className="text-primary hover:underline">
                        +7 (495) 123-45-67
                      </a>
                    </p>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon icon="lucide:mail" className="text-primary text-lg sm:text-xl" />
                      </div>
                      <strong className="text-base sm:text-lg">Email</strong>
                    </div>
                    <p className="ml-14 sm:ml-16">
                      <a href="mailto:info@skyboundacademy.ru" className="text-primary hover:underline">
                        info@skyboundacademy.ru
                      </a>
                    </p>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon icon="lucide:clock" className="text-primary text-lg sm:text-xl" />
                      </div>
                      <strong className="text-base sm:text-lg">Режим работы</strong>
                    </div>
                    <div className="ml-14 sm:ml-16">
                      <p className="text-xs text-default-500">Пн-Пт: 06:00-23:00</p>
                      <p className="text-xs text-default-500">Сб-Вс: 08:00-22:00</p>
                      <p className="text-xs text-default-500">*Полёты по погоде</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8 sm:mt-10">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      isWorkingHours ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        isWorkingHours ? "bg-success" : "bg-danger"
                      }`}></span>
                      {isWorkingHours ? "Сейчас открыто" : "Сейчас закрыто"}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card shadow="md">
              <CardBody className="p-4 sm:p-8">
                <h3 className="text-xl font-bold mb-6 sm:mb-8 flex items-center">
                  <Icon icon="lucide:mail" className="text-primary mr-2" />
                  Напишите нам
                </h3>
                
                {formStatus === "success" && (
                  <div className="bg-success/10 text-success p-6 rounded-medium mb-8 flex items-center">
                    <Icon icon="lucide:check-circle" className="text-2xl mr-3" />
                    <div>
                      <h4 className="font-bold mb-1">Сообщение отправлено!</h4>
                      <p>Спасибо! Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                  </div>
                )}
                
                {formStatus === "error" && (
                  <div className="bg-danger/10 text-danger p-6 rounded-medium mb-8 flex items-center">
                    <Icon icon="lucide:alert-triangle" className="text-2xl mr-3" />
                    <div>
                      <h4 className="font-bold mb-1">Ошибка отправки</h4>
                      <p>Произошла ошибка при отправке сообщения. Попробуйте позже.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Имя"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isRequired
                      variant="bordered"
                      isDisabled={formStatus === "submitting"}
                      size="lg"
                      startContent={<Icon icon="lucide:user" className="text-default-400" />}
                    />
                    
                    <Input
                      label="Телефон"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isRequired
                      variant="bordered"
                      placeholder="+7 (___) ___-__-__"
                      isDisabled={formStatus === "submitting"}
                      size="lg"
                      startContent={<Icon icon="lucide:phone" className="text-default-400" />}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      isRequired
                      variant="bordered"
                      isDisabled={formStatus === "submitting"}
                      size="lg"
                      startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Select
                      label="Тема обращения"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="bordered"
                      isDisabled={formStatus === "submitting"}
                      size="lg"
                      startContent={<Icon icon="lucide:help-circle" className="text-default-400" />}
                    >
                      <SelectItem key="default" value="">Выберите тему...</SelectItem>
                      <SelectItem key="tandem" value="tandem">Тандем прыжок</SelectItem>
                      <SelectItem key="aff" value="aff">Курс AFF</SelectItem>
                      <SelectItem key="flight" value="flight">Ознакомительный полёт</SelectItem>
                      <SelectItem key="pilot" value="pilot">Обучение пилотированию</SelectItem>
                      <SelectItem key="other" value="other">Другое</SelectItem>
                    </Select>
                  </div>
                  
                  <div className="mb-6">
                    <Textarea
                      label="Сообщение"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      variant="bordered"
                      placeholder="Расскажите о своих пожеланиях..."
                      maxRows={5}
                      isDisabled={formStatus === "submitting"}
                      size="lg"
                      minRows={4}
                      startContent={<Icon icon="lucide:message-square" className="text-default-400 mt-3" />}
                    />
                  </div>
                  
                  <div className="mb-8">
                    <Checkbox
                      isSelected={formData.agreement}
                      onValueChange={handleCheckboxChange}
                      isRequired
                      isDisabled={formStatus === "submitting"}
                      size="lg"
                    >
                      Я согласен на <a href="#" className="text-primary">обработку персональных данных</a>
                    </Checkbox>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      startContent={<Icon icon="lucide:send" />}
                      isLoading={formStatus === "submitting"}
                      isDisabled={formStatus === "submitting"}
                      className="px-8 py-6"
                    >
                      Отправить сообщение
                    </Button>
                    
                    <Button
                      type="reset"
                      variant="bordered"
                      size="lg"
                      startContent={<Icon icon="lucide:refresh-cw" />}
                      isDisabled={formStatus === "submitting"}
                      onPress={() => {
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          subject: "",
                          message: "",
                          agreement: false
                        });
                      }}
                      className="px-6"
                    >
                      Очистить
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}