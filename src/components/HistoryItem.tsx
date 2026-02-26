import React from "react";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/types/analysis";
import { Clock, ExternalLink, FileText, Shield } from "lucide-react";

interface HistoryItemProps {
  item: AnalysisResult;
  onClick: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onClick }) => {
  const { score, content, timestamp, type, url } = item;

  const getScoreBadge = (value: number) => {
    if (value >= 70) return "score-high";
    if (value >= 40) return "score-medium";
    return "score-low";
  };

  const getBorderColor = (value: number) => {
    if (value >= 70) return "border-l-success";
    if (value >= 40) return "border-l-warning";
    return "border-l-destructive";
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  const formatTimestamp = (ts: string) =>
    new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 rounded-lg border border-border/50 bg-card hover:bg-accent/30 transition-all duration-200 hover:shadow-sm border-l-4 ${getBorderColor(score)} group`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {type === "url" ? (
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          ) : (
            <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          )}
          <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {type === "url" ? truncateText(url || "URL", 28) : "Text Analysis"}
          </span>
        </div>
        <Badge className={`text-xs ${getScoreBadge(score)} border-0 shrink-0 ml-2 flex items-center gap-1`}>
          <Shield className="h-3 w-3" /> {score}%
        </Badge>
      </div>
      {content && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {truncateText(content, 70)}
        </p>
      )}
      <div className="flex items-center text-xs text-muted-foreground/70">
        <Clock className="h-3 w-3 mr-1" />
        <span>{formatTimestamp(timestamp)}</span>
      </div>
    </button>
  );
};

export default HistoryItem;
