
import React from 'react';
import { ArrowUpRight, ArrowDownRight, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphCard from '@/components/ui-custom/GlassMorphCard';

interface StockCardProps {
  ticker: string;
  companyName: string;
  isSelected?: boolean;
  onClick?: () => void;
  price?: number;
  change?: number;
  changePercent?: number;
}

const StockCard: React.FC<StockCardProps> = ({
  ticker,
  companyName,
  isSelected = false,
  onClick,
  price = 0,
  change = 0,
  changePercent = 0
}) => {
  // Get stock color based on ticker
  const getStockColor = () => {
    switch (ticker) {
      case 'NVDA':
        return 'stock-nvidia';
      case 'TSLA':
        return 'stock-tesla';
      case 'GOOG':
        return 'stock-google';
      default:
        return 'stock-neutral';
    }
  };
  
  // Get price change direction
  const isPriceUp = change >= 0;
  const directionColor = isPriceUp ? 'stock-positive' : 'stock-negative';
  
  // Format numbers for display
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  
  const formattedChange = change.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  
  const formattedPercent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
  
  return (
    <GlassMorphCard
      className={cn(
        "transition-all duration-200",
        isSelected ? "border-2 border-primary" : ""
      )}
      hoverEffect={true}
      intensity={isSelected ? "heavy" : "medium"}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium bg-${getStockColor()} text-white mb-2`}>
              {ticker}
            </span>
            <h3 className="font-medium">{companyName}</h3>
          </div>
          <BarChart2 className="text-muted-foreground" size={16} />
        </div>
        
        {/* Only show price data if it's provided */}
        {price > 0 && (
          <div className="mt-2">
            <div className="text-xl font-bold">{formattedPrice}</div>
            <div className={`flex items-center text-${directionColor} text-sm`}>
              {isPriceUp ? (
                <ArrowUpRight size={14} className="mr-1" />
              ) : (
                <ArrowDownRight size={14} className="mr-1" />
              )}
              <span>{formattedChange}</span>
              <span className="ml-1">({formattedPercent})</span>
            </div>
          </div>
        )}
      </div>
    </GlassMorphCard>
  );
};

export default StockCard;
