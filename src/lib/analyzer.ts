
import { AnalysisInput, AnalysisResult } from "@/types/analysis";

// This is a simulated analyzer for demonstration purposes
// In a real application, this would use proper NLP models for content analysis
export const analyzeContent = async (input: AnalysisInput): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { type, content } = input;
  
  // In a real app, you would analyze the actual content
  // Here we'll generate a pseudo-random score based on the content
  // This is just for demonstration purposes
  
  let score = 0;
  let factualConsistency = 0;
  let sourceReputation = 0;
  let sentimentAnalysis = "";
  let contentType = "";
  let analysisFactors: string[] = [];
  
  // Generate a hash-like number from the content for pseudo-randomness
  const contentHash = content.split("").reduce(
    (acc, char) => acc + char.charCodeAt(0), 0
  );
  
  // Use the hash to generate somewhat consistent scores for the same content
  score = (contentHash % 100) + 1;
  factualConsistency = ((contentHash * 7) % 100) + 1;
  sourceReputation = ((contentHash * 13) % 100) + 1;
  
  // Determine sentiment based on the score
  if (score >= 70) {
    sentimentAnalysis = "Neutral/Informative";
    contentType = "Factual Reporting";
    analysisFactors = [
      "Multiple credible sources referenced",
      "Consistent with established facts",
      "Balanced presentation of information",
      "Minimal emotional language detected",
      "No significant logical fallacies identified"
    ];
  } else if (score >= 40) {
    sentimentAnalysis = "Somewhat Biased";
    contentType = "Opinion/Analysis";
    analysisFactors = [
      "Some credible sources, but selective use",
      "Some factual inconsistencies detected",
      "Presence of loaded language",
      "Some logical fallacies present",
      "Mixed presentation of viewpoints"
    ];
  } else {
    sentimentAnalysis = "Highly Biased/Emotional";
    contentType = "Misleading Content";
    analysisFactors = [
      "Few or unreliable sources referenced",
      "Multiple factual inconsistencies detected",
      "Excessive use of emotional language",
      "Significant logical fallacies present",
      "One-sided presentation of information"
    ];
  }
  
  return {
    score,
    factualConsistency,
    sourceReputation,
    sentimentAnalysis,
    contentType,
    analysisFactors,
    content,
    type,
    url: type === "url" ? content : undefined,
    timestamp: new Date().toISOString()
  };
};
