import { Card } from "@/components/ui/card";
import { BarChart3, Target, FlaskConical } from "lucide-react";

export default function TechPerformancePipeline() {
  return (
    <>
      {/* Performance Metrics */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-primary" />
          Performance Metrics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* YOLOv8 */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">YOLOv8 Model</h3>
            <p className="text-xs text-muted-foreground mb-3">Test set (1,085 images)</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[["mAP@0.5", "92.3%"], ["mAP@0.5:0.95", "84.7%"], ["Precision", "91.8%"], ["Recall", "89.6%"], ["F1-Score", "90.7%"], ["Inference", "48ms"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span>{k}</span><span className="font-mono font-semibold text-primary">{v}</span></div>
              ))}
            </div>
          </div>

          {/* Random Forest */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Random Forest</h3>
            <p className="text-xs text-muted-foreground mb-3">Test set (1,085 images)</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[["Accuracy", "89.7%"], ["Precision", "88.4%"], ["Recall", "87.9%"], ["F1-Score", "88.1%"], ["Inference", "23ms"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span>{k}</span><span className="font-mono font-semibold text-primary">{v}</span></div>
              ))}
            </div>
          </div>

          {/* Ensemble */}
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Ensemble (Combined)</h3>
            <p className="text-xs text-muted-foreground mb-3">Weighted voting results</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[["Accuracy", "94.1%"], ["Precision", "93.7%"], ["Recall", "92.8%"], ["F1-Score", "93.2%"], ["Total Time", "~100ms"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span>{k}</span><span className="font-mono font-semibold text-primary">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Detection Pipeline */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2 text-primary" />
          Detection Pipeline
        </h2>
        <p className="text-muted-foreground mb-4">End-to-end detection workflow from image upload to actionable recommendations:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Image Upload", desc: "User captures or uploads a peanut plant image via the web interface (drag-and-drop or file selection)." },
            { step: "2", title: "Validation & Preprocessing", desc: "Format validation (JPEG/PNG), size check (min 640×640), dual resizing (640×640 for YOLO, 224×224 for RF), normalization to [0,1], letterboxing." },
            { step: "3", title: "Parallel Model Inference", desc: "YOLO path: object detection with bounding boxes. RF path: 52-feature extraction and classification. Both run concurrently." },
            { step: "4", title: "Ensemble Voting", desc: "Weighted combination (60% YOLO + 40% RF), confidence calculation via weighted average, class selected by highest combined score." },
            { step: "5", title: "Treatment Retrieval", desc: "Database query against JSON file with 60 disease entries, comprehensive treatment data extraction and formatting." },
            { step: "6", title: "Result Display", desc: "Disease name (common + scientific), confidence score, bounding box overlay, severity level, and detailed treatment recommendations." },
          ].map((s) => (
            <div key={s.step} className="bg-muted/50 rounded-lg p-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-2">{s.step}</div>
              <p className="font-semibold text-foreground text-sm">{s.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Detection Modes */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FlaskConical className="w-6 h-6 mr-2 text-primary" />
          Detection Modes
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Pest Detection Mode</h3>
            <p className="text-sm text-muted-foreground">Specialized entomological analysis focusing on identifying visible pests like aphids, thrips, caterpillars, borers, and other insects affecting peanut plants across leaves, stems, pods, and roots.</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Disease Detection Mode</h3>
            <p className="text-sm text-muted-foreground">Plant pathology analysis identifying disease symptoms including leaf spots, rust, rot, wilt, blight, and other pathogenic infections caused by fungi, bacteria, viruses, and nematodes.</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Comprehensive Analysis Mode</h3>
            <p className="text-sm text-muted-foreground">Full-spectrum analysis combining pest detection and disease assessment for complete crop health evaluation, providing holistic understanding of plant condition and multiple treatment pathways.</p>
          </div>
        </div>
      </Card>
    </>
  );
}
