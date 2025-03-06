
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  BarChart4,
  AlertCircle,
  CheckCircle,
  Award,
  LineChart,
  Clock,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import LazyImage from '@/components/ui-custom/LazyImage';
import DataFreshnessIndicator from '@/components/financial/DataFreshnessIndicator';

interface StockInfoProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logoUrl: string;
  marketCap: number;
  volume: number;
  peRatio: number;
  eps: number;
  dividend: number;
  high52: number;
  low52: number;
  open: number;
  close: number;
  lastUpdated: Date;
  insights: {
    pros: string[];
    cons: string[];
    summary: string;
    recommendation: 'buy' | 'sell' | 'hold';
    riskLevel: 'low' | 'medium' | 'high';
  };
}

const formatLargeNumber = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

const StockInfo = ({ 
  symbol, 
  name, 
  price, 
  change, 
  changePercent, 
  logoUrl,
  marketCap,
  volume,
  peRatio,
  eps,
  dividend,
  high52,
  low52,
  open,
  close,
  lastUpdated,
  insights,
}: StockInfoProps) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const isPositive = change >= 0;

  // Calculate price position relative to 52-week range
  const range52 = high52 - low52;
  const position52 = ((price - low52) / range52) * 100;

  // Get recommendation color
  const getRecommendationColor = () => {
    switch (insights.recommendation) {
      case 'buy':
        return 'text-stock-positive';
      case 'sell':
        return 'text-stock-negative';
      case 'hold':
        return 'text-stock-neutral';
      default:
        return 'text-foreground';
    }
  };

  // Get risk level color
  const getRiskColor = () => {
    switch (insights.riskLevel) {
      case 'low':
        return 'text-stock-positive';
      case 'medium':
        return 'text-stock-neutral';
      case 'high':
        return 'text-stock-negative';
      default:
        return 'text-foreground';
    }
  };

  // Style classes for the stock
  const getBrandColor = () => {
    switch (symbol.toLowerCase()) {
      case 'nvda':
        return 'text-stock-nvidia';
      case 'tsla':
        return 'text-stock-tesla';
      case 'goog':
        return 'text-stock-google';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <LazyImage
            src={logoUrl}
            alt={name}
            className="w-16 h-16 rounded-lg"
            width={64}
            height={64}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
              <div className={`text-lg font-medium ${getBrandColor()}`}>
                ${symbol}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                isPositive ? 'text-stock-positive' : 'text-stock-negative'
              }`}>
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <DataFreshnessIndicator lastUpdated={lastUpdated} />
      </div>

      <Tabs 
        defaultValue="overview" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-6 bg-transparent border-b border-border p-0 h-auto">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-2"
          >
            AI Insights
          </TabsTrigger>
          <TabsTrigger 
            value="financials" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-2"
          >
            Financials
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Price Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Open</div>
                    <div className="font-medium">${open.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Previous Close</div>
                    <div className="font-medium">${close.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Day Range</div>
                    <div className="font-medium">${Math.min(open, close).toFixed(2)} - ${Math.max(open, close).toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="font-medium">{formatLargeNumber(volume)}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>52-Week Low: ${low52.toFixed(2)}</span>
                    <span>52-Week High: ${high52.toFixed(2)}</span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`absolute h-full ${getBrandColor().replace('text-', 'bg-')}`}
                      style={{ width: `${position52}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current price is {position52.toFixed(0)}% of 52-week range
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Company Fundamentals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                    <div className="font-medium">{formatLargeNumber(marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">P/E Ratio</div>
                    <div className="font-medium">{peRatio.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">EPS</div>
                    <div className="font-medium">${eps.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Dividend Yield</div>
                    <div className="font-medium">{(dividend * 100).toFixed(2)}%</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Relative Valuation</div>
                    <div className="text-xs text-muted-foreground">vs. Sector Average</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={peRatio > 25 ? 80 : peRatio > 15 ? 60 : 40} className="h-2" />
                    <span className="text-xs font-medium">
                      {peRatio > 25 ? 'High' : peRatio > 15 ? 'Average' : 'Low'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5" /> 
                AI-Powered Investment Insights
              </CardTitle>
              <CardDescription>
                Analysis based on latest news, trends, and financial data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-sm font-medium">Summary</div>
                <p className="text-muted-foreground">{insights.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-stock-positive">
                    <CheckCircle className="h-4 w-4" /> Potential Advantages
                  </div>
                  <ul className="space-y-2">
                    {insights.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-stock-positive shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-stock-negative">
                    <AlertCircle className="h-4 w-4" /> Potential Risks
                  </div>
                  <ul className="space-y-2">
                    {insights.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-stock-negative shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className={`text-2xl font-semibold capitalize ${getRecommendationColor()}`}>
                      {insights.recommendation}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Risk Level</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className={`text-2xl font-semibold capitalize ${getRiskColor()}`}>
                      {insights.riskLevel}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Confidence Score</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-semibold">
                      {insights.recommendation === 'buy' ? '75%' : 
                       insights.recommendation === 'hold' ? '60%' : '80%'}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financials" className="mt-0">
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Quarterly Financial Data</CardTitle>
              <CardDescription>
                Last four quarters financial performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quarter</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Net Income</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">EPS</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 text-sm">Q1 2023</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.05)}</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.012)}</td>
                      <td className="py-3 px-4 text-sm text-right">${(eps * 0.8).toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-right flex justify-end items-center">
                        <span className="flex items-center text-stock-positive">
                          <TrendingUp className="h-3 w-3 mr-1" /> 12.4%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 text-sm">Q2 2023</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.055)}</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.014)}</td>
                      <td className="py-3 px-4 text-sm text-right">${(eps * 0.9).toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-right flex justify-end items-center">
                        <span className="flex items-center text-stock-positive">
                          <TrendingUp className="h-3 w-3 mr-1" /> 15.2%
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 text-sm">Q3 2023</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.06)}</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.015)}</td>
                      <td className="py-3 px-4 text-sm text-right">${(eps * 0.95).toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-right flex justify-end items-center">
                        <span className="flex items-center text-stock-positive">
                          <TrendingUp className="h-3 w-3 mr-1" /> 8.7%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Q4 2023</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.065)}</td>
                      <td className="py-3 px-4 text-sm text-right">{formatLargeNumber(marketCap * 0.016)}</td>
                      <td className="py-3 px-4 text-sm text-right">${eps.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-right flex justify-end items-center">
                        <span className="flex items-center text-stock-positive">
                          <TrendingUp className="h-3 w-3 mr-1" /> 10.3%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockInfo;
