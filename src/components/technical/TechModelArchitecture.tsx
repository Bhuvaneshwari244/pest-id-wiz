import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

export default function TechModelArchitecture() {
  return (
    <Card className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-primary" />
        Model Architecture — Dual-Model Ensemble System
      </h2>
      <p className="text-muted-foreground mb-6">
        The system employs two complementary models working in parallel:
      </p>

      {/* YOLOv8 */}
      <div className="border border-border rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">1. YOLOv8 Model (Deep Learning)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          YOLOv8 (You Only Look Once v8) — State-of-the-art real-time object detection model developed by Ultralytics, optimized for fast inference while maintaining high accuracy.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Backbone:</span><span>CSPDarknet53 with Cross Stage Partial connections for efficient feature extraction</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Pre-training:</span><span>Transfer learning from COCO dataset pre-trained weights for faster convergence</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Detection Head:</span><span>Anchor-free decoupled head with multi-scale feature fusion (P3/P4/P5)</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Input Size:</span><span>640×640 pixels with letterboxing to maintain aspect ratio</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Output:</span><span>Bounding boxes, class predictions, confidence scores</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "mAP@0.5", value: "92.3%" },
            { label: "Inference Time", value: "48ms" },
            { label: "Precision", value: "91.8%" },
            { label: "Recall", value: "89.6%" },
          ].map((m) => (
            <div key={m.label} className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Random Forest */}
      <div className="border border-border rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">2. Random Forest Classifier (Traditional ML)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ensemble of 200 decision trees with majority voting mechanism for robust classification.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-foreground min-w-[140px]">Feature Extraction:</span>
            <span>52 handcrafted features — Color (Mean RGB, histograms, dominant colors), Texture (LBP, Gabor filters, edge density, contrast), Shape (aspect ratio, compactness, circularity, area)</span>
          </div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Input Size:</span><span>224×224 pixels for feature computation</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Tree Depth:</span><span>Maximum depth of 20 levels</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Min Samples Split:</span><span>10 samples required to split a node</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Accuracy", value: "89.7%" },
            { label: "Inference Time", value: "23ms" },
            { label: "Precision", value: "88.4%" },
            { label: "Recall", value: "87.9%" },
          ].map((m) => (
            <div key={m.label} className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ensemble Voting */}
      <div className="border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">3. Ensemble Voting Mechanism</h3>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">YOLO Weight:</span><span>60% (superior localization and deep feature learning)</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">RF Weight:</span><span>40% (robust to overfitting and class imbalance)</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Final Confidence:</span><span>Weighted average of both model confidences</span></div>
          <div className="flex items-start gap-2"><span className="font-semibold text-foreground min-w-[140px]">Final Class:</span><span>Selected based on highest combined confidence score</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Overall Accuracy", value: "94.1%" },
            { label: "Inference Time", value: "~100ms" },
            { label: "Precision", value: "93.7%" },
            { label: "Recall", value: "92.8%" },
            { label: "F1-Score", value: "93.2%" },
          ].map((m) => (
            <div key={m.label} className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
