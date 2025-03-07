
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockCard from "@/components/financial/StockCard";
import QueryForm from "@/components/financial/QueryForm";
import NewsCard from "@/components/financial/NewsCard";
import DataFreshnessIndicator from "@/components/financial/DataFreshnessIndicator";
import { VoiceInteraction } from "@/components/voice/VoiceInteraction";
import VideoResponse from "@/components/voice/VideoResponse";
import { supabase } from "@/integrations/supabase/client";
import useAAuth from '@/hooks/useAuth';

// Mock data for initial rendering
const stockOptions = [
  { id: "NVDA", name: "NVIDIA", color: "stock-nvidia" },
  { id: "TSLA", name: "Tesla", color: "stock-tesla" },
  { id: "GOOG", name: "Alphabet", color: "stock-google" }
];

const mockNews = [
  {
    id: "1",
    title: "NVIDIA Announces New AI Chips",
    summary: "NVIDIA unveils next-generation AI processors with 50% performance improvement",
    source: "TechNews",
    url: "https://example.com/news/1",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    ticker: "NVDA"
  },
  {
    id: "2",
    title: "Tesla Exceeds Delivery Expectations",
    summary: "Tesla delivered 250,000 vehicles in Q1, exceeding analyst expectations by 15%",
    source: "AutoInsider",
    url: "https://example.com/news/2",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    ticker: "TSLA"
  },
  {
    id: "3",
    title: "Google Cloud Revenue Grows 30%",
    summary: "Alphabet reports strong growth in cloud division, driving stock up 5% in after-hours trading",
    source: "MarketWatch",
    url: "https://example.com/news/3",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    ticker: "GOOG"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(stockOptions[0].id);
  const [lastFetched, setLastFetched] = useState(new Date());
  const [showVoiceInteraction, setShowVoiceInteraction] = useState(false);
  const [showVideoResponse, setShowVideoResponse] = useState(false);
  const {auth, logout} = useAAuth();
  

  useEffect(() => {
      if(!auth?.id){
        navigate('/auth');
      }
    }, [navigate,auth]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">KappaAI Finquiry</h1>
            <p className="text-muted-foreground">
              Financial insights powered by RAG technology
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground hidden md:block">
              {auth?.username?.toUpperCase()}
            </p>
            <Button variant="outline" onClick={logout}>Sign Out</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="query" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="query">Ask Financial Questions</TabsTrigger>
                    <TabsTrigger value="news">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="query" className="space-y-4">
                    <QueryForm 
                      selectedStock={selectedStock} 
                      onSelectStock={setSelectedStock}
                      stockOptions={stockOptions}
                    />
                    <div className="flex justify-between items-center">
                      <DataFreshnessIndicator lastFetched={lastFetched} />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowVoiceInteraction(true)}
                          className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                          Ask with Voice
                        </button>
                        <button 
                          onClick={() => setShowVideoResponse(true)}
                          className="text-sm bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
                        >
                          Video Response
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="news">
                    <div className="space-y-4">
                      {mockNews.map(news => (
                        <NewsCard key={news.id} news={news} />
                      ))}
                      <DataFreshnessIndicator lastFetched={lastFetched} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {stockOptions.map(stock => (
                <StockCard 
                  key={stock.id}
                  ticker={stock.id}
                  companyName={stock.name}
                  isSelected={selectedStock === stock.id}
                  onClick={() => setSelectedStock(stock.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal components */}
      {showVoiceInteraction && (
        <VoiceInteraction 
          onClose={() => setShowVoiceInteraction(false)}
          stockOptions={stockOptions}
          onTranscript={() => {}}
          onStop={() => {}}
        />
      )}
      
      {showVideoResponse && (
        <VideoResponse
          onClose={() => setShowVideoResponse(false)}
          stockTicker={selectedStock}
        />
      )}
    </div>
  );
};

export default Dashboard;
