
import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff } from 'lucide-react';

interface VoiceInteractionProps {
  onClose?: () => void;
  onTranscript?: (transcript: string) => void;
  onStop?: () => void;
  stockOptions?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: (event: Event) => void;
}

// Define SpeechRecognition constructor
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const VoiceInteraction: React.FC<VoiceInteractionProps> = ({ 
  onClose, 
  onTranscript, 
  onStop,
  stockOptions = [] 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setTranscript(currentTranscript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (onStop) onStop();
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
        if (onStop) onStop();
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onStop]);
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      if (onStop) onStop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };
  
  const handleSubmit = async () => {
    if (!transcript.trim()) return;
    
    if (onTranscript) {
      onTranscript(transcript);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call - in a real app, this would call your RAG backend
      setTimeout(() => {
        const mockResponse = `Based on the latest market analysis, ${
          stockOptions.find(stock => 
            transcript.toLowerCase().includes(stock.id.toLowerCase()) || 
            transcript.toLowerCase().includes(stock.name.toLowerCase())
          )?.name || 'the stock you mentioned'
        } shows promising indicators. Recent news suggests positive market sentiment, but always consider your investment goals before making decisions.`;
        
        setResponse(mockResponse);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error getting response:', error);
      setResponse('Sorry, I encountered an error processing your request.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Voice Interaction</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg min-h-[100px] relative">
            {transcript ? (
              <p>{transcript}</p>
            ) : (
              <p className="text-muted-foreground">
                {isListening ? "Listening..." : "Press the microphone button to start speaking"}
              </p>
            )}
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={toggleListening}
              className={`rounded-full p-4 ${
                isListening 
                  ? 'bg-destructive text-destructive-foreground' 
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!transcript.trim() || isLoading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Get Financial Advice"}
          </button>
          
          {response && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">Financial Analysis:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
