
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail, Linkedin, MapPin, Phone } from "lucide-react";

// Sample alumni data
const alumniData = [
  {
    id: 1,
    name: "Jane Smith",
    gradYear: 2018,
    degree: "B.Sc. Computer Science",
    company: "Tech Innovations Inc.",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    profileImage: "https://picsum.photos/id/1027/200",
    bio: "Passionate about creating innovative software solutions and mentoring junior developers."
  },
  {
    id: 2,
    name: "John Davis",
    gradYear: 2015,
    degree: "MBA",
    company: "Global Finance Partners",
    title: "Investment Analyst",
    location: "New York, NY",
    email: "john.davis@example.com",
    phone: "(555) 987-6543",
    profileImage: "https://picsum.photos/id/1025/200",
    bio: "Specializing in market analysis and financial forecasting with a focus on emerging markets."
  },
  {
    id: 3,
    name: "Priya Patel",
    gradYear: 2019,
    degree: "M.Sc. Data Science",
    company: "DataMind Analytics",
    title: "Lead Data Scientist",
    location: "Boston, MA",
    email: "priya.patel@example.com",
    phone: "(555) 456-7890",
    profileImage: "https://picsum.photos/id/1005/200",
    bio: "Working on machine learning algorithms to solve complex business problems."
  },
  {
    id: 4,
    name: "Michael Chen",
    gradYear: 2017,
    degree: "B.Eng. Electrical Engineering",
    company: "Future Energy Solutions",
    title: "Project Manager",
    location: "Austin, TX",
    email: "michael.chen@example.com",
    phone: "(555) 789-0123",
    profileImage: "https://picsum.photos/id/1012/200",
    bio: "Leading renewable energy projects with a focus on sustainability and innovation."
  },
  {
    id: 5,
    name: "Sophia Rodriguez",
    gradYear: 2020,
    degree: "Ph.D. Biotechnology",
    company: "LifeScience Research",
    title: "Research Scientist",
    location: "San Diego, CA",
    email: "sophia.rodriguez@example.com",
    phone: "(555) 234-5678",
    profileImage: "https://picsum.photos/id/1000/200",
    bio: "Researching novel therapeutic approaches for autoimmune diseases."
  },
  {
    id: 6,
    name: "David Wilson",
    gradYear: 2016,
    degree: "B.A. Marketing",
    company: "CreativeEdge Marketing",
    title: "Marketing Director",
    location: "Chicago, IL",
    email: "david.wilson@example.com",
    phone: "(555) 345-6789",
    profileImage: "https://picsum.photos/id/1074/200",
    bio: "Developing innovative marketing strategies for Fortune 500 companies."
  }
];

type AlumniDirectoryProps = {
  searchQuery: string;
};

export const AlumniDirectory = ({ searchQuery }: AlumniDirectoryProps) => {
  const filteredAlumni = alumniData.filter(alumni => 
    alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.degree.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Alumni Directory</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alumni => (
          <Card key={alumni.id} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <img 
                      src={alumni.profileImage} 
                      alt={alumni.name} 
                    />
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{alumni.name}</CardTitle>
                    <CardDescription>Class of {alumni.gradYear}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{alumni.title}</p>
                <p className="text-muted-foreground">{alumni.company}</p>
                <p className="text-sm flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {alumni.location}
                </p>
                <p className="text-sm">{alumni.degree}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm">Contact Info</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">{alumni.name}</h4>
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {alumni.email}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {alumni.phone}
                    </p>
                    <p className="text-sm">{alumni.bio}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Button size="sm" variant="ghost">
                <Linkedin className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No alumni found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
