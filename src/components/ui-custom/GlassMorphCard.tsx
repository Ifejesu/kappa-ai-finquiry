
import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GlassMorphCardProps {
  children: ReactNode;
  className?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  hoverEffect?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
  onClick?: () => void;
}

const GlassMorphCard = ({
  children,
  className,
  headerContent,
  footerContent,
  hoverEffect = true,
  intensity = 'medium',
  onClick,
}: GlassMorphCardProps) => {
  // Configure glassmorphism intensity
  const getGlassClasses = () => {
    const baseClasses = "border border-white/10 shadow-sm backdrop-blur-md transition-all duration-300";
    
    switch (intensity) {
      case 'light':
        return cn(baseClasses, "bg-white/5 dark:bg-black/5");
      case 'heavy':
        return cn(baseClasses, "bg-white/20 dark:bg-black/20");
      case 'medium':
      default:
        return cn(baseClasses, "bg-white/10 dark:bg-black/10");
    }
  };

  const hoverClasses = hoverEffect ? "hover:shadow-lg hover:border-white/20 hover:translate-y-[-2px]" : "";

  return (
    <Card 
      className={cn(getGlassClasses(), hoverClasses, className)}
      onClick={onClick}
    >
      {headerContent && <CardHeader>{headerContent}</CardHeader>}
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  );
};

export default GlassMorphCard;
