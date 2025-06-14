
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ShoppingCart, User, Globe } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onCartClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.products', href: '#products' },
    { key: 'nav.brewing', href: '#brewing' },
    { key: 'nav.blog', href: '#blog' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-coffee-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-coffee-800">
              Café Artesano
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollToSection(href)}
                className="text-coffee-700 hover:text-coffee-900 transition-colors duration-200 font-medium"
              >
                {t(key)}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-coffee-700 hover:text-coffee-900"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative text-coffee-700 hover:text-coffee-900"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-coffee-600 text-white text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>

            {/* Auth Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAuthClick}
              className="hidden sm:flex text-coffee-700 hover:text-coffee-900"
            >
              <User className="h-4 w-4 mr-1" />
              {t('nav.login')}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navigation.map(({ key, href }) => (
                    <button
                      key={key}
                      onClick={() => scrollToSection(href)}
                      className="text-left text-lg text-coffee-700 hover:text-coffee-900 transition-colors duration-200 py-2 border-b border-coffee-100"
                    >
                      {t(key)}
                    </button>
                  ))}
                  <Button
                    onClick={onAuthClick}
                    className="mt-4 w-full bg-coffee-600 hover:bg-coffee-700 text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.login')}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
