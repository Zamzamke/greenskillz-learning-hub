import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-green-learning.jpg';

const Landing = () => {
  const features = [
    {
      title: "Microlearning Modules",
      description: "Bite-sized lessons that fit your schedule",
      icon: "📚"
    },
    {
      title: "Gamified XP System", 
      description: "Earn points and level up as you learn",
      icon: "🎮"
    },
    {
      title: "AI Mentorship",
      description: "Personalized guidance for your green journey",
      icon: "🤖"
    },
    {
      title: "Job Matching",
      description: "Connect with green economy opportunities",
      icon: "💼"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Green Learning Environment" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Learn Green.
            <br />
            <span className="gradient-text bg-gradient-to-r from-accent to-water bg-clip-text text-transparent">
              Act Green.
            </span>
            <br />
            Earn Green.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Master climate skills, earn XP, and build a sustainable career in the green economy
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="btn-eco text-lg px-8 py-4">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="btn-nature text-lg px-8 py-4">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
            Why GreenSkillz?
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            The most engaging way to learn climate skills and advance your green career
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-eco text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-nature">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of learners building sustainable careers
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;