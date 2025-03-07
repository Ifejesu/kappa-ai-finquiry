
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart4 } from "lucide-react";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-background border-b border-border/40">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BarChart4 className="h-6 w-6 text-primary" />
        <span className="font-display text-lg font-semibold tracking-tight">
          KappaAI Finquiry
        </span>
      </div>

      {/* Right side */}
      <div>
        <Button 
          onClick={() => navigate('/auth')} 
          className="rounded-full bg-blue-600 hover:bg-blue-700"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default LandingNavbar;
