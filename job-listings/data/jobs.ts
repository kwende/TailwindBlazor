export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  description: string
  requirements: string[]
  responsibilities: string[]
  postedDate: string
  salary?: string
  tags: string[]
}

export const jobListings: Job[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a Software Engineer to join our team and help build our next-generation products.",
    requirements: [
      "3+ years of experience in software development",
      "Proficiency in JavaScript/TypeScript and React",
      "Experience with Node.js and RESTful APIs",
      "Understanding of CI/CD pipelines",
      "Bachelor's degree in Computer Science or equivalent experience",
    ],
    responsibilities: [
      "Develop and maintain web applications using React and TypeScript",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and mentor junior developers",
      "Troubleshoot and fix bugs in existing applications",
    ],
    postedDate: "2 weeks ago",
    salary: "$120,000 - $150,000",
    tags: ["React", "TypeScript", "Node.js", "API", "Frontend"],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our design team to create beautiful, intuitive interfaces that delight our users.",
    requirements: [
      "4+ years of experience in product design",
      "Strong portfolio demonstrating UX/UI design skills",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Experience with design systems",
      "Excellent communication and collaboration skills",
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with engineers to implement designs",
      "Maintain and evolve our design system",
      "Advocate for user-centered design throughout the organization",
    ],
    postedDate: "1 week ago",
    salary: "$110,000 - $140,000",
    tags: ["UI/UX", "Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    description: "Help us turn data into insights and build machine learning models to power our products.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "3+ years of experience in data science or machine learning",
      "Proficiency in Python and data analysis libraries",
      "Experience with machine learning frameworks like TensorFlow or PyTorch",
      "Strong statistical and mathematical background",
    ],
    responsibilities: [
      "Develop and implement machine learning models",
      "Analyze large datasets to extract insights",
      "Collaborate with product and engineering teams",
      "Create data visualizations and reports",
      "Stay up-to-date with the latest research and techniques",
    ],
    postedDate: "3 days ago",
    salary: "$130,000 - $160,000",
    tags: ["Python", "Machine Learning", "Data Analysis", "Statistics", "AI"],
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Chicago, IL",
    type: "Full-time",
    description: "Drive our marketing strategy and help us reach new customers.",
    requirements: [
      "5+ years of experience in marketing",
      "Experience with digital marketing channels",
      "Strong analytical skills",
      "Excellent written and verbal communication",
      "Bachelor's degree in Marketing or related field",
    ],
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Manage social media presence",
      "Analyze marketing metrics and optimize campaigns",
      "Collaborate with sales and product teams",
      "Manage marketing budget",
    ],
    postedDate: "1 month ago",
    salary: "$90,000 - $120,000",
    tags: ["Digital Marketing", "Social Media", "Analytics", "Content Strategy", "SEO"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "3+ years of experience in DevOps or SRE roles",
      "Experience with AWS, Azure, or GCP",
      "Knowledge of containerization and orchestration tools",
      "Proficiency in scripting languages like Python or Bash",
      "Understanding of CI/CD principles",
    ],
    responsibilities: [
      "Design and implement cloud infrastructure",
      "Automate deployment processes",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices",
      "Collaborate with development teams to improve infrastructure",
    ],
    postedDate: "2 weeks ago",
    salary: "$120,000 - $150,000",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure"],
  },
  {
    id: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Ensure our customers are successful and getting the most value from our products.",
    requirements: [
      "3+ years of experience in customer success or account management",
      "Strong communication and relationship-building skills",
      "Problem-solving abilities",
      "Experience with CRM software",
      "Bachelor's degree or equivalent experience",
    ],
    responsibilities: [
      "Onboard new customers and ensure successful adoption",
      "Serve as the primary point of contact for assigned customers",
      "Identify upsell opportunities",
      "Collect and share customer feedback with product teams",
      "Monitor customer health metrics",
    ],
    postedDate: "3 weeks ago",
    salary: "$80,000 - $100,000",
    tags: ["Customer Success", "Account Management", "CRM", "Customer Onboarding", "Relationship Building"],
  },
]

export function getSimilarJobs(jobId: string, limit = 3): Job[] {
  const currentJob = jobListings.find((job) => job.id === jobId)

  if (!currentJob) {
    return []
  }

  // Find jobs with similar tags or in the same department
  return jobListings
    .filter((job) => job.id !== jobId) // Exclude current job
    .map((job) => {
      // Calculate similarity score based on matching tags and department
      const matchingTags = job.tags.filter((tag) => currentJob.tags.includes(tag)).length
      const departmentMatch = job.department === currentJob.department ? 1 : 0

      return {
        ...job,
        similarityScore: matchingTags + departmentMatch * 2, // Weight department match higher
      }
    })
    .sort((a, b) => (b as any).similarityScore - (a as any).similarityScore)
    .slice(0, limit)
}

