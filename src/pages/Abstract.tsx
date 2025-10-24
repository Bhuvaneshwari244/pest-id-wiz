import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";

export default function Abstract() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Abstract</h1>
        
        <Card className="p-8 max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Enhanced Pest Management in Peanut Farming Using CNN presents a revolutionary 
            AI-powered pest detection system specifically designed for peanut crops. This 
            advanced system leverages Convolutional Neural Networks (CNN) and YOLO technology 
            to identify threats early, protect harvests, and maximize agricultural productivity.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The system provides real-time detection and analysis of various pests and diseases 
            affecting peanut crops, including Aphids, Leaf Miners, Thrips, White Grubs, Army Worms, 
            Early Leaf Spot, Late Leaf Spot, Rust, Bacterial Wilt, and Viral Diseases.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            By combining cutting-edge AI technology with agricultural expertise, PeanutGuard AI 
            empowers farmers with accurate, timely information to make informed decisions about 
            pest management and crop protection strategies.
          </p>
        </Card>
      </div>
    </div>
  );
}
