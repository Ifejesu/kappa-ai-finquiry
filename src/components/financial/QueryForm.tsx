
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Define the form schema
const formSchema = z.object({
  stock: z.string().min(1, { message: "Please select a stock" }),
  prompt: z.string().min(5, { message: "Query must be at least 5 characters" })
});

type FormValues = z.infer<typeof formSchema>;

interface QueryFormProps {
  selectedStock: string;
  onSelectStock: (stock: string) => void;
  stockOptions: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

const QueryForm: React.FC<QueryFormProps> = ({ 
  selectedStock, 
  onSelectStock,
  stockOptions 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: selectedStock,
      prompt: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on selected stock
      const stockInfo = stockOptions.find(stock => stock.id === data.stock);
      
      setResponse(
        `Based on the latest market analysis, ${stockInfo?.name || "the selected stock"} 
        shows promising indicators. Your query about "${data.prompt}" reveals that 
        market sentiment remains positive, with technical indicators suggesting potential 
        short-term growth. However, consider macroeconomic factors that could impact 
        the broader market before making investment decisions.`
      );
      
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Sorry, we encountered an error processing your request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Stock</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    onSelectStock(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a stock" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stockOptions.map(stock => (
                      <SelectItem key={stock.id} value={stock.id}>
                        {stock.name} ({stock.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Financial Question</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Example: What is the growth potential of this stock based on recent earnings?"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing..." : "Get Financial Insights"}
          </Button>
        </form>
      </Form>
      
      {response && (
        <div className="bg-secondary/30 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Financial Analysis:</h3>
          <p className="text-sm">{response}</p>
        </div>
      )}
    </div>
  );
};

export default QueryForm;
