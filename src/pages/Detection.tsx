import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, Bug, Leaf, Sparkles, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DetectionResult from "@/components/DetectionResult";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { analyzeImage, type DetectionResult as DetectionResultType } from "@/lib/mockDetection";

type DetectionType = "insect" | "damage" | "comprehensive";

export default function Detection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResultType | null>(null);
  const [detectionType, setDetectionType] = useState<DetectionType>("damage");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const detectionResult = await analyzeImage(image, detectionType);
      setResult(detectionResult);

      if (detectionResult.detection_type === "not_peanut") {
        toast({
          title: t("invalidImage"),
          description: detectionResult.result_title,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("detectionComplete"),
          description: t("analysisSuccess"),
        });
      }
    } catch (error: any) {
      toast({
        title: t("errorTitle"),
        description: error?.message ?? String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">{t('diseaseDetection')}</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Left side - Image upload */}
          <div className="relative">
            {!image ? (
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center h-[500px] flex flex-col items-center justify-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  {t('uploadDesc')}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span>
                      <Camera className="mr-2 w-4 h-4" />
                      {t('chooseImage')}
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="relative">
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 rounded-full"
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {result && (
              <div className="mt-6">
                <DetectionResult result={result} imageUrl={image!} />
              </div>
            )}
          </div>

          {/* Right side - Detection controls */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('detectionType')}</h2>
              <RadioGroup value={detectionType} onValueChange={(v) => setDetectionType(v as DetectionType)}>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="insect" id="insect" />
                    <Label htmlFor="insect" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Bug className="w-5 h-5 text-primary" />
                        <span className="font-medium">{t('insectIdentification')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('insectDesc')}</p>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="damage" id="damage" />
                    <Label htmlFor="damage" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{t('damageSymptom')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('damageDesc')}</p>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="comprehensive" id="comprehensive" />
                    <Label htmlFor="comprehensive" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-medium">{t('comprehensive')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('comprehensiveDesc')}</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !image} 
                className="w-full mt-6"
                size="lg"
              >
                {loading ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 w-4 h-4" />
                )}
                {loading ? t('analyzing') : t('analyzeImage')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
