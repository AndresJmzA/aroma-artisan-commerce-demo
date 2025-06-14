
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    toast({
      title: "Checkout initiated",
      description: "This is a demo - no real payment processing.",
    });
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      onClose();
      toast({
        title: "Order confirmed!",
        description: "Thank you for your purchase. Order confirmation sent to your email.",
      });
    }, 2000);
  };

  const scrollToProducts = () => {
    onClose();
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center text-coffee-900 font-serif text-2xl">
            <ShoppingCart className="h-6 w-6 mr-2" />
            {t('cart.title')}
          </DialogTitle>
          <DialogDescription>
            {items.length > 0 
              ? `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`
              : t('cart.empty')
            }
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-coffee-300 mx-auto mb-4" />
              <p className="text-coffee-600 text-lg mb-6">{t('cart.empty')}</p>
              <Button 
                onClick={scrollToProducts}
                className="bg-coffee-600 hover:bg-coffee-700 text-white"
              >
                {t('cart.continueShopping')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-coffee-100 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-coffee-900">{item.name}</h4>
                    <p className="text-sm text-coffee-600">{item.origin} • {item.roast} Roast</p>
                    <p className="font-bold text-coffee-800">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0 border-coffee-300"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <Badge variant="outline" className="px-2 py-1 border-coffee-300">
                      {item.quantity}
                    </Badge>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0 border-coffee-300"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold text-coffee-900">
                <span>{t('cart.total')}:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={scrollToProducts}
                  className="flex-1 border-coffee-600 text-coffee-600 hover:bg-coffee-600 hover:text-white"
                >
                  {t('cart.continueShopping')}
                </Button>
                
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-coffee-600 hover:bg-coffee-700 text-white"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t('cart.checkout')}
                </Button>
              </div>
              
              <p className="text-xs text-coffee-600 text-center">
                Demo checkout - no real payment processing
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
