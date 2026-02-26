import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { AnalysisResult as AnalysisResultType } from "@/types/analysis";
import { AlertTriangle, CheckCircle, XCircle, ExternalLink, FileText } from "lucide-react";

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const { score, content, factualConsistency, sourceReputation, sentimentAnalysis, contentType, analysisFactors, url, type } = result;

  const getScoreColor = (value: number) => {
    if (value >= 70) return "bg-success";
    if (value >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const getScoreBadge = (value: number) => {
    if (value >= 70) return "score-high";
    if (value >= 40) return "score-medium";
    return "score-low";
  };

  const getScoreIcon = (value: number) => {
    if (value >= 70) return <CheckCircle className="h-7 w-7 text-success" />;
    if (value >= 40) return <AlertTriangle className="h-7 w-7 text-warning" />;
    return <XCircle className="h-7 w-7 text-destructive" />;
  };

  const getReliabilityClass = (value: number) => {
    if (value >= 70) return "reliability-high";
    if (value >= 40) return "reliability-medium";
    return "reliability-low";
  };

  return (
    <div className="space-y-6">
      {/* Score header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center gap-3">
          {getScoreIcon(score)}
          <div>
            <h3 className="font-display font-semibold text-lg">Overall Reliability</h3>
            <p className={`text-sm ${getReliabilityClass(score)}`}>
              {score >= 70 ? "High Reliability" : score >= 40 ? "Medium Reliability" : "Low Reliability"}
            </p>
          </div>
        </div>
        <Badge className={`score-badge ${getScoreBadge(score)} border-0`}>{score}%</Badge>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-muted-foreground">Reliability Score</span>
          <span className="font-semibold">{score}%</span>
        </div>
        <Progress value={score} className={`h-2.5 rounded-full ${getScoreColor(score)}`} />
      </div>

      {/* URL display */}
      {type === "url" && url && (
        <div className="flex items-center gap-2 text-sm bg-accent/50 p-3 rounded-lg">
          <ExternalLink className="h-4 w-4 text-primary shrink-0" />
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
            {url}
          </a>
        </div>
      )}

      {/* Metrics grid */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="font-display font-semibold">Analysis Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MetricCard label="Content Type" icon={type === "url" ? <ExternalLink className="h-4 w-4" /> : <FileText className="h-4 w-4" />}>
            <p className="text-sm font-medium">{contentType}</p>
          </MetricCard>
          <MetricCard label="Factual Consistency">
            <div className="flex items-center gap-2">
              <Progress value={factualConsistency} className={`h-2 flex-1 rounded-full ${factualConsistency >= 70 ? "bg-success" : factualConsistency >= 40 ? "bg-warning" : "bg-destructive"}`} />
              <span className="text-sm font-semibold w-10 text-right">{factualConsistency}%</span>
            </div>
          </MetricCard>
          <MetricCard label="Source Reputation">
            <div className="flex items-center gap-2">
              <Progress value={sourceReputation} className={`h-2 flex-1 rounded-full ${sourceReputation >= 70 ? "bg-success" : sourceReputation >= 40 ? "bg-warning" : "bg-destructive"}`} />
              <span className="text-sm font-semibold w-10 text-right">{sourceReputation}%</span>
            </div>
          </MetricCard>
          <MetricCard label="Sentiment">
            <p className="text-sm font-medium">{sentimentAnalysis}</p>
          </MetricCard>
        </div>
      </div>

      {/* Content preview */}
      {content && (
        <div className="space-y-2 pt-4">
          <h5 className="text-sm font-medium text-muted-foreground">Content Preview</h5>
          <div className="text-sm bg-muted/30 p-4 rounded-lg max-h-36 overflow-y-auto border border-border font-mono text-xs leading-relaxed">
            {content.substring(0, 300)}
            {content.length > 300 && "..."}
          </div>
        </div>
      )}

      {/* Analysis factors */}
      <div className="space-y-3 pt-4">
        <h5 className="text-sm font-medium text-muted-foreground">Key Factors</h5>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {analysisFactors.map((factor, index) => (
            <li key={index} className="text-sm text-muted-foreground bg-accent/30 p-2.5 rounded-lg flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MetricCard = ({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="p-3.5 rounded-lg bg-accent/30 border border-border/50 space-y-2">
    <div className="flex items-center gap-2">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</h5>
    </div>
    {children}
  </div>
);

export default AnalysisResult;
