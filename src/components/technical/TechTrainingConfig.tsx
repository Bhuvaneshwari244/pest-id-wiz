import { Card } from "@/components/ui/card";
import { Cpu } from "lucide-react";

export default function TechTrainingConfig() {
  return (
    <Card className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Cpu className="w-6 h-6 mr-2 text-primary" />
        Training Configuration
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* YOLOv8 Hyperparams */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">YOLOv8 Hyperparameters</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {[
              ["Epochs", "300"],
              ["Batch Size", "16"],
              ["Learning Rate", "0.01"],
              ["Optimizer", "SGD"],
              ["Momentum", "0.937"],
              ["Weight Decay", "0.0005"],
              ["Warmup Epochs", "3"],
              ["Early Stopping", "20"],
              ["Image Size", "640×640"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-1">
                <span>{k}</span><span className="font-mono">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Random Forest Hyperparams */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Random Forest Hyperparameters</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {[
              ["Number of Trees", "200"],
              ["Max Depth", "20"],
              ["Min Samples Split", "10"],
              ["Min Samples Leaf", "2"],
              ["Random State", "42"],
              ["Feature Count", "52"],
              ["Input Size", "224×224"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-1">
                <span>{k}</span><span className="font-mono">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Augmentation */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Data Augmentation</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {[
              ["HSV-Hue", "0.015"],
              ["HSV-Saturation", "0.7"],
              ["HSV-Value", "0.4"],
              ["Rotation", "±10°"],
              ["Scale", "0.5"],
              ["Horizontal Flip", "50%"],
              ["Vertical Flip", "25%"],
              ["Mosaic", "100%"],
              ["MixUp", "10%"],
              ["Brightness", "±20%"],
              ["Contrast", "±15%"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-1">
                <span>{k}</span><span className="font-mono">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
