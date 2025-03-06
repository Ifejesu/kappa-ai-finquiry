
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  blurEffect?: boolean;
}

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = 'bg-muted',
  blurEffect = true,
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div 
      className={cn("overflow-hidden relative", className)}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0", 
            placeholderColor,
            "animate-pulse"
          )}
        />
      )}
      
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoading && "opacity-0",
            !isLoading && "opacity-100",
            blurEffect && isLoading && "blur-md",
            blurEffect && !isLoading && "blur-0"
          )}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default LazyImage;
