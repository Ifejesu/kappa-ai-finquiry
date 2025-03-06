
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <AnimatedTransition type="fade" delay={0.1}>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          KappaAI Finquiry
        </h1>
      </AnimatedTransition>
      
      <AnimatedTransition type="fade" delay={0.3}>
        <p className="text-xl md:text-2xl text-slate-700 max-w-2xl mb-10">
          Your intelligent financial companion powered by RAG technology. 
          Get personalized insights, market analysis, and investment advice.
        </p>
      </AnimatedTransition>
      
      <AnimatedTransition type="fade" delay={0.5}>
        <Button 
          onClick={() => navigate('/auth')} 
          className="text-lg px-8 py-6 h-auto rounded-full bg-blue-600 hover:bg-blue-700"
        >
          Get Started
        </Button>
      </AnimatedTransition>
    </div>
  );
};

export default LandingPage;
