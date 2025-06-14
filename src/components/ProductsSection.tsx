import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Product } from '@/types';
import { Search, Filter } from 'lucide-react';

// 1. IMPORTA TODAS TUS IMÁGENES AQUÍ
import productImage1 from '/img/1.png';
import productImage2 from '/img/2.png';
import productImage3 from '/img/3.png';
import productImage4 from '/img/4.png';
import productImage5 from '/img/5.png';
import productImage6 from '/img/6.png';
import ProductCard from './ProductCard';


const ProductsSection: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // 2. USA LAS VARIABLES IMPORTADAS EN LA LISTA
  const products: Product[] = [
    {
      id: '1',
      name: 'Ethiopian Yirgacheffe',
      price: 24.99,
      image: productImage1, // <- CAMBIADO
      origin: 'Ethiopia',
      roast: 'Light',
      notes: ['Floral', 'Citrus', 'Tea-like'],
      description: 'A bright and complex coffee with wine-like acidity and floral aromatics.',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Colombian Supremo',
      price: 19.99,
      image: productImage2, // <- CAMBIADO
      origin: 'Colombia',
      roast: 'Medium',
      notes: ['Chocolate', 'Caramel', 'Nutty'],
      description: 'Full-bodied with rich chocolate notes and a smooth, balanced finish.',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Brazilian Santos',
      price: 17.99,
      image: productImage3, // <- CAMBIADO
      origin: 'Brazil',
      roast: 'Dark',
      notes: ['Bold', 'Smoky', 'Low Acid'],
      description: 'A robust coffee with bold flavors and a rich, smoky finish.',
      rating: 4.4
    },
    {
      id: '4',
      name: 'Guatemala Antigua',
      price: 22.99,
      image: productImage4, // <- CAMBIADO
      origin: 'Guatemala',
      roast: 'Medium',
      notes: ['Spicy', 'Smoky', 'Full Body'],
      description: 'Complex flavors with spicy undertones and a distinctive smoky character.',
      rating: 4.7
    },
    {
      id: '5',
      name: 'Costa Rican Tarrazú',
      price: 26.99,
      image: productImage5, // <- CAMBIADO
      origin: 'Costa Rica',
      roast: 'Light',
      notes: ['Bright', 'Fruity', 'Clean'],
      description: 'Bright acidity with fruity notes and a clean, crisp finish.',
      rating: 4.9
    },
    {
      id: '6',
      name: 'Jamaican Blue Mountain',
      price: 49.99,
      image: productImage6, // <- CAMBIADO
      origin: 'Jamaica',
      roast: 'Medium',
      notes: ['Mild', 'Sweet', 'Balanced'],
      description: 'The world\'s most sought-after coffee with perfect balance and no bitterness.',
      rating: 5.0
    }
  ];

  const filteredProducts = products
    .filter(product => {
      if (searchTerm) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return true;
    })
    .filter(product => {
      if (filterBy === 'all') return true;
      return product.roast.toLowerCase() === filterBy.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <section id="products" className="py-16 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-900 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-lg text-coffee-700 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-400" />
            <Input
              placeholder="Search coffee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-coffee-200 focus:border-coffee-500"
            />
          </div>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-48 border-coffee-200">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by roast" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roasts</SelectItem>
              <SelectItem value="light">Light Roast</SelectItem>
              <SelectItem value="medium">Medium Roast</SelectItem>
              <SelectItem value="dark">Dark Roast</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 border-coffee-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-coffee-600 text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
              }}
              variant="outline"
              className="mt-4 border-coffee-600 text-coffee-600 hover:bg-coffee-600 hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;