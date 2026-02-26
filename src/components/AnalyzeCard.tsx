import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, FileText, Loader2, Zap } from "lucide-react";

interface AnalyzeCardProps {
  url: string;
  text: string;
  isAnalyzing: boolean;
  onUrlChange: (url: string) => void;
  onTextChange: (text: string) => void;
  onUrlSubmit: (e: React.FormEvent) => void;
  onTextSubmit: (e: React.FormEvent) => void;
}

const AnalyzeCard = ({ url, text, isAnalyzing, onUrlChange, onTextChange, onUrlSubmit, onTextSubmit }: AnalyzeCardProps) => {
  return (
    <div className="card-elevated p-6 sm:p-8 fade-in-up stagger-1">
      <div className="flex items-center gap-3 mb-1">
        <div className="p-2 rounded-lg primary-gradient">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold">Analyze Content</h2>
          <p className="text-sm text-muted-foreground">Enter a URL or paste text to verify</p>
        </div>
      </div>

      <Tabs defaultValue="url" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2 h-11 rounded-lg bg-muted/50">
          <TabsTrigger value="url" className="flex items-center gap-2 rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium">
            <ExternalLink className="h-4 w-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2 rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium">
            <FileText className="h-4 w-4" />
            Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="animate-fade-in mt-4">
          <form onSubmit={onUrlSubmit} className="space-y-4">
            <Input
              placeholder="https://example.com/news-article"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              className="h-12 text-base bg-muted/30 border-muted focus-visible:ring-primary/40"
            />
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold primary-gradient btn-glow"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Analyze URL
                </span>
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="text" className="animate-fade-in mt-4">
          <form onSubmit={onTextSubmit} className="space-y-4">
            <Textarea
              placeholder="Paste news content here to verify its reliability..."
              rows={5}
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="text-base bg-muted/30 border-muted focus-visible:ring-primary/40 resize-none"
            />
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold primary-gradient btn-glow"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Analyze Text
                </span>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyzeCard;
