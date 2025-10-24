import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, History, Bug, Leaf, Sparkles, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DetectionResult from "@/components/DetectionResult";
import DetectionHistory from "@/components/DetectionHistory";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type DetectionType = "insect" | "damage" | "comprehensive";

export default function Detection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);
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

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-pest", {
        body: { image },
      });

      if (error) throw error;

      setResult(data);
      
      if (data.detection_type === "not_peanut") {
        toast({
          title: "Invalid Image",
          description: data.result_title,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Detection Complete",
          description: "Analysis successful",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">{t('pestDetection')}</h1>
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="mr-2 w-4 h-4" />
            {t('history')}
          </Button>
        </div>

        {showHistory ? (
          <DetectionHistory />
        ) : (
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
                  onClick={analyzeImage} 
                  disabled={loading || !image} 
                  className="w-full mt-6"
                  size="lg"
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  {loading ? t('analyzing') : t('analyzeImage')}
                </Button>
              </Card>

              <DetectionHistory />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
