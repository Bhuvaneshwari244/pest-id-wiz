import { Card } from "@/components/ui/card";
import { FileJson, Monitor, Globe, Rocket, Timer } from "lucide-react";

const sampleOutput = `{
  "detection_type": "disease | pest | healthy | invalid",
  "class_name": "early_leaf_spot",
  "common_name": "Early Leaf Spot",
  "scientific_name": "Cercospora arachidicola",
  "confidence": 94.5,
  "severity": "medium",
  "affected_parts": ["leaves"],
  "bbox": [120, 85, 340, 290],
  "model_info": {
    "yolo_prediction": "early_leaf_spot",
    "yolo_confidence": "95.2%",
    "rf_prediction": "early_leaf_spot",
    "rf_confidence": "93.1%",
    "ensemble_confidence": "94.5%"
  },
  "symptoms": { "early_stage": [...], "advanced_stage": [...] },
  "treatment": {
    "chemical_control": [...],
    "organic_control": [...],
    "cultural_practices": [...],
    "biological_control": [...]
  },
  "prevention": { "pre_planting": [...], "during_growth": [...], "post_harvest": [...] },
  "economic_impact": { "yield_loss": "10-50%", "treatment_cost": "$30-50/acre" },
  "favorable_conditions": { "temperature": "25-30°C", "humidity": ">80%" },
  "recovery_timeline": "2-3 weeks with proper treatment"
}`;

export default function TechOutputRequirements() {
  return (
    <>
      {/* Structured Output */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileJson className="w-6 h-6 mr-2 text-primary" />
          Structured Output Format
        </h2>
        <p className="text-muted-foreground mb-4">Each detection returns a structured JSON response containing:</p>
        <pre className="bg-muted/50 rounded-lg p-4 text-xs overflow-x-auto text-muted-foreground">
          <code>{sampleOutput}</code>
        </pre>
      </Card>

      {/* Hardware & Software Requirements */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Monitor className="w-6 h-6 mr-2 text-primary" />
          Hardware & Software Requirements
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Development Environment</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[["Processor", "Intel Core i5 @ 2.5GHz+"], ["RAM", "8GB min (16GB recommended)"], ["GPU", "NVIDIA GTX 1060+ (training)"], ["Storage", "500GB HDD/SSD"], ["Camera", "12MP or higher"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1"><span>{k}</span><span className="font-mono text-xs">{v}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Production Deployment</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[["Processor", "Intel Core i3+"], ["RAM", "4GB minimum"], ["GPU", "Optional (CPU supported)"], ["Storage", "100GB"], ["Network", "Stable internet"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1"><span>{k}</span><span className="font-mono text-xs">{v}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Operating System</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Windows 10 or higher</li>
              <li>Linux: Ubuntu 20.04+</li>
              <li>macOS 10.15+ (Catalina or later)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Runtime & Browser</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Python 3.11+</li>
              <li>Node.js 18.0+, npm 9.0+</li>
              <li>Chrome 90+, Firefox 88+, Edge 90+, Safari 14+</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* API Endpoints */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-primary" />
          API Endpoints
        </h2>
        <div className="space-y-4">
          {[
            { method: "GET", path: "/ , /health", desc: "Returns system status and model loading information" },
            { method: "POST", path: "/detect", desc: "Detects diseases/pests from base64-encoded image. Body: { image, detection_type }" },
            { method: "POST", path: "/detect/upload", desc: "Detects diseases/pests from uploaded file (multipart/form-data)" },
            { method: "GET", path: "/classes", desc: "Returns all 60 detectable classes organized by category" },
            { method: "GET", path: "/disease/{disease_name}", desc: "Returns complete information about a specific disease" },
            { method: "GET", path: "/diseases/all", desc: "Returns complete treatment database for all 60 classes" },
          ].map((ep) => (
            <div key={ep.path} className="flex items-start gap-3 border-b border-border pb-3">
              <span className={`font-mono text-xs font-bold px-2 py-1 rounded ${ep.method === "GET" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>{ep.method}</span>
              <div>
                <code className="text-sm font-mono text-foreground">{ep.path}</code>
                <p className="text-xs text-muted-foreground mt-1">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Training Time */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Timer className="w-6 h-6 mr-2 text-primary" />
          Training Time & Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">YOLOv8 Training</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              {[["Duration", "~48 hours"], ["GPU", "NVIDIA GTX 1060 (6GB)"], ["Epochs", "300"], ["Dataset", "10,847 images"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span>{k}</span><span className="font-mono">{v}</span></div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Random Forest Training</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              {[["Duration", "~2 hours"], ["Hardware", "CPU (Intel i5)"], ["Feature Extraction", "~30 min"], ["Model Training", "~90 min"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span>{k}</span><span className="font-mono">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-foreground mb-2">Total Development Timeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {[["Data Collection", "2 weeks"], ["Data Annotation", "3 weeks"], ["Model Training", "1 week"], ["System Integration", "2 weeks"], ["Testing & Validation", "1 week"], ["Total", "~9 weeks"]].map(([k, v]) => (
            <div key={k} className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="font-bold text-primary">{v}</p>
              <p className="text-xs text-muted-foreground">{k}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Future Enhancements */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Rocket className="w-6 h-6 mr-2 text-primary" />
          Future Enhancements
        </h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          {[
            "Mobile Application — Native iOS and Android apps",
            "Offline Mode — On-device inference without internet",
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
    </>
  );
}
