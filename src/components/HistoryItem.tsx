
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

  const getBorderColor = (value: number) => {
    if (value >= 70) return "#10b981";
    if (value >= 40) return "#f59e0b";
    return "#ef4444";
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
      className="cursor-pointer transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] border-l-4 hover:border-primary overflow-hidden animate-scale-in"
      onClick={onClick}
      style={{ borderLeftColor: getBorderColor(score) }}
    >
      <CardContent className="p-4 group">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {type === "url" ? (
              <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <FileText className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
            <span className="text-sm font-medium truncate max-w-[150px] group-hover:text-primary transition-colors">
              {type === "url" 
                ? truncateText(url || "URL Analysis", 30) 
                : "Text Analysis"}
            </span>
          </div>
          <Badge className={`text-xs ${getScoreBadge(score)} shadow-sm transition-all duration-300 group-hover:shadow scale-in`}>
            {score}%
          </Badge>
        </div>
        {content && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2 bg-muted/20 p-1.5 rounded group-hover:bg-muted/30 transition-colors">
            {truncateText(content, 60)}
          </p>
        )}
        <div className="flex items-center text-xs text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formatTimestamp(timestamp)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryItem;
