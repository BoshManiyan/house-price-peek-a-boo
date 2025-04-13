
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Users, Calendar, Book, MessageSquare } from "lucide-react";
import { AlumniDirectory } from "@/components/alumni/AlumniDirectory";
import { UpcomingEvents } from "@/components/alumni/UpcomingEvents";
import { AlumniHeader } from "@/components/alumni/AlumniHeader";
import { JobBoard } from "@/components/alumni/JobBoard";
import { AlumniRegistration } from "@/components/alumni/AlumniRegistration";

const Alumni = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <AlumniHeader />
      
      <div className="my-8">
        <div className="relative max-w-md mx-auto mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 pr-4"
            type="text"
            placeholder="Search alumni, events, or jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="directory" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="directory" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Directory</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Register</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="directory">
            <AlumniDirectory searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="events">
            <UpcomingEvents searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="jobs">
            <JobBoard searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="register">
            <AlumniRegistration />
          </TabsContent>
        </Tabs>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Join Our Alumni Network</CardTitle>
          <CardDescription>
            Stay connected with your alma mater and fellow graduates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our alumni network provides valuable opportunities for professional networking,
            mentorship, continuing education, and staying updated with university news and events.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Alumni;
