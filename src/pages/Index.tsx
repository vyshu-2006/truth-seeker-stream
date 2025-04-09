
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Info, Sparkles, X, Search, ExternalLink, FileText, Clock } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-14 w-14 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 drop-shadow-sm">
            Truth Seeker
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Real-time fake news detection powered by advanced analysis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border-t-4 border-t-primary overflow-hidden transition-all duration-300 hover:shadow-xl">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Search className="h-5 w-5 text-primary" />
                  Analyze Content
                </CardTitle>
                <CardDescription>
                  Enter a URL or paste text to analyze its reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg">
                    <TabsTrigger value="url" className="flex items-center gap-2 rounded-l-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <ExternalLink className="h-4 w-4" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2 rounded-r-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
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
                        className="transition-all focus-within:ring-2 ring-primary/50 shadow-sm"
                      />
                      <Button 
                        type="submit" 
                        className="w-full transition-all hover:shadow-md relative overflow-hidden group"
                        disabled={isAnalyzing}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                        {isAnalyzing ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> 
                            Analyzing...
                          </span>
                        ) : "Analyze URL"}
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
                        className="transition-all focus-within:ring-2 ring-primary/50 shadow-sm resize-none"
                      />
                      <Button 
                        type="submit" 
                        className="w-full transition-all hover:shadow-md relative overflow-hidden group"
                        disabled={isAnalyzing}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                        {isAnalyzing ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> 
                            Analyzing...
                          </span>
                        ) : "Analyze Text"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {analysisResult && (
              <Card className="shadow-lg border-t-4 border-t-primary transform transition-all duration-300 hover:shadow-xl animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between bg-muted/30 backdrop-blur-sm">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
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
                <CardContent className="pt-6">
                  <AnalysisResult result={analysisResult} />
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground bg-muted/30 rounded-b-lg p-4 flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span>
                    Analysis performed using our proprietary algorithm. Results should be used as a guide only.
                  </span>
                </CardFooter>
              </Card>
            )}
          </div>

          <div>
            <Card className="shadow-lg border-t-4 border-t-primary h-full transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="h-5 w-5 text-primary" />
                  Analysis History
                </CardTitle>
                <CardDescription>
                  Previous content you've analyzed
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-[540px] pr-4">
                  {history.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12 px-4 bg-muted/10 rounded-lg border border-dashed border-muted flex flex-col items-center justify-center h-56">
                      <FileText className="h-12 w-12 text-muted-foreground/40 mb-3" />
                      <p className="font-medium">No analysis history yet</p>
                      <p className="text-sm mt-2 max-w-xs">
                        Analyzed content will appear here for quick reference
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
        
        <footer className="mt-20 text-center text-muted-foreground text-sm pb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="h-px w-12 bg-muted-foreground/30 mr-4"></div>
            <Sparkles className="h-4 w-4 text-primary/60" />
            <div className="h-px w-12 bg-muted-foreground/30 ml-4"></div>
          </div>
          <p>© 2025 Truth Seeker - Helping you navigate the sea of information</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
