import React from "react";
import { Card, Button, Modal, ModalContent, ModalBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface GalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);
  
  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };
  
  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };
  
  return (
    <div className="w-full">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Галерея</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
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
      
      {/* Lightbox Modal with mobile optimizations */}
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
                      src={images[selectedImage].src} 
                      alt={images[selectedImage].alt} 
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
                      {selectedImage + 1} / {images.length}
                    </div>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}