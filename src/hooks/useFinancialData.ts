
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financialApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import useAAuth from './useAuth';

interface StockInfo {
  ticker: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  lastRefreshed: string;
}

interface StockNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  ticker: string;
}

export const useFinancialData = (ticker: string) => {
  // Fetch stock news
  const {
    data: news,
    isLoading: isNewsLoading,
    error: newsError,
    refetch: refetchNews
  } = useQuery({
    queryKey: ['stockNews', ticker],
    queryFn: () => financialApi.getStockNews(ticker),
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 1
  });
  const {auth} = useAAuth();
  const {username, password} = useMemo(() => auth, [auth]);

  
  // Mock stock price data (in a real application, this would come from an API)
  const getStockInfo = (ticker: string): StockInfo => {
    const mockData: Record<string, StockInfo> = {
      'NVDA': {
        ticker: 'NVDA',
        companyName: 'NVIDIA Corporation',
        price: 875.28,
        change: 12.43,
        changePercent: 1.44,
        lastRefreshed: new Date().toISOString()
      },
      'TSLA': {
        ticker: 'TSLA',
        companyName: 'Tesla, Inc.',
        price: 237.49,
        change: -3.21,
        changePercent: -1.33,
        lastRefreshed: new Date().toISOString()
      },
      'GOOG': {
        ticker: 'GOOG',
        companyName: 'Alphabet Inc.',
        price: 155.72,
        change: 1.28,
        changePercent: 0.83,
        lastRefreshed: new Date().toISOString()
      }
    };
    
    return mockData[ticker] || mockData['NVDA'];
  };
  
  const [stockInfo, setStockInfo] = useState<StockInfo>(getStockInfo(ticker));
  
  // Update stock info when ticker changes
  useEffect(() => {
    setStockInfo(getStockInfo(ticker));
  }, [ticker]);
  
  // Send a query about the stock
  const submitQuery = async (message: string): Promise<string> => {
    if(username && password){
      try {
        const {response}  = await financialApi.queryStockAdvice({username, password, message, stock: ticker});
        return response;
      } catch (error) {
        toast({
          title: 'Query Error',
          description: 'Failed to get financial advice. Please try again.',
          variant: 'destructive'
        });
        throw error;
      }
    }
    
  };

  const getStockChart = async (): Promise<any> => {
    try {
      const response  = await financialApi.getStockChart(ticker);
      return response;
    } catch (error) {
      toast({
        title: 'Query Error',
        description: 'Failed to get financial advice. Please try again.',
        variant: 'destructive'
      });
      throw error;
    }
    
  };
  
  return {
    stockInfo,
    news: news as StockNews[] || [],
    isNewsLoading,
    newsError,
    refetchNews,
    submitQuery,
    getStockChart
  };
};
