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
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import FloatingLeaves from "@/components/FloatingLeaves";


interface DetectionResultType {
  detection_type: string;
  result_title: string;
  result_description: string;
  scientific_name?: string;
  severity: string;
  confidence_level: number;
  cultural_recommendations?: string;
  chemical_recommendations?: string;
  biological_recommendations?: string;
  pesticide_images?: Array<{ name: string; imageUrl: string; searchUrl: string }>;
}

type DetectionType = "insect" | "damage" | "comprehensive";

export default function Detection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResultType | null>(null);
  const [detectionType, setDetectionType] = useState<DetectionType>("damage");
  const { toast } = useToast();
  const { t, language } = useLanguage();

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
      const { data, error } = await supabase.functions.invoke("analyze-pest", {
        body: { image, detectionType, language },
      });
      if (error) throw new Error(error.message || "Analysis failed");
      const detectionResult = data as DetectionResultType;
      setResult(detectionResult);
      if (detectionResult.detection_type === "not_peanut") {
        toast({ title: t("invalidImage"), description: detectionResult.result_title, variant: "destructive" });
      } else {
        toast({ title: t("detectionComplete"), description: t("analysisSuccess") });
      }
    } catch (error: any) {
      toast({ title: t("errorTitle"), description: error?.message ?? String(error), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const detectionOptions = [
    { value: "insect", icon: Bug, color: "text-primary", titleKey: "insectIdentification", descKey: "insectDesc" },
    { value: "damage", icon: Leaf, color: "text-primary", titleKey: "damageSymptom", descKey: "damageDesc" },
    { value: "comprehensive", icon: Sparkles, color: "text-primary", titleKey: "comprehensive", descKey: "comprehensiveDesc" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingLeaves />
      <Navigation />

      {/* Header */}
      <div className="border-b py-10 relative overflow-hidden bg-gradient-to-br from-[hsl(142,76%,28%)] via-[hsl(142,70%,34%)] to-[hsl(142,60%,40%)]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{t("diseaseDetection")}</h1>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Left - Image upload */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {!image ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center h-[500px] flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300"
                >
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  </motion.div>
                  <p className="text-muted-foreground mb-4">{t("uploadDesc")}</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload">
                    <Button asChild className="shadow-md hover:shadow-lg transition-shadow">
                      <span>
                        <Camera className="mr-2 w-4 h-4" />
                        {t("chooseImage")}
                      </span>
                    </Button>
                  </label>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10 rounded-full shadow-lg"
                    onClick={() => { setImage(null); setResult(null); }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <img src={image} alt="Uploaded" className="w-full rounded-xl shadow-md" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6"
                >
                  <DetectionResult result={result} imageUrl={image!} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right - Controls */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6">
            <Card className="p-6 shadow-md bg-card/80 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">{t("detectionType")}</h2>
              <RadioGroup value={detectionType} onValueChange={(v) => setDetectionType(v as DetectionType)}>
                <div className="space-y-4">
                  {detectionOptions.map((opt) => (
                    <motion.div
                      key={opt.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start space-x-3 p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${
                        detectionType === opt.value ? "border-primary bg-primary/5" : "hover:bg-accent/50"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <opt.icon className={`w-5 h-5 ${opt.color}`} />
                          <span className="font-medium">{t(opt.titleKey)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{t(opt.descKey)}</p>
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={handleAnalyze} disabled={loading || !image} className="w-full mt-6 shadow-md" size="lg">
                  {loading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Sparkles className="mr-2 w-4 h-4" />}
                  {loading ? t("analyzing") : t("analyzeImage")}
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
