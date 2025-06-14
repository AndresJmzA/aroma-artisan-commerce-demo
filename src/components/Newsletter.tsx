
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store in localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive"
        });
      } else {
        subscribers.push(email);
        localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
        setIsSubscribed(true);
        toast({
          title: t('newsletter.success'),
          description: "You'll receive our latest updates and brewing tips.",
        });
      }
      
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-coffee-600 to-coffee-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in">
              <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                {t('newsletter.success')}
              </h2>
              <p className="text-coffee-100 text-lg">
                Welcome to the Café Artesano family! Check your inbox for a welcome message.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-coffee-600 to-coffee-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-fade-in">
            <Mail className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-coffee-100 text-lg mb-8">
              {t('newsletter.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-coffee-200 focus:bg-white/20 focus:border-white/40"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-coffee-600 hover:bg-coffee-50 font-semibold px-8 transition-colors duration-200"
              >
                {isLoading ? 'Subscribing...' : t('newsletter.subscribe')}
              </Button>
            </form>

            <p className="text-coffee-200 text-sm mt-4">
              No spam, unsubscribe at any time. Demo functionality - emails stored locally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
