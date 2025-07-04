import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockUser, mockLeaderboard } from '@/data/mockData';

const Leaderboard = () => {
  const [filter, setFilter] = useState('global');
  const [timeframe, setTimeframe] = useState('all');

  const xpBreakdown = {
    daily: 145,
    weekly: 680,
    monthly: 2450
  };

  const nextLevelXP = 2500;
  const progressToNext = (mockUser.xp / nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">XP & Leaderboard</h1>
          <p className="text-muted-foreground">Track your progress and compete with other learners</p>
        </div>

        {/* XP Progress Section */}
        <Card className="card-eco">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Your XP Progress</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{xpBreakdown.daily}</div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">{xpBreakdown.weekly}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-water mb-2">{xpBreakdown.monthly}</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Level {mockUser.level}</span>
                <span className="text-sm text-muted-foreground">
                  {mockUser.xp} / {nextLevelXP} XP
                </span>
              </div>
              <Progress value={progressToNext} className="h-3" />
              <div className="text-sm text-muted-foreground mt-2">
                {nextLevelXP - mockUser.xp} XP until Level {mockUser.level + 1}
              </div>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <Card className="card-eco">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockUser.badges.map((badge) => (
                <div key={badge.id} className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Leaderboard Section */}
        <Card className="card-eco">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Leaderboard</h2>
              
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'global' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('global')}
                  className={filter === 'global' ? 'btn-eco' : ''}
                >
                  Global
                </Button>
                <Button
                  variant={filter === 'country' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('country')}
                  className={filter === 'country' ? 'btn-eco' : ''}
                >
                  USA
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {mockLeaderboard.map((user, index) => (
                <div
                  key={user.rank}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    user.name.includes('You') 
                      ? 'bg-primary/10 border-2 border-primary/20 shadow-glow' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    user.rank === 1 ? 'bg-yellow-500 text-white' :
                    user.rank === 2 ? 'bg-gray-400 text-white' :
                    user.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-muted text-foreground'
                  }`}>
                    {user.rank <= 3 ? (
                      user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                    ) : (
                      user.rank
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.country}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{user.xp.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">XP</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Achievement Goals */}
        <Card className="card-eco">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Achievement Goals</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Complete 5 courses</span>
                  <span className="text-sm text-muted-foreground">3/5</span>
                </div>
                <Progress value={60} className="mb-2" />
                <div className="text-sm text-muted-foreground">+500 XP reward</div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">7-day learning streak</span>
                  <span className="text-sm text-muted-foreground">{mockUser.streak}/7</span>
                </div>
                <Progress value={(mockUser.streak / 7) * 100} className="mb-2" />
                <div className="text-sm text-muted-foreground">+300 XP reward</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;