
import React from 'react';
import { RefreshCcw, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/utils/dateUtils';

interface DataFreshnessIndicatorProps {
  lastFetched?: Date;
  lastUpdated?: Date; // Add this prop for compatibility
  onRefresh?: () => void;
}

const DataFreshnessIndicator: React.FC<DataFreshnessIndicatorProps> = ({
  lastFetched,
  lastUpdated,
  onRefresh,
}) => {
  // Use lastFetched if provided, otherwise use lastUpdated
  const updateDate = lastFetched || lastUpdated || new Date();
  
  const timeAgo = formatRelativeTime(updateDate);
  const isRecent = ((new Date()).getTime() - updateDate.getTime()) < 6 * 60 * 60 * 1000; // 6 hours
  
  // Calculate expiration (24 hours from last update)
  const expirationDate = new Date(updateDate.getTime() + 24 * 60 * 60 * 1000);
  const expiresIn = formatRelativeTime(expirationDate);
  
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Badge 
        variant="outline" 
        className={`px-2 py-1 flex items-center gap-1 ${
          isRecent ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500"
        }`}
      >
        <Clock size={14} />
        <span>Updated {timeAgo}</span>
      </Badge>
      
      {onRefresh && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRefresh}
              >
                <RefreshCcw size={14} className={onRefresh ? "animate-pulse" : ""} />
                <span className="sr-only">Refresh data</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Refresh financial data</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help underline underline-offset-4 decoration-dotted text-muted-foreground text-xs">
              Data retention policy
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 text-xs">
              <p>Last data scrape: {updateDate.toLocaleString()}</p>
              <p>Data expires {expiresIn}</p>
              <p className="text-muted-foreground">
                Data is refreshed every 6 hours and stored for 24 hours
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DataFreshnessIndicator;
