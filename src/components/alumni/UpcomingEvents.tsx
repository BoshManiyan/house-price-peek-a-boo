
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Annual Alumni Reunion",
    date: "2025-06-15",
    time: "5:00 PM - 9:00 PM",
    location: "University Main Campus, Grand Hall",
    description: "Join us for the biggest alumni event of the year! Connect with former classmates, enjoy dinner and entertainment, and hear updates from the university president.",
    category: "Networking",
    registrationLink: "#"
  },
  {
    id: 2,
    title: "Career Fair for Recent Graduates",
    date: "2025-05-20",
    time: "10:00 AM - 4:00 PM",
    location: "University Business School",
    description: "Connect with top employers looking to hire university graduates. Bring your resume and be prepared for on-site interviews.",
    category: "Career",
    registrationLink: "#"
  },
  {
    id: 3,
    title: "Homecoming Weekend",
    date: "2025-10-10",
    time: "All Day",
    location: "University Campus",
    description: "A weekend full of activities including the football game, parade, and department open houses. Special events for milestone reunion classes.",
    category: "Social",
    registrationLink: "#"
  },
  {
    id: 4,
    title: "Professional Development Workshop",
    date: "2025-07-12",
    time: "9:00 AM - 12:00 PM",
    location: "Online (Zoom)",
    description: "Learn about the latest trends in your industry and enhance your professional skills with this interactive workshop led by industry experts.",
    category: "Workshop",
    registrationLink: "#"
  },
  {
    id: 5,
    title: "Networking Mixer",
    date: "2025-08-28",
    time: "6:30 PM - 8:30 PM",
    location: "Downtown Conference Center",
    description: "Mix and mingle with fellow alumni in your city. Great opportunity to expand your professional network and make new connections.",
    category: "Networking",
    registrationLink: "#"
  },
  {
    id: 6,
    title: "Alumni Travel Program: European Tour",
    date: "2025-09-15",
    time: "10-day trip",
    location: "Various European Cities",
    description: "Join fellow alumni on this educational journey through Europe's historic cities. Expert guides and special access to cultural sites included.",
    category: "Travel",
    registrationLink: "#"
  }
];

type UpcomingEventsProps = {
  searchQuery: string;
};

export const UpcomingEvents = ({ searchQuery }: UpcomingEventsProps) => {
  const filteredEvents = eventsData.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'networking': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-amber-100 text-amber-800';
      case 'travel': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <Card key={event.id} className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={event.registrationLink}>Register Now</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
