
import { useState } from 'react';
import { ExternalLink, ThumbsUp, ThumbsDown, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassMorphCard from '@/components/ui-custom/GlassMorphCard';
import LazyImage from '@/components/ui-custom/LazyImage';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';
import { formatRelativeTime } from '@/utils/dateUtils';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string | Date;
  ticker: string;
  author?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
}

interface NewsCardProps {
  news?: NewsItem;
  title?: string;
  source?: string;
  url?: string;
  publishedAt?: Date;
  imageUrl?: string;
  summary?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  stockSymbols?: string[];
  author?: string;
  delay?: number;
}

const NewsCard = ({
  news,
  title: propTitle,
  source: propSource,
  url: propUrl,
  publishedAt: propPublishedAt,
  imageUrl: propImageUrl,
  summary: propSummary,
  sentiment: propSentiment = 'neutral',
  stockSymbols: propStockSymbols = [],
  author: propAuthor,
  delay = 0,
}: NewsCardProps) => {
  // Use props directly or from news object if provided
  const title = news?.title || propTitle || '';
  const source = news?.source || propSource || '';
  const url = news?.url || propUrl || '#';
  const publishedAt = news?.publishedAt 
    ? new Date(news.publishedAt) 
    : propPublishedAt || new Date();
  const imageUrl = news?.imageUrl || propImageUrl;
  const summary = news?.summary || propSummary || '';
  const sentiment = news?.sentiment || propSentiment;
  const stockSymbols = propStockSymbols.length > 0 
    ? propStockSymbols 
    : news?.ticker ? [news.ticker] : [];
  const author = news?.author || propAuthor;
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getSentimentClass = () => {
    switch (sentiment) {
      case 'positive':
        return 'bg-stock-positive/10 text-stock-positive border-stock-positive/30';
      case 'negative':
        return 'bg-stock-negative/10 text-stock-negative border-stock-negative/30';
      case 'neutral':
      default:
        return 'bg-stock-neutral/10 text-stock-neutral border-stock-neutral/30';
    }
  };
  
  const getSentimentIcon = () => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-3 w-3" />;
      case 'negative':
        return <ThumbsDown className="h-3 w-3" />;
      case 'neutral':
      default:
        return null;
    }
  };

  return (
    <AnimatedTransition type="fade" delay={delay * 0.1}>
      <GlassMorphCard className="overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          {imageUrl && (
            <LazyImage
              src={imageUrl}
              alt={title}
              className="w-full md:w-1/3 h-48 md:h-auto rounded-md object-cover"
            />
          )}
          
          <div className={`flex-1 ${!imageUrl ? 'w-full' : ''}`}>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {stockSymbols.map((symbol) => (
                <Badge key={symbol} variant="outline" className="text-xs">
                  ${symbol}
                </Badge>
              ))}
              <Badge className={`text-xs flex items-center gap-1 ${getSentimentClass()}`}>
                {getSentimentIcon()}
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
            
            <div className="flex items-center text-xs text-muted-foreground mb-3 gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatRelativeTime(publishedAt)}
              </span>
              <span>{source}</span>
              {author && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {author}
                </span>
              )}
            </div>
            
            <p className={`text-sm text-muted-foreground mb-3 ${isExpanded ? '' : 'line-clamp-3'}`}>
              {summary}
            </p>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-0 h-auto hover:bg-transparent hover:underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </Button>
              
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex items-center gap-1"
                >
                  Read Full Article
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </GlassMorphCard>
    </AnimatedTransition>
  );
};

export default NewsCard;
