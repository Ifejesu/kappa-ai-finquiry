
import { useState } from 'react';
import { financialApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface RagQueryOptions {
  query: string;
  ticker?: string;
  timeframe?: string;
  riskTolerance?: 'low' | 'medium' | 'high';
}

interface RagResponse {
  answer: string;
  sources: Array<{
    title: string;
    url: string;
    relevance: number;
  }>;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export const useVectorStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<RagResponse | null>(null);
  
  const queryRag = async ({ query, ticker, timeframe, riskTolerance }: RagQueryOptions) => {
    setIsLoading(true);
    
    try {
      const response = await financialApi.sendRagQuery(query, {
        ticker,
        timeframe,
        riskTolerance
      });
      
      setLastResponse(response);
      return response;
    } catch (error) {
      toast({
        title: 'Query Failed',
        description: 'Unable to process your financial query. Please try again.',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearResponse = () => {
    setLastResponse(null);
  };
  
  return {
    queryRag,
    clearResponse,
    isLoading,
    lastResponse
  };
};
