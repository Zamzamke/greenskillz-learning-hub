import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockJobs, mockCertifications } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobFilter, setJobFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const { toast } = useToast();

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
    
    toast({
      title: savedJobs.includes(jobId) ? "Job Removed" : "Job Saved!",
      description: savedJobs.includes(jobId) 
        ? "Removed from your saved jobs" 
        : "Added to your saved jobs",
    });
  };

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Started! 🚀",
      description: `Opening application for ${jobTitle}`,
    });
  };

  const handleDownloadCert = (certName: string) => {
    toast({
      title: "Certificate Downloaded! 📄",
      description: `${certName} certificate downloaded successfully`,
    });
  };

  const filteredJobs = jobFilter === 'all' 
    ? mockJobs 
    : jobFilter === 'saved' 
    ? mockJobs.filter(job => savedJobs.includes(job.id))
    : mockJobs.filter(job => job.type.toLowerCase() === jobFilter);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Green Jobs & Certifications</h1>
          <p className="text-muted-foreground">
            Advance your career in the green economy
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={activeTab === 'jobs' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('jobs')}
              className={activeTab === 'jobs' ? 'btn-eco' : ''}
            >
              Job Opportunities
            </Button>
            <Button
              variant={activeTab === 'certs' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('certs')}
              className={activeTab === 'certs' ? 'btn-eco' : ''}
            >
              My Certifications
            </Button>
          </div>
        </div>

        {activeTab === 'jobs' ? (
          <>
            {/* Job Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {['all', 'full-time', 'contract', 'remote', 'saved'].map((filter) => (
                <Button
                  key={filter}
                  variant={jobFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setJobFilter(filter)}
                  className={`capitalize ${jobFilter === filter ? 'btn-eco' : ''}`}
                >
                  {filter === 'all' ? 'All Jobs' : 
                   filter === 'saved' ? 'Saved Jobs' : 
                   filter.replace('-', ' ')}
                </Button>
              ))}
            </div>

            {/* Jobs List */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="card-eco">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {job.type}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-lg font-semibold text-primary">{job.company}</div>
                          <div className="text-muted-foreground">{job.location}</div>
                          <div className="text-lg font-medium text-accent">{job.salary}</div>
                          <div className="text-sm text-muted-foreground">Posted {job.posted}</div>
                        </div>

                        <p className="text-muted-foreground mb-4">{job.description}</p>

                        <div className="space-y-2">
                          <div className="font-medium">Requirements:</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3 lg:ml-6">
                        <Button
                          onClick={() => handleApply(job.title)}
                          className="btn-eco"
                        >
                          Apply Now
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleSaveJob(job.id)}
                          className={savedJobs.includes(job.id) ? 'bg-muted' : ''}
                        >
                          {savedJobs.includes(job.id) ? 'Saved' : 'Save Job'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className="card-eco text-center p-8">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  {jobFilter === 'saved' 
                    ? "You haven't saved any jobs yet" 
                    : "Try adjusting your filters"}
                </p>
              </Card>
            )}
          </>
        ) : (
          /* Certifications Tab */
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {mockCertifications.map((cert) => (
                <Card key={cert.id} className="card-eco">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          cert.verified ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {cert.verified ? '✓' : '⏳'}
                        </div>
                        <div>
                          <h3 className="font-bold">{cert.name}</h3>
                          <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                        </div>
                      </div>
                      
                      {cert.verified ? (
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          {cert.progress}% Complete
                        </span>
                      )}
                    </div>

                    {cert.verified && (
                      <div className="text-sm text-muted-foreground mb-4">
                        Issued: {new Date(cert.date).toLocaleDateString()}
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="font-medium text-sm">Skills Covered:</div>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {cert.verified ? (
                      <Button
                        onClick={() => handleDownloadCert(cert.name)}
                        className="w-full btn-eco"
                      >
                        Download Certificate
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${cert.progress}%` }}
                          />
                        </div>
                        <Button variant="outline" className="w-full">
                          Continue Learning
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="card-eco">
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Earn More Certifications</h2>
                <p className="text-muted-foreground mb-6">
                  Complete courses and pass assessments to earn industry-recognized certifications
                </p>
                <Button className="btn-eco">
                  Browse Available Certifications
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;