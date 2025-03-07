
import { toast } from "@/hooks/use-toast";

// Base API URL - would be replaced with actual backend URL in production
const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper for making authenticated requests
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    // ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    toast({
      title: "Request Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    throw error;
  }
};

// Authentication APIs
export const authApi = {
  login: async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    return fetchWithAuth('/login', {
      method: 'POST',
      body: formData.toString(),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  
  register: async (username: string, password: string, first_name: string, last_name: string, image:string="") => {
    return fetchWithAuth('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, first_name, last_name, image })
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  }
};

// Financial data APIs
export const financialApi = {
  getStockNews: async (ticker: string) => {
    return fetchWithAuth(`/stock-advise/news?ticker=${ticker}`);
  },
  
  queryStockAdvice: async (query: string, ticker: string) => {
    return fetchWithAuth('/stock-advise/query', {
      method: 'POST',
      body: JSON.stringify({ query, ticker })
    });
  },
  
  sendRagQuery: async (query: string, context?: {
    ticker?: string,
    timeframe?: string,
    riskTolerance?: 'low' | 'medium' | 'high'
  }) => {
    return fetchWithAuth('/rag/query', {
      method: 'POST',
      body: JSON.stringify({ query, context })
    });
  }
};

// Voice and video APIs
export const mediaApi = {
  createEmbedding: async (audio: Blob, type: 'voice' | 'video') => {
    const formData = new FormData();
    formData.append('file', audio);
    formData.append('type', type);
    
    return fetchWithAuth('/embed', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let the browser set it with the correct boundary
        'Content-Type': undefined as any
      },
      body: formData
    });
  }
};
