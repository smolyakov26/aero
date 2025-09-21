import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { SocialProofSection } from "./components/SocialProofSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { AboutSection } from "./components/AboutSection";
import { PricingSection } from "./components/PricingSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { LoginModal } from "./components/LoginModal";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { PersonalCabinetPage } from "./pages/PersonalCabinetPage";
import { ProductPage } from "./pages/ProductPage";
import { useBookingModal } from "./hooks/useBookingModal";
import { useExitIntent } from "./hooks/useExitIntent";
import { SiteUnavailable } from "./components/SiteUnavailable";
import { api } from "./services/api";

export default function App() {
  const { 
    isBookingModalOpen, 
    selectedService, 
    openBookingModal, 
    closeBookingModal 
  } = useBookingModal();
  
  const { isExitIntentModalOpen, closeExitIntentModal } = useExitIntent();
  
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isApiAvailable, setIsApiAvailable] = React.useState(true);

  const handleLogin = (email: string, password: string) => {
    // Simple login simulation
    setIsLoggedIn(true);
  };
  
  // Check API availability on mount
  React.useEffect(() => {
    checkApiAvailability();
  }, []);
  
  // Function to check if API is available
  const checkApiAvailability = async () => {
    try {
      // Try to fetch products as a health check
      await api.getProducts();
      setIsApiAvailable(true);
    } catch (error) {
      console.error("API health check failed:", error);
      setIsApiAvailable(false);
    }
  };
  
  // If API is not available, show the site unavailable page
  if (!isApiAvailable) {
    return <SiteUnavailable onRetry={checkApiAvailability} />;
  }

  const HomePage = () => (
    <>
      <Navbar 
        onBookingClick={() => openBookingModal("Консультация")} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onProfileClick={() => window.location.href = "/profile"}
      />
      
      <main id="main-content" className="flex-grow">
        <HeroSection onBookingClick={openBookingModal} />
        <SocialProofSection />
        <ProgramsSection onBookingClick={openBookingModal} />
        <AboutSection />
        <PricingSection onBookingClick={openBookingModal} />
        <TestimonialsSection />
        <ContactSection />
        <CTASection />
      </main>
      
      <Footer />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Skip to main content for accessibility */}
        <a 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-medium z-50" 
          href="#main-content"
        >
          Перейти к основному содержанию
        </a>
        
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/profile">
            {isLoggedIn ? <PersonalCabinetPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/product/:slug">
            <ProductPage 
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setIsLoginModalOpen(true)}
            />
          </Route>
        </Switch>
        
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={closeBookingModal} 
          service={selectedService} 
        />
        
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
        
        <ExitIntentModal 
          isOpen={isExitIntentModalOpen} 
          onClose={closeExitIntentModal} 
        />
      </div>
    </Router>
  );
}