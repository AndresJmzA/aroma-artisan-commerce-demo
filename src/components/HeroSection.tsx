import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

// 1. IMPORTA LA IMAGEN AQUÍ
import heroImage from '/img/hero_section_img.png';

const HeroSection: React.FC = () => {
  const {
    t
  } = useLanguage();
  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-coffee-50 via-cream-50 to-coffee-100">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      {/* 2. USA LA VARIABLE IMPORTADA AQUÍ */}
      <img alt="Premium coffee beans" src={heroImage} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>

    {/* Animated Steam Effects */}
    <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30">

      <div className="animate-steam bg-white rounded-full blur-sm w-3 h-3 absolute left-6" style={{
        animationDelay: '0.5s'
      }}></div>
      <div className="animate-steam bg-white rounded-full blur-sm w-2 h-2 absolute left-12" style={{
        animationDelay: '1s'
      }}></div>
    </div>

    <div className="absolute top-1/3 right-1/4 w-32 h-32 opacity-20">
      <div className="animate-steam bg-coffee-200 rounded-full blur-md w-6 h-6 absolute" style={{
        animationDelay: '1.5s'
      }}></div>
      <div className="animate-steam bg-coffee-200 rounded-full blur-md w-4 h-4 absolute left-8" style={{
        animationDelay: '2s'
      }}></div>
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={scrollToProducts} size="lg" className="bg-coffee-600 hover:bg-coffee-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button variant="outline" size="lg" className="border-white hover:bg-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 text-cream-700">
            <Play className="mr-2 h-5 w-5" />
            {t('hero.learn')}
          </Button>
        </div>
      </div>

      {/* Floating Coffee Bean */}

    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>;
};
export default HeroSection;