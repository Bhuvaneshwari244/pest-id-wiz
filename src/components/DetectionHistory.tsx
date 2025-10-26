import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DetectionHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("detection_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">{t('noHistory')}</p>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {history.map((item) => (
        <Card key={item.id} className="p-6">
          <img
            src={item.image_url}
            alt="Detection"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{item.result_title}</h3>
              <Badge variant={item.severity === "high" ? "destructive" : "secondary"}>
                {item.severity}
              </Badge>
            </div>
            {item.scientific_name && (
              <p className="text-xs text-muted-foreground italic">
                {item.scientific_name}
              </p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.result_description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.confidence_level}% confidence</span>
              <span>{format(new Date(item.created_at), "MMM d, yyyy")}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
