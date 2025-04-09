
export interface AnalysisInput {
  type: "url" | "text";
  content: string;
}

export interface AnalysisResult {
  score: number;
  factualConsistency: number;
  sourceReputation: number;
  sentimentAnalysis: string;
  contentType: string;
  analysisFactors: string[];
  content: string;
  type: "url" | "text";
  url?: string;
  timestamp: string;
}
