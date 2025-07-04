// Mock data for GreenSkillz platform

export const mockUser = {
  name: "Alex",
  xp: 2450,
  level: 12,
  streak: 7,
  badges: [
    { id: 1, name: "Eco Warrior", icon: "🌱", description: "Completed first course" },
    { id: 2, name: "Solar Expert", icon: "☀️", description: "Mastered renewable energy" },
    { id: 3, name: "Water Guardian", icon: "💧", description: "Completed water conservation" },
    { id: 4, name: "Urban Farmer", icon: "🌿", description: "Urban farming specialist" }
  ]
};

export const mockCourses = [
  {
    id: 1,
    title: "Introduction to Renewable Energy",
    description: "Learn the basics of solar, wind, and other renewable energy sources",
    image: "/src/assets/course-renewable-energy.jpg",
    duration: "15 min",
    xp: 150,
    difficulty: "Beginner",
    progress: 75,
    category: "Renewable Energy",
    lessons: [
      { id: 1, title: "What is Renewable Energy?", completed: true },
      { id: 2, title: "Solar Power Basics", completed: true },
      { id: 3, title: "Wind Energy Systems", completed: false }
    ],
    quiz: {
      questions: [
        {
          question: "Which of these is a renewable energy source?",
          options: ["Coal", "Solar", "Oil", "Natural Gas"],
          correct: 1
        },
        {
          question: "What does photovoltaic mean?",
          options: ["Light to electricity", "Wind to power", "Water to energy", "Heat to light"],
          correct: 0
        }
      ]
    }
  },
  {
    id: 2,
    title: "Urban Farming Essentials",
    description: "Master the art of growing food in urban environments",
    image: "/src/assets/course-urban-farming.jpg",
    duration: "20 min",
    xp: 200,
    difficulty: "Intermediate",
    progress: 0,
    category: "Urban Farming",
    lessons: [
      { id: 1, title: "Vertical Gardening Basics", completed: false },
      { id: 2, title: "Soil and Composting", completed: false },
      { id: 3, title: "Hydroponic Systems", completed: false }
    ],
    quiz: {
      questions: [
        {
          question: "What is the main advantage of vertical farming?",
          options: ["Uses less water", "Maximizes space", "No pesticides needed", "All of the above"],
          correct: 3
        }
      ]
    }
  },
  {
    id: 3,
    title: "Water Conservation Strategies",
    description: "Learn effective ways to conserve and manage water resources",
    image: "/src/assets/course-water-conservation.jpg",
    duration: "18 min",
    xp: 180,
    difficulty: "Beginner",
    progress: 100,
    category: "Water Conservation",
    lessons: [
      { id: 1, title: "Understanding Water Cycle", completed: true },
      { id: 2, title: "Rainwater Harvesting", completed: true },
      { id: 3, title: "Greywater Systems", completed: true }
    ],
    quiz: {
      questions: [
        {
          question: "What percentage of Earth's water is freshwater?",
          options: ["1%", "3%", "10%", "25%"],
          correct: 1
        }
      ]
    }
  }
];

export const mockLeaderboard = [
  { rank: 1, name: "EcoChampion", xp: 4200, country: "🇺🇸 USA" },
  { rank: 2, name: "GreenGuru", xp: 3800, country: "🇬🇧 UK" },
  { rank: 3, name: "SolarSage", xp: 3600, country: "🇩🇪 Germany" },
  { rank: 4, name: "WindWarrior", xp: 3200, country: "🇩🇰 Denmark" },
  { rank: 5, name: "WaterWise", xp: 2950, country: "🇳🇱 Netherlands" },
  { rank: 6, name: "ClimateHero", xp: 2800, country: "🇸🇪 Sweden" },
  { rank: 7, name: "EarthGuardian", xp: 2600, country: "🇨🇦 Canada" },
  { rank: 8, name: "Alex (You)", xp: 2450, country: "🇺🇸 USA" },
  { rank: 9, name: "GreenThumb", xp: 2200, country: "🇦🇺 Australia" },
  { rank: 10, name: "EcoExplorer", xp: 2100, country: "🇫🇷 France" }
];

export const mockEcoProducts = [
  {
    id: 1,
    name: "Bamboo Water Bottle",
    description: "Sustainable bamboo fiber water bottle with leak-proof design",
    price: 500,
    image: "🌿",
    greenRating: 5,
    category: "Lifestyle"
  },
  {
    id: 2,
    name: "Solar Power Bank",
    description: "Portable solar charger for your devices with 10000mAh capacity",
    price: 800,
    image: "☀️",
    greenRating: 5,
    category: "Tech"
  },
  {
    id: 3,
    name: "Organic Seed Kit",
    description: "Complete starter kit with organic seeds for home gardening",
    price: 300,
    image: "🌱",
    greenRating: 5,
    category: "Gardening"
  },
  {
    id: 4,
    name: "Eco-Friendly Notebook",
    description: "Made from 100% recycled paper with biodegradable cover",
    price: 200,
    image: "📓",
    greenRating: 4,
    category: "Office"
  },
  {
    id: 5,
    name: "LED Growing Light",
    description: "Energy-efficient LED light for indoor plant cultivation",
    price: 1200,
    image: "💡",
    greenRating: 4,
    category: "Gardening"
  }
];

export const mockJobs = [
  {
    id: 1,
    title: "Solar Energy Consultant",
    company: "SunPower Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$65,000 - $85,000",
    description: "Help customers transition to solar energy solutions",
    requirements: ["Renewable Energy Certification", "2+ years experience"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Sustainability Analyst",
    company: "Green Future Corp",
    location: "Remote",
    type: "Contract",
    salary: "$45/hour",
    description: "Analyze environmental impact and develop sustainability strategies",
    requirements: ["Environmental Science degree", "Data analysis skills"],
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Urban Farm Manager",
    company: "City Harvest",
    location: "New York, NY",
    type: "Full-time",
    salary: "$50,000 - $65,000",
    description: "Manage urban farming operations and community outreach",
    requirements: ["Agriculture background", "Urban Farming Certification"],
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "Water Conservation Specialist",
    company: "AquaGreen",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$55,000 - $70,000",
    description: "Develop and implement water conservation programs",
    requirements: ["Environmental Engineering", "Water Management experience"],
    posted: "5 days ago"
  }
];

export const mockCertifications = [
  {
    id: 1,
    name: "Renewable Energy Specialist",
    issuer: "GreenSkillz Academy",
    date: "2024-03-15",
    skills: ["Solar Energy", "Wind Power", "Energy Storage"],
    verified: true
  },
  {
    id: 2,
    name: "Water Conservation Expert",
    issuer: "GreenSkillz Academy", 
    date: "2024-02-28",
    skills: ["Water Management", "Rainwater Harvesting", "Greywater Systems"],
    verified: true
  },
  {
    id: 3,
    name: "Urban Farming Professional",
    issuer: "GreenSkillz Academy",
    date: "2024-01-20",
    skills: ["Vertical Farming", "Hydroponics", "Sustainable Agriculture"],
    verified: false,
    progress: 80
  }
];

export const interests = [
  "Renewable Energy",
  "Climate Policy", 
  "Urban Farming",
  "Water Conservation",
  "Eco-entrepreneurship",
  "Sustainable Transportation",
  "Green Building",
  "Waste Management"
];