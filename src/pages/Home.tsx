import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bug, Leaf, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="w-16 h-16 text-primary mr-4" />
            <h1 className="text-5xl font-bold text-primary">PeanutGuard AI</h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8">
            Advanced YOLO-Based Pest Detection System
          </p>
          <Link to="/detect">
            <Button size="lg" className="text-lg px-8 py-6">
              <Shield className="mr-2 w-5 h-5" />
              Start Detection
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-lg border shadow-lg">
            <Bug className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Real-Time Detection</h3>
            <p className="text-muted-foreground">
              YOLO algorithm provides instant pest identification with high accuracy
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg border shadow-lg">
            <Leaf className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Peanut Leaf Validation</h3>
            <p className="text-muted-foreground">
              Validates peanut leaves before detection to ensure accurate results
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg border shadow-lg">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Scientific Analysis</h3>
            <p className="text-muted-foreground">
              Provides scientific names, severity levels, and treatment recommendations
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/technical">
            <Button variant="outline" size="lg">
              Learn About YOLO Technology
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
