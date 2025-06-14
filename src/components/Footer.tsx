
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: t('footer.about'), href: '#' },
        { label: 'Our Story', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: t('footer.contact'), href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Shipping', href: '#' },
        { label: 'Returns', href: '#' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: t('footer.privacy'), href: '#' },
        { label: t('footer.terms'), href: '#' },
        { label: 'Cookies', href: '#' },
        { label: 'Accessibility', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-espresso-900 text-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-cream-50 mb-4">
              Café Artesano
            </h3>
            <p className="text-cream-200 mb-6 leading-relaxed">
              Crafting the perfect cup of coffee since 2020. From bean to brew, we're passionate about bringing you the world's finest coffee experiences.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-cream-200">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">123 Coffee Street, Bean City</span>
              </div>
              <div className="flex items-center text-cream-200">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+1 (555) 123-BREW</span>
              </div>
              <div className="flex items-center text-cream-200">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">hello@cafeartesano.com</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-cream-50 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-cream-200 hover:text-cream-50 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-espresso-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-cream-200 text-sm mb-4 md:mb-0">
            © 2024 Café Artesano. All rights reserved. | Portfolio Template Demo
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-cream-200 text-sm mr-2">{t('footer.social')}:</span>
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-cream-200 hover:text-cream-50 hover:bg-espresso-800 p-2"
                asChild
              >
                <a href={social.href} aria-label={social.label}>
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
