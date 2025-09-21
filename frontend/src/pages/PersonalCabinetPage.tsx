import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab, Button, Avatar, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  bio: string;
}

export function PersonalCabinetPage() {
  const [user, setUser] = React.useState<User>({
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    address: "г. Москва, ул. Примерная, д. 123",
    bio: "Любитель экстремальных видов спорта и авиации. Совершил 5 прыжков с парашютом."
  });
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState<User>(user);
  const history = useHistory();
  
  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      history.push("/");
      window.scrollTo(0, 0);
    }, 500);
  };
  
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Тандем прыжок",
      date: "15 июля 2024",
      time: "10:00",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Ознакомительный полёт",
      date: "22 июля 2024",
      time: "14:30",
      status: "pending"
    }
  ];
  
  const pastEvents = [
    {
      id: 3,
      title: "Тандем прыжок",
      date: "5 июня 2024",
      time: "11:00",
      status: "completed"
    }
  ];
  
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Личный кабинет</h1>
          <Button
            color="danger"
            variant="light"
            onPress={handleLogout}
            startContent={<Icon icon="lucide:log-out" />}
            size="sm"
            className="text-sm sm:text-base"
          >
            Выйти
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 px-4">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card shadow="md">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">Профиль</h2>
                {!isEditing ? (
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setIsEditing(true)}
                    aria-label="Редактировать профиль"
                    size="sm"
                  >
                    <Icon icon="lucide:edit" />
                  </Button>
                ) : null}
              </CardHeader>
              <CardBody className="p-4 sm:p-6">
                {!isEditing ? (
                  <div className="flex flex-col items-center">
                    <Avatar
                      src={user.avatar}
                      className="w-24 h-24 mb-4"
                      isBordered
                      color="primary"
                    />
                    <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                    <p className="text-default-500 mb-4">{user.email}</p>
                    
                    <div className="w-full space-y-4 mt-4">
                      <div className="flex items-start">
                        <Icon icon="lucide:phone" className="text-primary mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-default-500">Телефон</p>
                          <p>{user.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Icon icon="lucide:map-pin" className="text-primary mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-default-500">Адрес</p>
                          <p>{user.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Icon icon="lucide:info" className="text-primary mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-default-500">О себе</p>
                          <p>{user.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <Avatar
                        src={editedUser.avatar}
                        className="w-24 h-24"
                        isBordered
                        color="primary"
                      />
                    </div>
                    
                    <Input
                      label="Имя"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      variant="bordered"
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      variant="bordered"
                      type="email"
                    />
                    
                    <Input
                      label="Телефон"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      variant="bordered"
                    />
                    
                    <Input
                      label="Адрес"
                      name="address"
                      value={editedUser.address}
                      onChange={handleInputChange}
                      variant="bordered"
                    />
                    
                    <Textarea
                      label="О себе"
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleInputChange}
                      variant="bordered"
                      minRows={3}
                    />
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="flat"
                        onPress={() => {
                          setIsEditing(false);
                          setEditedUser(user);
                        }}
                      >
                        Отмена
                      </Button>
                      <Button
                        color="primary"
                        onPress={handleSaveProfile}
                      >
                        Сохранить
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* Events and Bookings */}
          <div className="lg:col-span-2">
            <Card shadow="md">
              <CardBody className="p-4 sm:p-6">
                <Tabs aria-label="События" classNames={{
                  tabList: "overflow-x-auto flex-nowrap",
                  tab: "whitespace-nowrap"
                }}>
                  <Tab key="upcoming" title="Предстоящие события">
                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {upcomingEvents.map(event => (
                          <Card key={event.id} className="border border-default-200">
                            <CardBody>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="text-lg font-bold">{event.title}</h3>
                                  <p className="text-default-500">
                                    <Icon icon="lucide:calendar" className="inline mr-1" />
                                    {event.date}, {event.time}
                                  </p>
                                </div>
                                <div>
                                  {event.status === "confirmed" ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                                      <span className="w-2 h-2 rounded-full bg-success mr-1"></span>
                                      Подтверждено
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
                                      <span className="w-2 h-2 rounded-full bg-warning mr-1"></span>
                                      Ожидает подтверждения
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="primary"
                                  startContent={<Icon icon="lucide:info" />}
                                >
                                  Подробнее
                                </Button>
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="danger"
                                  startContent={<Icon icon="lucide:x" />}
                                >
                                  Отменить
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Icon icon="lucide:calendar" className="text-4xl text-default-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Нет предстоящих событий</h3>
                        <p className="text-default-500">Запишитесь на прыжок или полёт, чтобы они отобразились здесь</p>
                      </div>
                    )}
                  </Tab>
                  <Tab key="past" title="История">
                    {pastEvents.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {pastEvents.map(event => (
                          <Card key={event.id} className="border border-default-200">
                            <CardBody>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="text-lg font-bold">{event.title}</h3>
                                  <p className="text-default-500">
                                    <Icon icon="lucide:calendar" className="inline mr-1" />
                                    {event.date}, {event.time}
                                  </p>
                                </div>
                                <div>
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-default-100 text-default-500">
                                    <Icon icon="lucide:check" className="mr-1" />
                                    Завершено
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="primary"
                                  startContent={<Icon icon="lucide:info" />}
                                >
                                  Подробнее
                                </Button>
                                <Button
                                  size="sm"
                                  variant="flat"
                                  startContent={<Icon icon="lucide:repeat" />}
                                >
                                  Повторить
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Icon icon="lucide:history" className="text-4xl text-default-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">История пуста</h3>
                        <p className="text-default-500">Здесь будут отображаться ваши прошедшие события</p>
                      </div>
                    )}
                  </Tab>
                  <Tab key="certificates" title="Сертификаты">
                    <div className="text-center py-12">
                      <Icon icon="lucide:award" className="text-4xl text-default-300 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Нет сертификатов</h3>
                      <p className="text-default-500">Здесь будут отображаться ваши полученные сертификаты</p>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}