import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { mockUser, mockCourses } from '@/data/mockData';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || mockUser.name;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Welcome Section */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{userName}</span>! 🌱
          </h1>
          <p className="text-muted-foreground text-lg">Ready to continue your green learning journey?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-eco text-center">
            <div className="text-2xl font-bold text-primary">{mockUser.xp}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </Card>
          <Card className="card-echo text-center">
            <div className="text-2xl font-bold text-accent">Level {mockUser.level}</div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </Card>
          <Card className="card-eco text-center">
            <div className="text-2xl font-bold text-water">{mockUser.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
          <Card className="card-eco text-center">
            <div className="text-2xl font-bold text-earth">{mockUser.badges.length}</div>
            <div className="text-sm text-muted-foreground">Badges</div>
          </Card>
        </div>

        {/* Recommended Courses Carousel */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <Link to="/courses">
              <Button variant="ghost" className="text-primary hover:text-primary/80">View All</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.slice(0, 3).map((course) => (
              <Card key={course.id} className="card-eco overflow-hidden">
                <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{course.duration}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">+{course.xp} XP</span>
                    <Link to={`/course/${course.id}`}>
                      <Button size="sm" className="btn-eco">
                        {course.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Ongoing Courses */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="space-y-4">
            {mockCourses.filter(course => course.progress > 0 && course.progress < 100).map((course) => (
              <Card key={course.id} className="card-eco">
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/course/${course.id}`}>
                        <Button size="sm" className="btn-eco">Resume</Button>
                      </Link>
                      <Link to={`/course/${course.id}/quiz`}>
                        <Button size="sm" variant="outline">Start Quiz</Button>
                      </Link>
                      <Button size="sm" variant="ghost">View Summary</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockUser.badges.map((badge) => (
              <Card key={badge.id} className="card-eco text-center p-4">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;