import { Card } from "@/components/ui/card";
import { Layers } from "lucide-react";

export default function TechSystemOverview() {
  return (
    <Card className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Layers className="w-6 h-6 mr-2 text-primary" />
        System Overview
      </h2>
      <p className="text-muted-foreground mb-4">
        Peanut Disease Detection System uses an ensemble approach combining YOLOv8 deep learning model and Random Forest classifier trained on 10,847 annotated images to detect 60 different classes including diseases, pests, and healthy status across multiple plant parts (leaves, stems, pods, roots). The system performs real-time image validation, dual-model inference with weighted voting, and provides comprehensive treatment recommendations.
      </p>
      <div className="grid md:grid-cols-5 gap-4 mt-4">
        {[
          { value: "YOLOv8", label: "Object Detection Model" },
          { value: "60", label: "Detection Classes" },
          { value: "640×640", label: "YOLO Input Resolution" },
          { value: "224×224", label: "RF Feature Extraction" },
          { value: "94.1%", label: "Ensemble Accuracy" },
        ].map((m) => (
          <div key={m.label} className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
