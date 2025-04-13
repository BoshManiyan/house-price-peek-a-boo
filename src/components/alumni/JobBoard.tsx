
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, Clock, MapPin, DollarSign } from "lucide-react";

// Sample jobs data
const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp International",
    location: "San Francisco, CA (Remote Available)",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedDate: "2025-04-01",
    description: "We're looking for a talented Software Engineer to join our team. You'll work on cutting-edge projects using the latest technologies.",
    requirements: "5+ years of experience with JavaScript, React, and Node.js. Bachelor's degree in Computer Science or related field.",
    contactEmail: "careers@techcorp.com",
    applicationLink: "#",
    postedBy: "Sarah Johnson, CTO (Alumni 2010)"
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brands Inc.",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    postedDate: "2025-04-05",
    description: "Join our marketing team to develop and implement marketing strategies for our consumer products division.",
    requirements: "3+ years of marketing experience. Strong analytical skills and experience with digital marketing platforms.",
    contactEmail: "jobs@globalbrands.com",
    applicationLink: "#",
    postedBy: "Michael Smith, VP Marketing (Alumni 2008)"
  },
  {
    id: 3,
    title: "Research Assistant",
    company: "University Research Department",
    location: "Campus",
    type: "Part-time",
    salary: "$25 - $30/hour",
    postedDate: "2025-04-10",
    description: "Assist professors with ongoing research projects in the field of environmental science.",
    requirements: "Currently enrolled graduate students. Background in environmental science preferred.",
    contactEmail: "research@university.edu",
    applicationLink: "#",
    postedBy: "Dr. Emily Chen, Professor (Faculty)"
  },
  {
    id: 4,
    title: "Financial Analyst",
    company: "Investment Partners LLC",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $100,000",
    postedDate: "2025-04-08",
    description: "Analyze financial data and market trends to support investment decisions for our clients.",
    requirements: "Bachelor's degree in Finance or Accounting. 2+ years of experience in financial analysis.",
    contactEmail: "careers@investmentpartners.com",
    applicationLink: "#",
    postedBy: "David Wilson, Managing Director (Alumni 2005)"
  },
  {
    id: 5,
    title: "Product Manager Intern",
    company: "StartUp Innovators",
    location: "Austin, TX (Hybrid)",
    type: "Internship",
    salary: "$25/hour",
    postedDate: "2025-04-12",
    description: "Summer internship opportunity to learn product management in a fast-paced startup environment.",
    requirements: "Current students or recent graduates with interest in product management. Strong communication skills.",
    contactEmail: "internships@startupinnovators.com",
    applicationLink: "#",
    postedBy: "Jessica Lee, Founder (Alumni 2015)"
  }
];

type JobBoardProps = {
  searchQuery: string;
};

export const JobBoard = ({ searchQuery }: JobBoardProps) => {
  const filteredJobs = jobsData.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getJobTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Job Board</h2>
        <Button>Post a Job</Button>
      </div>
      
      <div className="space-y-6">
        {filteredJobs.map(job => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Building className="h-4 w-4" /> {job.company}
                  </CardDescription>
                </div>
                <Badge className={getJobTypeColor(job.type)}>
                  {job.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{job.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.requirements}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Posted {getDaysAgo(job.postedDate)} days ago</span>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-medium">Posted by:</p>
                <p>{job.postedBy}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <Button variant="outline" className="w-full sm:w-auto">
                Contact: {job.contactEmail}
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <a href={job.applicationLink}>Apply Now</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No jobs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
