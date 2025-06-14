
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Star } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  origin: string;
  roast: string;
  notes: string[];
  description: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      roast: product.roast,
      origin: product.origin,
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  return (
    <Card 
      className={`overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
            isFavorited ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
        
        {/* Rating Badge */}
        <Badge className="absolute top-2 left-2 bg-coffee-600 text-white">
          <Star className="h-3 w-3 mr-1 fill-current" />
          {product.rating}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif text-coffee-900">{product.name}</CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription className="text-coffee-600">{product.origin}</CardDescription>
          <span className="text-xl font-bold text-coffee-800">${product.price}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <Badge variant="outline" className="text-coffee-700 border-coffee-300">
            {product.roast} Roast
          </Badge>
          
          <div className="flex flex-wrap gap-1">
            {product.notes.map((note, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-cream-100 text-coffee-700">
                {note}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-coffee-600 line-clamp-2">{product.description}</p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-coffee-600 hover:bg-coffee-700 text-white transition-colors duration-200"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('products.addToCart')}
        </Button>
        <Button
          variant="outline"
          className="border-coffee-600 text-coffee-600 hover:bg-coffee-600 hover:text-white transition-colors duration-200"
        >
          {t('products.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
