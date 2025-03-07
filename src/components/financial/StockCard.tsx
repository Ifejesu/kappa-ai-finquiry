
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, BarChart2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphCard from '@/components/ui-custom/GlassMorphCard';
import { useFinancialData } from '@/hooks/useFinancialData';
import { PriceDataItem } from '@/services/api';

interface StockCardProps {
  ticker: string;
  companyName: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({
  ticker,
  companyName,
  isSelected = false,
  onClick
}) => {
  const {getStockChart, getStockPrice} = useFinancialData(ticker);
  const [stockPrice, setStockPrice] = useState<PriceDataItem[]>(null);
  const [stockChart, setStockChart] = useState(null);
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
  
  const memoizedStockData = useMemo(() => {
    // Get the first stock item (if available)
    const stock = stockPrice && stockPrice.length > 0 ? stockPrice[0] : null;
    if (!stock) {
      return {
        isPriceUp: false,
        directionColor: "",
        formattedChange: "",
        formattedPercent: "",
        formattedPrice: "",
      };
    }

    const change = stock["Market Change"];
    // Remove the "%" from the string and parse it as a number
    const changePercent = parseFloat(stock["Change Percent"].replace("%", ""));
    const isPriceUp = change >= 0;
    const directionColor = isPriceUp ? "stock-positive" : "stock-negative";

    const formattedChange = change.toLocaleString("en-US", {
      style: "currency",
      currency: stock.Currency,
      minimumFractionDigits: 2,
    });

    const formattedPercent = `${isPriceUp ? "+" : ""}${changePercent.toFixed(2)}%`;

    const formattedPrice = stock["Market Price"].toLocaleString("en-US", {
      style: "currency",
      currency: stock.Currency,
      minimumFractionDigits: 2,
    });

    return {
      isPriceUp,
      directionColor,
      formattedChange,
      formattedPercent,
      formattedPrice,
    };
  }, [stockPrice]);

  useEffect(() => {
    setStockChart(null);
    getStockChart().then(setStockChart).catch(console.error);
    getStockPrice().then(setStockPrice).catch(console.error);

  }
  , [isSelected]);
  
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
        {
            isSelected && stockChart && (
              <img
                src={stockChart}
                alt="Stock Chart"
                className="w-full max-w-xl rounded shadow-md mt-2"
              />
            )
          }
        
        {/* Only show price data if it's provided */}
        {memoizedStockData.formattedPrice && (
          <div className="mt-2">
            <div className="text-xl font-bold">{memoizedStockData.formattedPrice}</div>
            <div className={`flex items-center text-${memoizedStockData.directionColor} text-sm`}>
              {memoizedStockData.isPriceUp ? (
                <ArrowUpRight size={14} className="mr-1" />
              ) : (
                <ArrowDownRight size={14} className="mr-1" />
              )}
              <span>{memoizedStockData.formattedChange}</span>
              <span className="ml-1">({memoizedStockData.formattedPercent})</span>
            </div>
          </div>
        )}
      </div>
    </GlassMorphCard>
  );
};

export default StockCard;
