
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.brewing': 'Brewing Guide',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Hero Section
    'hero.title': 'Discover Your Perfect Brew',
    'hero.subtitle': 'From bean to cup, experience the art of premium coffee crafted with passion and precision.',
    'hero.cta': 'Shop Now',
    'hero.learn': 'Learn More',
    
    // Products
    'products.title': 'Featured Coffee',
    'products.subtitle': 'Carefully selected beans from the world\'s finest coffee regions',
    'products.addToCart': 'Add to Cart',
    'products.viewDetails': 'View Details',
    'products.price': 'Price',
    'products.origin': 'Origin',
    'products.roast': 'Roast Level',
    'products.notes': 'Tasting Notes',
    
    // Brewing Guide
    'brewing.title': 'Perfect Brewing Guide',
    'brewing.subtitle': 'Master the art of coffee brewing with our expert techniques',
    'brewing.espresso': 'Espresso',
    'brewing.pourover': 'Pour Over',
    'brewing.frenchpress': 'French Press',
    'brewing.cold': 'Cold Brew',
    
    // Newsletter
    'newsletter.title': 'Stay Connected',
    'newsletter.subtitle': 'Get exclusive offers and brewing tips delivered to your inbox',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'Thanks for subscribing!',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.social': 'Follow Us',
    
    // Authentication
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Full Name',
    'auth.loginButton': 'Sign In',
    'auth.signupButton': 'Create Account',
    'auth.switchToSignup': 'Don\'t have an account? Sign up',
    'auth.switchToLogin': 'Already have an account? Sign in',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.checkout': 'Proceed to Checkout',
    'cart.total': 'Total',
    'cart.quantity': 'Quantity',
    'cart.remove': 'Remove',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.brewing': 'Guía de Preparación',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.cart': 'Carrito',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registrarse',
    
    // Hero Section
    'hero.title': 'Descubre Tu Café Perfecto',
    'hero.subtitle': 'Del grano a la taza, experimenta el arte del café premium elaborado con pasión y precisión.',
    'hero.cta': 'Comprar Ahora',
    'hero.learn': 'Saber Más',
    
    // Products
    'products.title': 'Café Destacado',
    'products.subtitle': 'Granos cuidadosamente seleccionados de las mejores regiones cafeteras del mundo',
    'products.addToCart': 'Añadir al Carrito',
    'products.viewDetails': 'Ver Detalles',
    'products.price': 'Precio',
    'products.origin': 'Origen',
    'products.roast': 'Nivel de Tueste',
    'products.notes': 'Notas de Cata',
    
    // Brewing Guide
    'brewing.title': 'Guía de Preparación Perfecta',
    'brewing.subtitle': 'Domina el arte de preparar café con nuestras técnicas expertas',
    'brewing.espresso': 'Espresso',
    'brewing.pourover': 'Goteo',
    'brewing.frenchpress': 'Prensa Francesa',
    'brewing.cold': 'Café Frío',
    
    // Newsletter
    'newsletter.title': 'Mantente Conectado',
    'newsletter.subtitle': 'Recibe ofertas exclusivas y consejos de preparación en tu bandeja de entrada',
    'newsletter.placeholder': 'Ingresa tu email',
    'newsletter.subscribe': 'Suscribirse',
    'newsletter.success': '¡Gracias por suscribirte!',
    
    // Footer
    'footer.about': 'Nosotros',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.social': 'Síguenos',
    
    // Authentication
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.name': 'Nombre Completo',
    'auth.loginButton': 'Entrar',
    'auth.signupButton': 'Crear Cuenta',
    'auth.switchToSignup': '¿No tienes cuenta? Regístrate',
    'auth.switchToLogin': '¿Ya tienes cuenta? Inicia sesión',
    
    // Cart
    'cart.title': 'Carrito de Compra',
    'cart.empty': 'Tu carrito está vacío',
    'cart.continueShopping': 'Continuar Comprando',
    'cart.checkout': 'Proceder al Pago',
    'cart.total': 'Total',
    'cart.quantity': 'Cantidad',
    'cart.remove': 'Eliminar',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.success': '¡Éxito!',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.close': 'Cerrar',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
