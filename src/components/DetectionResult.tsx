import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bug, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DetectionResultProps {
  result: {
    detection_type: string;
    result_title: string;
    result_description: string;
    scientific_name?: string;
    severity: string;
    confidence_level: number;
    recommendations?: string;
  };
  imageUrl: string;
}

export default function DetectionResult({ result, imageUrl }: DetectionResultProps) {
  const { t } = useLanguage();
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <AlertCircle className="w-5 h-5" />;
      case "medium":
        return <Bug className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  if (result.detection_type === "not_peanut") {
    return (
      <Card className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-semibold mb-2 text-destructive">
            {result.result_title}
          </h2>
          <p className="text-muted-foreground">{result.result_description}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-6">{t('detectionResults')}</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{result.result_title}</h3>
            <Badge variant={getSeverityColor(result.severity)} className="flex items-center gap-1">
              {getSeverityIcon(result.severity)}
              {result.severity}
            </Badge>
          </div>
          {result.scientific_name && (
            <p className="text-sm text-muted-foreground italic mb-2">
              {t('scientificName')}: {result.scientific_name}
            </p>
          )}
          <p className="text-muted-foreground">{result.result_description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t('confidenceLevel')}</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-secondary rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all"
                style={{ width: `${result.confidence_level}%` }}
              />
            </div>
            <span className="font-semibold">{result.confidence_level}%</span>
          </div>
        </div>

        {result.recommendations && (
          <div>
            <h4 className="font-semibold mb-2">{t('recommendations')}</h4>
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm">{result.recommendations}</p>
            </div>
          </div>
        )}

        <div>
          <h4 className="font-semibold mb-2">{t('detectionMethod')}</h4>
          <p className="text-sm text-muted-foreground">
            Analyzed using YOLOv8 algorithm with agricultural pest detection model
          </p>
        </div>
      </div>
    </Card>
  );
}
