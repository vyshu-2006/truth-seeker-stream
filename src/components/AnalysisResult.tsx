
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
    if (value >= 70) return "bg-green-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreBadge = (value: number) => {
    if (value >= 70) return "score-high";
    if (value >= 40) return "score-medium";
    return "score-low";
  };

  const getScoreIcon = (value: number) => {
    if (value >= 70) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (value >= 40) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    return <XCircle className="h-6 w-6 text-red-500" />;
  };

  const getReliabilityClass = (value: number) => {
    if (value >= 70) return "reliability-high";
    if (value >= 40) return "reliability-medium";
    return "reliability-low";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getScoreIcon(score)}
          <div>
            <h3 className="font-semibold text-lg">Overall Reliability</h3>
            <p className={`text-sm font-medium ${getReliabilityClass(score)}`}>
              {score >= 70 ? "High Reliability" : score >= 40 ? "Medium Reliability" : "Low Reliability"}
            </p>
          </div>
        </div>
        <Badge className={`score-badge ${getScoreBadge(score)}`}>{score}%</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Reliability Score</span>
          <span className="text-sm font-medium">{score}%</span>
        </div>
        <Progress value={score} className={`h-2 ${getScoreColor(score)}`} />
      </div>

      {(type === "url" && url) && (
        <div className="flex items-center space-x-2 text-sm bg-muted/30 p-3 rounded-md">
          <ExternalLink className="h-4 w-4 text-primary" />
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline truncate"
          >
            {url}
          </a>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold">Analysis Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 bg-muted/10 p-3 rounded-md">
            <h5 className="text-sm font-medium text-foreground/80">Content Type</h5>
            <div className="flex items-center space-x-2">
              {type === "url" ? (
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              ) : (
                <FileText className="h-4 w-4 text-muted-foreground" />
              )}
              <p className="text-sm">{contentType}</p>
            </div>
          </div>
          
          <div className="space-y-2 bg-muted/10 p-3 rounded-md">
            <h5 className="text-sm font-medium text-foreground/80">Factual Consistency</h5>
            <div className="flex items-center space-x-2">
              <Progress value={factualConsistency} className={`h-2 flex-1 ${factualConsistency >= 70 ? "bg-green-500" : factualConsistency >= 40 ? "bg-yellow-500" : "bg-red-500"}`} />
              <span className="text-sm">{factualConsistency}%</span>
            </div>
          </div>
          
          <div className="space-y-2 bg-muted/10 p-3 rounded-md">
            <h5 className="text-sm font-medium text-foreground/80">Source Reputation</h5>
            <div className="flex items-center space-x-2">
              <Progress value={sourceReputation} className={`h-2 flex-1 ${sourceReputation >= 70 ? "bg-green-500" : sourceReputation >= 40 ? "bg-yellow-500" : "bg-red-500"}`} />
              <span className="text-sm">{sourceReputation}%</span>
            </div>
          </div>
          
          <div className="space-y-2 bg-muted/10 p-3 rounded-md">
            <h5 className="text-sm font-medium text-foreground/80">Sentiment Analysis</h5>
            <p className="text-sm">{sentimentAnalysis}</p>
          </div>
        </div>

        {content && (
          <div className="space-y-2 pt-4">
            <h5 className="text-sm font-medium text-foreground/80">Content Preview</h5>
            <div className="text-sm bg-muted/20 p-4 rounded-md max-h-40 overflow-y-auto border border-muted">
              {content.substring(0, 300)}
              {content.length > 300 && "..."}
            </div>
          </div>
        )}

        <div className="space-y-2 pt-4">
          <h5 className="text-sm font-medium text-foreground/80">Key Analysis Factors</h5>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {analysisFactors.map((factor, index) => (
              <li key={index} className="text-sm text-muted-foreground bg-muted/10 p-2 rounded-md flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
