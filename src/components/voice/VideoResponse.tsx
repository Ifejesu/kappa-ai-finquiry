
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface VideoResponseProps {
  onClose: () => void;
  stockTicker: string;
}

const VideoResponse: React.FC<VideoResponseProps> = ({ onClose, stockTicker }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-4xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Video Analysis for {stockTicker}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading video analysis...</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium">Video analysis for {stockTicker}</p>
                <p className="text-muted-foreground">This is a placeholder for the video response feature.</p>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <p className="text-muted-foreground text-sm">
              Note: This is a demo of the video analysis feature. In a production app, this would display a real financial analysis video.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResponse;
