
import React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export const AlumniHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">University Alumni Association</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Connecting generations of graduates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Sign In</Button>
          <Button>Join Now</Button>
        </div>
      </div>
      
      <NavigationMenu className="max-w-full w-full justify-start overflow-auto">
        <NavigationMenuList className="flex-wrap space-x-1">
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Benefits
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Chapters
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Mentorship
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Donations
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
