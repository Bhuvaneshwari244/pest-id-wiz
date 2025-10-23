import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DetectionResult from "@/components/DetectionResult";
import DetectionHistory from "@/components/DetectionHistory";
import LanguageSelector from "@/components/LanguageSelector";

export default function Detection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Pest Detection</h1>
          <div className="flex gap-4">
            <LanguageSelector />
            <Button
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="mr-2 w-4 h-4" />
              History
            </Button>
          </div>
        </div>

        {showHistory ? (
          <DetectionHistory />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Upload Image</h2>
              
              {!image ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Upload a peanut leaf image for analysis
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
                        Choose Image
                      </span>
                    </Button>
                  </label>
                </div>
              ) : (
                <div>
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full rounded-lg mb-4"
                  />
                  <div className="flex gap-4">
                    <Button onClick={analyzeImage} disabled={loading} className="flex-1">
                      {loading ? "Analyzing..." : "Analyze with YOLO"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImage(null);
                        setResult(null);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {result && <DetectionResult result={result} imageUrl={image!} />}
          </div>
        )}
      </div>
    </div>
  );
}
