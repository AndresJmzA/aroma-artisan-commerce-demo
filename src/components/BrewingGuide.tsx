
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, Thermometer, Scale, Coffee } from 'lucide-react';

const BrewingGuide: React.FC = () => {
  const { t } = useLanguage();

  const brewingMethods = [
    {
      id: 'espresso',
      name: t('brewing.espresso'),
      icon: Coffee,
      time: '25-30 seconds',
      temperature: '90-96°C',
      ratio: '1:2',
      grind: 'Fine',
      steps: [
        'Dose 18-20g of finely ground coffee',
        'Level and tamp with 30lbs of pressure',
        'Lock portafilter and start extraction',
        'Aim for 25-30 second extraction time',
        'Stop when you have 36-40ml of espresso'
      ],
      tips: [
        'Use freshly roasted beans (7-21 days old)',
        'Maintain consistent water temperature',
        'Clean equipment regularly for best taste'
      ]
    },
    {
      id: 'pourover',
      name: t('brewing.pourover'),
      icon: Coffee,
      time: '3-4 minutes',
      temperature: '88-92°C',
      ratio: '1:15',
      grind: 'Medium-Fine',
      steps: [
        'Heat water to 88-92°C',
        'Rinse filter and warm brewing vessel',
        'Add 25g medium-fine ground coffee',
        'Start timer, pour 50ml water for bloom (30s)',
        'Continue pouring in circular motions',
        'Finish brewing by 3:30-4:00'
      ],
      tips: [
        'Pour steadily in concentric circles',
        'Maintain consistent water temperature',
        'Use a gooseneck kettle for control'
      ]
    },
    {
      id: 'frenchpress',
      name: t('brewing.frenchpress'),
      icon: Coffee,
      time: '4 minutes',
      temperature: '92-96°C',
      ratio: '1:12',
      grind: 'Coarse',
      steps: [
        'Heat water to 92-96°C',
        'Add 30g coarsely ground coffee to press',
        'Pour hot water, filling halfway and stir',
        'Add remaining water to fill press',
        'Place lid, wait 4 minutes',
        'Press down slowly and serve'
      ],
      tips: [
        'Use coarse, even grind',
        'Don\'t over-extract by leaving too long',
        'Pre-heat the French press for better temperature'
      ]
    },
    {
      id: 'coldbrew',
      name: t('brewing.cold'),
      icon: Coffee,
      time: '12-24 hours',
      temperature: 'Room temp',
      ratio: '1:8',
      grind: 'Coarse',
      steps: [
        'Combine 100g coarse ground coffee with 800ml room temperature water',
        'Stir to ensure all grounds are saturated',
        'Cover and steep for 12-24 hours',
        'Strain through fine mesh or filter',
        'Dilute concentrate 1:1 with water or milk',
        'Serve over ice'
      ],
      tips: [
        'Longer steeping = stronger concentrate',
        'Store concentrate up to 2 weeks refrigerated',
        'Experiment with different coffee origins'
      ]
    }
  ];

  return (
    <section id="brewing" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-900 mb-4">
            {t('brewing.title')}
          </h2>
          <p className="text-lg text-coffee-700 max-w-2xl mx-auto">
            {t('brewing.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="espresso" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-coffee-50">
            {brewingMethods.map((method) => (
              <TabsTrigger
                key={method.id}
                value={method.id}
                className="data-[state=active]:bg-coffee-600 data-[state=active]:text-white"
              >
                <method.icon className="h-4 w-4 mr-2" />
                {method.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {brewingMethods.map((method) => (
            <TabsContent key={method.id} value={method.id} className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-coffee-900">
                      <method.icon className="h-5 w-5 mr-2" />
                      {method.name} Guide
                    </CardTitle>
                    <CardDescription>Perfect brewing parameters and technique</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Brewing Parameters */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-coffee-600" />
                        <div>
                          <p className="text-sm text-coffee-600">Brew Time</p>
                          <p className="font-semibold text-coffee-900">{method.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-coffee-600" />
                        <div>
                          <p className="text-sm text-coffee-600">Temperature</p>
                          <p className="font-semibold text-coffee-900">{method.temperature}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Scale className="h-4 w-4 text-coffee-600" />
                        <div>
                          <p className="text-sm text-coffee-600">Coffee:Water Ratio</p>
                          <p className="font-semibold text-coffee-900">{method.ratio}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Coffee className="h-4 w-4 text-coffee-600" />
                        <div>
                          <p className="text-sm text-coffee-600">Grind Size</p>
                          <p className="font-semibold text-coffee-900">{method.grind}</p>
                        </div>
                      </div>
                    </div>

                    {/* Brewing Steps */}
                    <div>
                      <h4 className="font-semibold text-coffee-900 mb-3">Brewing Steps</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <Badge className="mr-3 mt-0.5 bg-coffee-600 text-white min-w-6 h-6 rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </Badge>
                            <p className="text-coffee-700">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-coffee-900">Pro Tips</CardTitle>
                    <CardDescription>Expert advice for the perfect cup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {method.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-coffee-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-coffee-700">{tip}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Visual brewing timer mockup */}
                    <div className="mt-8 p-4 bg-coffee-50 rounded-lg">
                      <h5 className="font-semibold text-coffee-900 mb-3">Brewing Timer</h5>
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="text-2xl font-mono font-bold text-coffee-900">
                          00:00
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-coffee-600 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-2 border-l-white border-y-2 border-y-transparent ml-0.5"></div>
                          </div>
                          <div className="w-8 h-8 bg-coffee-200 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-coffee-600 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-coffee-600 mt-2 text-center">
                        Visual timer component (demo only)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default BrewingGuide;
