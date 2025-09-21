import React from "react";

export function useBookingModal() {
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("");

  const openBookingModal = (service: string) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return {
    isBookingModalOpen,
    selectedService,
    openBookingModal,
    closeBookingModal
  };
}
