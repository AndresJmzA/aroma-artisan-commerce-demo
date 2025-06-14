
import React, { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import BrewingGuide from '@/components/BrewingGuide';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CartModal from '@/components/CartModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Header 
            onAuthClick={() => setIsAuthModalOpen(true)}
            onCartClick={() => setIsCartModalOpen(true)}
          />
          
          <main>
            <HeroSection />
            <ProductsSection />
            <BrewingGuide />
            <Newsletter />
          </main>
          
          <Footer />
          
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
          
          <CartModal
            isOpen={isCartModalOpen}
            onClose={() => setIsCartModalOpen(false)}
          />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default Index;
