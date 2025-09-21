import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Card, CardBody, Button, Divider, Tabs, Tab, Badge, Modal, ModalContent, ModalBody, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useBookingModal } from "../hooks/useBookingModal";
import { api, Product } from "../services/api";

interface ProductPageProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export function ProductPage({ isLoggedIn, onLoginClick }: ProductPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const { openBookingModal, isBookingModalOpen, selectedService, closeBookingModal } = useBookingModal();
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // Functions for lightbox functionality
  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const nextImage = () => {
    if (selectedImage === null || !product) return;
    setSelectedImage((selectedImage + 1) % product.gallery.length);
  };
  
  const prevImage = () => {
    if (selectedImage === null || !product) return;
    setSelectedImage((selectedImage - 1 + product.gallery.length) % product.gallery.length);
  };
  
  // Fetch product data from API
  React.useEffect(() => {
    async function fetchProductData() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch product details
        const productData = await api.getProductBySlug(slug || '');
        setProduct(productData);
        
        // Fetch related products
        const relatedData = await api.getRelatedProducts(slug || '');
        setRelatedProducts(relatedData);
      } catch (err) {
        setError('Failed to load product data. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProductData();
  }, [slug]);
  
  const handleBooking = () => {
    if (product) {
      openBookingModal(product.title);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <>
        <Navbar 
          onBookingClick={() => openBookingModal("Консультация")} 
          onLoginClick={onLoginClick}
          isLoggedIn={isLoggedIn}
          onProfileClick={() => window.location.href = "/profile"}
        />
        <main className="min-h-screen bg-slate-50 py-8 sm:py-12 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-default-600">Загрузка информации о программе...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Show error state
  if (error || !product) {
    return (
      <>
        <Navbar 
          onBookingClick={() => openBookingModal("Консультация")} 
          onLoginClick={onLoginClick}
          isLoggedIn={isLoggedIn}
          onProfileClick={() => window.location.href = "/profile"}
        />
        <main className="min-h-screen bg-slate-50 py-8 sm:py-12 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardBody className="text-center p-8">
              <Icon icon="lucide:alert-circle" className="text-danger text-5xl mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Ошибка загрузки</h2>
              <p className="text-default-600 mb-6">{error || 'Программа не найдена'}</p>
              <Button 
                as={RouterLink} 
                to="/" 
                color="primary"
                startContent={<Icon icon="lucide:home" />}
              >
                Вернуться на главную
              </Button>
            </CardBody>
          </Card>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar 
        onBookingClick={() => openBookingModal("Консультация")} 
        onLoginClick={onLoginClick}
        isLoggedIn={isLoggedIn}
        onProfileClick={() => window.location.href = "/profile"}
      />
      
      <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center mb-4 sm:mb-6 text-xs sm:text-sm px-4">
            <RouterLink to="/" className="text-default-500 hover:text-primary transition-colors">
              Главная
            </RouterLink>
            <Icon icon="lucide:chevron-right" className="mx-1 sm:mx-2 text-default-400" />
            <RouterLink to="/#programs" className="text-default-500 hover:text-primary transition-colors">
              Программы
            </RouterLink>
            <Icon icon="lucide:chevron-right" className="mx-1 sm:mx-2 text-default-400" />
            <span className="text-default-800 truncate max-w-[150px] sm:max-w-none">{product?.title}</span>
          </div>
          
          {/* Product Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-12 px-4">
            <div>
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <Card className="overflow-hidden shadow-lg">
                  <img 
                    src={product?.mainImage} 
                    alt={product?.title} 
                    className="w-full h-[250px] sm:h-[400px] object-cover"
                  />
                </Card>
              </motion.div>
              
              {/* Thumbnail Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-4 gap-2">
                  {product?.gallery.slice(0, 4).map((image, index) => (
                    <Card 
                      key={index}
                      isPressable 
                      isHoverable 
                      className="overflow-hidden"
                      onPress={() => openLightbox(index)}
                    >
                      <div className="relative group">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Icon icon="lucide:zoom-in" className="text-white text-sm" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                {product?.gallery.length > 4 && (
                  <Button
                    variant="flat"
                    color="primary"
                    className="w-full mt-2 text-sm"
                    startContent={<Icon icon="lucide:image" />}
                    onPress={() => openLightbox(0)}
                  >
                    Смотреть все фото ({product?.gallery.length})
                  </Button>
                )}
              </motion.div>
              
              {/* Lightbox Modal */}
              <Modal 
                isOpen={selectedImage !== null} 
                onClose={closeLightbox}
                size={{
                  '@initial': 'full',
                  '@sm': '5xl',
                }}
                backdrop="blur"
                classNames={{
                  backdrop: "bg-black/80",
                  base: "border-none m-0 sm:m-auto",
                  wrapper: "p-0 sm:p-4"
                }}
              >
                <ModalContent>
                  {() => (
                    <>
                      <ModalBody className="p-0 relative">
                        {selectedImage !== null && (
                          <div className="relative">
                            <img 
                              src={product?.gallery[selectedImage].src} 
                              alt={product?.gallery[selectedImage].alt} 
                              className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            
                            <Button
                              isIconOnly
                              variant="flat"
                              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 z-20"
                              onPress={closeLightbox}
                              aria-label="Закрыть"
                              size="sm"
                            >
                              <Icon icon="lucide:x" />
                            </Button>
                            
                            <Button
                              isIconOnly
                              variant="flat"
                              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-20"
                              onPress={prevImage}
                              aria-label="Предыдущее изображение"
                              size="sm"
                            >
                              <Icon icon="lucide:chevron-left" />
                            </Button>
                            
                            <Button
                              isIconOnly
                              variant="flat"
                              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-20"
                              onPress={nextImage}
                              aria-label="Следующее изображение"
                              size="sm"
                            >
                              <Icon icon="lucide:chevron-right" />
                            </Button>
                            
                            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                              {selectedImage + 1} / {product?.gallery.length}
                            </div>
                          </div>
                        )}
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardBody className="p-4 sm:p-6">
                  <div className="flex items-center mb-2">
                    <Badge 
                      color={product?.level === "beginner" ? "primary" : product?.level === "intermediate" ? "warning" : "secondary"}
                      className="mb-2"
                    >
                      {product?.level === "beginner" ? "Начинающий" : product?.level === "intermediate" ? "Средний" : "Продвинутый"}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
                  <p className="text-default-600 mb-6">{product?.description}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-between mb-6">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-default-500 text-sm">Стоимость</p>
                      <p className="text-3xl font-bold text-primary">{product?.price}</p>
                    </div>
                    <div>
                      <p className="text-default-500 text-sm">Продолжительность</p>
                      <p className="text-xl font-semibold flex items-center">
                        <Icon icon="lucide:clock" className="mr-1" />
                        {product?.duration}
                      </p>
                    </div>
                  </div>
                  
                  <Divider className="my-6" />
                  
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Требования:</h3>
                    <ul className="space-y-2">
                      {product?.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <Icon icon="lucide:check" className="text-success mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Включено в стоимость:</h3>
                    <ul className="space-y-2">
                      {product?.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Icon icon="lucide:check" className="text-success mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full py-6"
                    startContent={<Icon icon="lucide:calendar-plus" />}
                    onPress={handleBooking}
                  >
                    Забронировать
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </div>
          
          {/* Product Details */}
          <Card className="mb-6 sm:mb-12 shadow-md mx-4">
            <CardBody className="p-4 sm:p-8">
              <Tabs aria-label="Информация о программе">
                <Tab key="description" title="Описание">
                  <div className="py-4">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product?.fullDescription }} />
                  </div>
                </Tab>
                <Tab key="instructors" title="Инструкторы">
                  <div className="py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product?.instructors.map((instructor, index) => (
                        <Card key={index} className="border border-default-200">
                          <CardBody className="p-6">
                            <div className="flex items-center">
                              <img 
                                src={instructor.avatar} 
                                alt={instructor.name} 
                                className="w-16 h-16 rounded-full object-cover mr-4"
                              />
                              <div>
                                <h3 className="font-bold text-lg">{instructor.name}</h3>
                                <p className="text-primary">{instructor.role}</p>
                                <p className="text-default-500 text-sm">{instructor.experience}</p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Tab>
                <Tab key="faq" title="Частые вопросы">
                  <div className="py-4">
                    <div className="space-y-6">
                      {product?.faq.map((item, index) => (
                        <div key={index}>
                          <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                          <p className="text-default-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
                <Tab key="gallery" title="Все фото">
                  <div className="py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                      {product?.gallery.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card 
                            isPressable 
                            isHoverable 
                            className="overflow-hidden"
                            onPress={() => openLightbox(index)}
                          >
                            <div className="relative group">
                              <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Icon icon="lucide:zoom-in" className="text-white text-xl sm:text-2xl" />
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
          
          {/* Remove the standalone Gallery section */}
          
          {/* Related Products */}
          <div className="mb-6 sm:mb-12 px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Похожие программы</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <img 
                      src={relatedProduct.mainImage} 
                      alt={relatedProduct.title} 
                      className="w-full h-48 object-cover"
                    />
                    <CardBody className="p-4">
                      <h3 className="font-bold mb-2">{relatedProduct.title}</h3>
                      <p className="text-default-500 text-sm mb-4">{relatedProduct.description.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">{relatedProduct.price}</span>
                        <Button
                          as={RouterLink}
                          to={`/product/${relatedProduct.slug}`}
                          variant="flat"
                          color="primary"
                          size="sm"
                        >
                          Подробнее
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <Card className="bg-primary text-white shadow-lg mx-4">
            <CardBody className="p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Готовы начать свое приключение?</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">Забронируйте место прямо сейчас и получите незабываемые впечатления!</p>
              <Button
                color="warning"
                size="lg"
                className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base"
                startContent={<Icon icon="lucide:calendar-plus" />}
                onPress={handleBooking}
              >
                Забронировать {product?.title}
              </Button>
            </CardBody>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
}