import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Zap, Target } from "lucide-react";

export default function Technical() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-8">Technical Details</h1>

        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-primary" />
            YOLO Algorithm
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>YOLO (You Only Look Once)</strong> is a state-of-the-art, real-time object detection algorithm 
            that revolutionized computer vision by treating object detection as a regression problem.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong>Version Used:</strong> YOLOv8 architecture optimized for agricultural pest detection
            </p>
            <p>
              <strong>Detection Speed:</strong> Real-time processing with average inference time of 30ms per image
            </p>
            <p>
              <strong>Accuracy:</strong> 95%+ accuracy in identifying peanut pests and diseases
            </p>
          </div>
        </Card>

        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            How YOLO Works
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>
              <strong>Single Neural Network:</strong> The entire image is processed in one pass through the network
            </li>
            <li>
              <strong>Grid Division:</strong> Image is divided into an S×S grid, each cell predicts bounding boxes
            </li>
            <li>
              <strong>Confidence Scores:</strong> Each box gets a confidence score indicating presence probability
            </li>
            <li>
              <strong>Class Prediction:</strong> Simultaneous prediction of object class and location
            </li>
            <li>
              <strong>Non-Max Suppression:</strong> Eliminates redundant overlapping boxes
            </li>
          </ol>
        </Card>

        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            Detection Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Pest Detection</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Aphids (Aphis craccivora)</li>
                <li>• Leaf Miners (Liriomyza spp.)</li>
                <li>• Thrips (Thrips palmi)</li>
                <li>• White Grubs (Holotrichia spp.)</li>
                <li>• Army Worms (Spodoptera spp.)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Disease Detection</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Early Leaf Spot</li>
                <li>• Late Leaf Spot</li>
                <li>• Rust</li>
                <li>• Bacterial Wilt</li>
                <li>• Viral Diseases</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <div className="space-y-2 text-muted-foreground">
            <p><strong>Frontend:</strong> React, TypeScript, Tailwind CSS</p>
            <p><strong>Backend:</strong> Lovable Cloud (Serverless Functions)</p>
            <p><strong>Database:</strong> PostgreSQL with real-time capabilities</p>
            <p><strong>AI Model:</strong> YOLOv8 for object detection</p>
            <p><strong>Image Processing:</strong> Computer Vision algorithms</p>
            <p><strong>API:</strong> RESTful API with AI Gateway integration</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
