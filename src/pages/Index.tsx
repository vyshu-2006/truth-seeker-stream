import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Shield, FileText, Clock, X, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnalysisResult from "@/components/AnalysisResult";
import HistoryItem from "@/components/HistoryItem";
import AnalyzeCard from "@/components/AnalyzeCard";
import Header from "@/components/Header";
import { analyzeContent } from "@/lib/analyzer";
import { AnalysisResult as AnalysisResultType } from "@/types/analysis";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const Index = () => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [history, setHistory] = useState<AnalysisResultType[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  const handleUrlAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a URL to analyze" });
      return;
    }
    setIsAnalyzing(true);
    try {
      const result = await analyzeContent({ type: "url", content: url });
      setAnalysisResult(result);
      setHistory(prev => [result, ...prev]);
      toast({ title: "Analysis Complete", description: "Content reliability assessed." });
    } catch {
      toast({ variant: "destructive", title: "Analysis Failed", description: "Please try again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      toast({ variant: "destructive", title: "Error", description: "Please enter text to analyze" });
      return;
    }
    setIsAnalyzing(true);
    try {
      const result = await analyzeContent({ type: "text", content: text });
      setAnalysisResult(result);
      setHistory(prev => [result, ...prev]);
      toast({ title: "Analysis Complete", description: "Content reliability assessed." });
    } catch {
      toast({ variant: "destructive", title: "Analysis Failed", description: "Please try again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysisResult(null);
    setUrl("");
    setText("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header session={session} onSignOut={handleSignOut} />

      <main className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Hero */}
        <section className="text-center mb-12 fade-in">
          <div className="flex justify-center mb-5">
            <div className="relative animate-float">
              <div className="p-4 rounded-2xl primary-gradient shadow-lg">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 primary-gradient blur-2xl opacity-30 rounded-2xl -z-10 scale-150" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-3 primary-gradient-text tracking-tight">
            Truth Seeker
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Real-time fake news detection powered by advanced AI analysis
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <AnalyzeCard
              url={url}
              text={text}
              isAnalyzing={isAnalyzing}
              onUrlChange={setUrl}
              onTextChange={setText}
              onUrlSubmit={handleUrlAnalysis}
              onTextSubmit={handleTextAnalysis}
            />

            {analysisResult && (
              <div className="card-elevated p-6 sm:p-8 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold">Analysis Results</h2>
                      <p className="text-sm text-muted-foreground">Content reliability assessment</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearAnalysis}
                    aria-label="Clear analysis"
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <AnalysisResult result={analysisResult} />
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 text-primary shrink-0" />
                  <span>Results should be used as a guide. Always verify with multiple sources.</span>
                </div>
              </div>
            )}
          </div>

          {/* History sidebar */}
          <aside className="fade-in-up stagger-2">
            <div className="card-elevated p-6 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent">
                  <Clock className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-semibold">History</h2>
                  <p className="text-sm text-muted-foreground">Previous analyses</p>
                </div>
              </div>
              <ScrollArea className="h-[500px] pr-2">
                {history.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3 animate-float" />
                    <p className="font-medium text-muted-foreground">No history yet</p>
                    <p className="text-sm mt-1 text-muted-foreground/70">
                      Analyzed content will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <HistoryItem
                        key={index}
                        item={item}
                        onClick={() => setAnalysisResult(item)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </aside>
        </div>

        <footer className="mt-16 text-center text-muted-foreground text-sm pb-8 fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-border" />
            <Shield className="h-4 w-4 text-primary/50" />
            <div className="h-px w-10 bg-border" />
          </div>
          <p>© 2026 Truth Seeker — Navigate information with confidence</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
