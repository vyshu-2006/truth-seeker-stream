
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/types/analysis";
import { Clock, ExternalLink, FileText } from "lucide-react";

interface HistoryItemProps {
  item: AnalysisResult;
  onClick: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onClick }) => {
  const { score, content, timestamp, type, url } = item;

  const getScoreBadge = (value: number) => {
    if (value >= 70) return "bg-green-100 text-green-800";
    if (value >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:translate-y-[-2px] border-l-4 hover:border-primary"
      onClick={onClick}
      style={{ borderLeftColor: score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444" }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {type === "url" ? (
              <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
            ) : (
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">
              {type === "url" 
                ? truncateText(url || "URL Analysis", 30) 
                : "Text Analysis"}
            </span>
          </div>
          <Badge className={`text-xs ${getScoreBadge(score)}`}>
            {score}%
          </Badge>
        </div>
        {content && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {truncateText(content, 60)}
          </p>
        )}
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formatTimestamp(timestamp)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryItem;
