import { Card } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function TechOutputRequirements() {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Rocket className="w-6 h-6 mr-2 text-primary" />
        Future Enhancements
      </h2>
      <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {[
          "Mobile Application — Native iOS and Android apps",
          "Multi-Language Support — Interface in regional languages",
          "Weather Integration — Correlate disease risk with weather data",
          "GPS Tracking — Map disease hotspots geographically",
          "Expert Consultation — Connect farmers with agricultural experts",
          "Yield Prediction — Estimate crop yield based on health status",
          "Treatment Tracking — Monitor treatment effectiveness over time",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
