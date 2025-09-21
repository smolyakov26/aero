import React from "react";

export function useExitIntent() {
  const [isExitIntentModalOpen, setIsExitIntentModalOpen] = React.useState(false);
  const hasShownRef = React.useRef(false);

  React.useEffect(() => {
    const hasShown = localStorage.getItem("exitIntentShown") === "true";
    hasShownRef.current = hasShown;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownRef.current) {
        setIsExitIntentModalOpen(true);
        hasShownRef.current = true;
        localStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const closeExitIntentModal = () => {
    setIsExitIntentModalOpen(false);
  };

  return {
    isExitIntentModalOpen,
    closeExitIntentModal
  };
}
