
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Info, Sparkles, X, Search, ExternalLink, FileText } from "lucide-react";
import AnalysisResult from "@/components/AnalysisResult";
import HistoryItem from "@/components/HistoryItem";
import { analyzeContent } from "@/lib/analyzer";
import { AnalysisResult as AnalysisResultType } from "@/types/analysis";

const Index = () => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [history, setHistory] = useState<AnalysisResultType[]>([]);
  const { toast } = useToast();

  const handleUrlAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a URL to analyze"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // In a real app, you would fetch the content from the URL
      // For this demo, we'll simulate analysis using our analyzer
      const result = await analyzeContent({ type: "url", content: url });
      setAnalysisResult(result);
      setHistory(prev => [result, ...prev]);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed the content for reliability."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "We couldn't analyze this URL. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter text to analyze"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeContent({ type: "text", content: text });
      setAnalysisResult(result);
      setHistory(prev => [result, ...prev]);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed the content for reliability."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "We couldn't analyze this text. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysisResult(null);
    setUrl("");
    setText("");
  };

  const viewHistoryItem = (item: AnalysisResultType) => {
    setAnalysisResult(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-3">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Truth Seeker</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real-time fake news detection powered by advanced analysis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Analyze Content
                </CardTitle>
                <CardDescription>
                  Enter a URL or paste text to analyze its reliability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Text
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <form onSubmit={handleUrlAnalysis} className="space-y-4">
                      <Input
                        placeholder="Enter news article URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="transition-all focus-within:ring-2 ring-primary/50"
                      />
                      <Button 
                        type="submit" 
                        className="w-full transition-all hover:shadow-md" 
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze URL"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="text">
                    <form onSubmit={handleTextAnalysis} className="space-y-4">
                      <Textarea
                        placeholder="Paste news content here"
                        rows={6}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="transition-all focus-within:ring-2 ring-primary/50"
                      />
                      <Button 
                        type="submit" 
                        className="w-full transition-all hover:shadow-md" 
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Text"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {analysisResult && (
              <Card className="mt-8 shadow-lg border-t-4 border-t-primary transform transition-all duration-300 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Analysis Results
                    </CardTitle>
                    <CardDescription>
                      Our assessment of the content's reliability
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={clearAnalysis}
                    aria-label="Clear analysis"
                    className="rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <AnalysisResult result={analysisResult} />
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground bg-muted/30 rounded-b-lg">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      Analysis performed using our proprietary algorithm. Results should be used as a guide only.
                    </span>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>

          <div>
            <Card className="shadow-lg border-t-4 border-t-primary h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Analysis History
                </CardTitle>
                <CardDescription>
                  Previous content you've analyzed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {history.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8 bg-muted/20 rounded-lg border border-dashed border-muted">
                      <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                      <p>No analysis history yet</p>
                      <p className="text-sm mt-2">
                        Analyzed content will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {history.map((item, index) => (
                        <HistoryItem 
                          key={index} 
                          item={item} 
                          onClick={() => viewHistoryItem(item)} 
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>© 2025 Truth Seeker - Helping you navigate the sea of information</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
