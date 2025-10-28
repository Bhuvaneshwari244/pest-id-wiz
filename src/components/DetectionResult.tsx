import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bug, CheckCircle, Leaf } from "lucide-react";
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
    cultural_recommendations?: string;
    chemical_recommendations?: string;
    biological_recommendations?: string;
    pesticide_images?: string[];
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

        {(result.cultural_recommendations || result.chemical_recommendations || result.biological_recommendations || result.recommendations) && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t('recommendations')}</h4>
            
            {result.cultural_recommendations && (
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <h5 className="font-semibold text-green-800 dark:text-green-300">Cultural Control</h5>
                </div>
                <p className="text-sm text-green-900 dark:text-green-100">{result.cultural_recommendations}</p>
              </div>
            )}

            {result.chemical_recommendations && (
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-5 h-5 text-orange-600" />
                  <h5 className="font-semibold text-orange-800 dark:text-orange-300">Chemical Control</h5>
                </div>
                <p className="text-sm text-orange-900 dark:text-orange-100">{result.chemical_recommendations}</p>
                
                {result.pesticide_images && result.pesticide_images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-orange-700 dark:text-orange-400 mb-2">Pesticide Reference Images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {result.pesticide_images.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`Pesticide ${idx + 1}`}
                          className="w-full h-24 object-cover rounded border border-orange-300 dark:border-orange-700"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {result.biological_recommendations && (
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h5 className="font-semibold text-blue-800 dark:text-blue-300">Biological Control</h5>
                </div>
                <p className="text-sm text-blue-900 dark:text-blue-100">{result.biological_recommendations}</p>
              </div>
            )}

            {!result.cultural_recommendations && !result.chemical_recommendations && !result.biological_recommendations && result.recommendations && (
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm">{result.recommendations}</p>
              </div>
            )}
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
