import { Card } from "@/components/ui/card";
import { Leaf, CheckCircle } from "lucide-react";

export default function TechStackFeatures() {
  return (
    <>
      {/* Technology Stack */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Leaf className="w-6 h-6 mr-2 text-primary" />
          Technology Stack
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {[
            {
              title: "Frontend",
              items: ["React 18 — Modern UI with hooks", "TypeScript — Type-safe JavaScript", "Tailwind CSS — Utility-first CSS", "shadcn/ui — Accessible components (Radix UI)", "Vite — Fast build tool with HMR", "React Router — Client-side routing", "Lucide React — Icon library"],
            },
            {
              title: "Machine Learning",
              items: ["YOLOv8 (Ultralytics) — Object detection", "Scikit-learn — Random Forest classifier", "Python 3.11+ — Core language", "OpenCV — Image processing", "PyTorch — Deep learning framework", "NumPy — Numerical computing", "Pandas — Data manipulation"],
            },
            {
              title: "Backend Infrastructure",
              items: ["FastAPI — Python web framework", "Uvicorn — ASGI server", "Pydantic — Data validation", "Python-multipart — File upload handling", "Python-dotenv — Environment variables"],
            },
            {
              title: "Database & Storage",
              items: ["JSON File Storage — Treatment database (60 entries)", "File System — Models and images storage", "In-Memory Caching — Fast data retrieval"],
            },
            {
              title: "Development Tools",
              items: ["VS Code — IDE", "Git — Version control", "STAR UML — System design", "Postman — API testing"],
            },
          ].map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Features */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          {[
            ["Dual-Model Ensemble Approach", "Combines deep learning (YOLOv8) and traditional ML (Random Forest) for superior accuracy"],
            ["60-Class Detection System", "Comprehensive coverage of diseases, pests, healthy status, and invalid inputs"],
            ["Real-Time Processing", "Complete pipeline executes in ~100ms for instant feedback"],
            ["Multi-Part Analysis", "Detects issues in leaves, stems, pods, and roots"],
            ["Weighted Voting Mechanism", "Intelligent ensemble leveraging strengths of both models"],
            ["Comprehensive Treatment Database", "Chemical, organic, cultural, and biological controls"],
            ["User-Friendly Interface", "Simple three-step process: Upload → Analyze → View Results"],
            ["Confidence Scoring", "Transparent prediction certainty for informed decisions"],
            ["Bounding Box Visualization", "Visual overlay shows exact disease/pest location"],
            ["Severity Classification", "Automatic Low / Medium / High categorization"],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-foreground">{title}</span>
                <span className="text-muted-foreground"> — {desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
