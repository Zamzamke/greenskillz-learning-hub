import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockUser, mockEcoProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const EcoShop = () => {
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const filteredProducts = filter === 'all' 
    ? mockEcoProducts 
    : mockEcoProducts.filter(product => product.category.toLowerCase() === filter);

  const canAfford = (price: number) => mockUser.xp >= price;

  const handlePurchase = (product: any) => {
    if (canAfford(product.price)) {
      toast({
        title: "Purchase Successful! 🎉",
        description: `You've unlocked ${product.name} for ${product.price} XP!`,
      });
    } else {
      toast({
        title: "Insufficient XP",
        description: `You need ${product.price - mockUser.xp} more XP to unlock this item.`,
        variant: "destructive",
      });
    }
  };

  const categories = ['all', 'lifestyle', 'tech', 'gardening', 'office'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">EcoShop 🌿</h1>
          <p className="text-muted-foreground mb-4">
            Redeem your XP for sustainable products and eco-friendly rewards
          </p>
          <Card className="card-eco inline-block px-6 py-3">
            <div className="text-2xl font-bold text-primary">
              {mockUser.xp.toLocaleString()} XP
            </div>
            <div className="text-sm text-muted-foreground">Available to spend</div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(category)}
              className={`capitalize ${filter === category ? 'btn-eco' : ''}`}
            >
              {category === 'all' ? 'All Products' : category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-eco overflow-hidden">
              <div className="p-6">
                {/* Product Icon/Image */}
                <div className="text-6xl text-center mb-4">{product.image}</div>
                
                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                      {product.category}
                    </span>
                    <div className="flex text-sm">
                      {renderStars(product.greenRating)}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  
                  {/* Sustainability Rating */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Green Rating:</span>
                    <div className="flex">
                      {Array.from({ length: product.greenRating }, (_, i) => (
                        <span key={i} className="text-green-500">🌿</span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Purchase */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-2xl font-bold text-primary">
                      {product.price} XP
                    </div>
                    <Button
                      onClick={() => handlePurchase(product)}
                      disabled={!canAfford(product.price)}
                      className={canAfford(product.price) ? 'btn-eco' : ''}
                      variant={canAfford(product.price) ? 'default' : 'outline'}
                    >
                      {canAfford(product.price) ? 'Unlock' : 'Need More XP'}
                    </Button>
                  </div>
                  
                  {!canAfford(product.price) && (
                    <div className="text-sm text-muted-foreground text-center">
                      Need {product.price - mockUser.xp} more XP
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* How to Earn More XP */}
        <Card className="card-eco">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Need More XP? 🚀</h2>
            <p className="text-muted-foreground mb-6">
              Complete courses, take quizzes, and maintain your learning streak to earn more XP!
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold">Complete Courses</div>
                <div className="text-sm text-muted-foreground">150-200 XP each</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold">Take Quizzes</div>
                <div className="text-sm text-muted-foreground">50-100 XP each</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl mb-2">🔥</div>
                <div className="font-semibold">Daily Streak</div>
                <div className="text-sm text-muted-foreground">25 XP per day</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EcoShop;