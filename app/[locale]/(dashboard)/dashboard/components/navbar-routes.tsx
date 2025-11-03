"use client";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";

const NavBarRoutes = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex gap-x-2 ml-auto items-center z-[100] bg-background">
       <Button 
        variant="ghost"
        size="icon" 
        onClick={handleThemeToggle}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-yellow-600" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      <UserButton/>
    </div>
  );
};

export default NavBarRoutes;