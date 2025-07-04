import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockCourses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const course = mockCourses.find(c => c.id === parseInt(id || '0'));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="card-eco text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/dashboard')} className="btn-eco">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === course.quiz.questions[currentQuiz].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuiz < course.quiz.questions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleCompleteLesson = () => {
    const xpEarned = course.xp;
    toast({
      title: "Lesson Completed! 🎉",
      description: `You earned ${xpEarned} XP!`,
    });
    
    // Update progress (in real app, this would be saved to backend)
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const currentQuestion = course.quiz.questions[currentQuiz];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {!showQuiz ? (
          <>
            {/* Course Header */}
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="mb-4"
              >
                ← Back to Dashboard
              </Button>
              
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{course.title}</h1>
                  <p className="text-muted-foreground">{course.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {course.category}
                    </span>
                    <span>{course.duration}</span>
                    <span className="text-primary font-medium">+{course.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Progress */}
            <Card className="card-eco">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Your Progress</h2>
                  <span className="text-sm text-muted-foreground">{course.progress}% Complete</span>
                </div>
                <Progress value={course.progress} className="mb-4" />
                
                <div className="space-y-3">
                  {course.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        lesson.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {lesson.completed ? '✓' : lesson.id}
                      </div>
                      <span className={lesson.completed ? 'text-foreground' : 'text-muted-foreground'}>
                        {lesson.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Course Content */}
            <Card className="card-eco">
              <div className="p-6 space-y-6">
                <h2 className="text-2xl font-semibold">Course Content</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    This comprehensive course will introduce you to the fundamentals of renewable energy 
                    and how it's transforming our world. You'll learn about different types of renewable 
                    energy sources, their benefits, and how they contribute to a sustainable future.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">What You'll Learn:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Understanding different renewable energy sources</li>
                    <li>• Solar power systems and their applications</li>
                    <li>• Wind energy technology and implementation</li>
                    <li>• The role of renewable energy in climate action</li>
                    <li>• Career opportunities in the renewable energy sector</li>
                  </ul>

                  <div className="bg-muted/50 p-6 rounded-lg mt-8">
                    <h4 className="font-semibold text-primary mb-2">🌱 Did You Know?</h4>
                    <p className="text-sm text-muted-foreground">
                      Solar energy is the most abundant energy resource on Earth. In just one hour, 
                      the sun delivers more energy to our planet than the world uses in an entire year!
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleStartQuiz} className="btn-eco flex-1">
                Start Quiz
              </Button>
              <Button onClick={handleCompleteLesson} className="btn-nature flex-1">
                Mark as Complete
              </Button>
            </div>
          </>
        ) : (
          /* Quiz Section */
          <Card className="card-eco">
            <div className="p-6">
              {!quizCompleted ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Question {currentQuiz + 1} of {course.quiz.questions.length}</span>
                      <span>Quiz Progress</span>
                    </div>
                    <Progress value={((currentQuiz + 1) / course.quiz.questions.length) * 100} />
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">{currentQuestion.question}</h2>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAnswer(index)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                            selectedAnswer === index
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    <Button 
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswer === null}
                      className="btn-eco w-full"
                    >
                      {currentQuiz === course.quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                </>
              ) : (
                /* Quiz Results */
                <div className="text-center space-y-6">
                  <div className="text-6xl">🎉</div>
                  <h2 className="text-3xl font-bold">Quiz Completed!</h2>
                  <div className="space-y-2">
                    <div className="text-2xl font-semibold">
                      Score: {score}/{course.quiz.questions.length}
                    </div>
                    <div className="text-lg text-primary font-medium">
                      +{course.xp} XP Earned!
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => setShowQuiz(false)} variant="outline" className="flex-1">
                      Review Course
                    </Button>
                    <Button onClick={() => navigate('/dashboard')} className="btn-eco flex-1">
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Course;