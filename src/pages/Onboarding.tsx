import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { interests } from '@/data/mockData';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('user', JSON.stringify({ name, interests: selectedInterests }));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 card-eco">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🌱</div>
            <h1 className="text-3xl font-bold gradient-text">Welcome to GreenSkillz!</h1>
            <p className="text-lg text-muted-foreground">
              Let's personalize your learning journey to help you master climate skills and advance your green career.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">What's your name?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-2">What interests you most?</h2>
              <p className="text-muted-foreground">Select all that apply - we'll customize your experience</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedInterests.includes(interest)
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium">{interest}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold gradient-text">You're all set, {name}!</h2>
            <p className="text-lg text-muted-foreground">
              Based on your interests, we've prepared personalized courses and content just for you.
            </p>
            
            <Card className="p-4 bg-muted/50">
              <h3 className="font-semibold mb-2">Your Selected Interests:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <span 
                    key={interest} 
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={(step === 1 && !name) || (step === 2 && selectedInterests.length === 0)}
            className="btn-eco"
          >
            {step === totalSteps ? 'Start Learning' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;