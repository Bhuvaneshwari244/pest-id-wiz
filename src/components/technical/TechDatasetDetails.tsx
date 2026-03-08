import { Card } from "@/components/ui/card";
import { Database } from "lucide-react";

const datasetCategories = [
  {
    title: "Leaf Diseases (7 classes)",
    items: [
      ["Early Leaf Spot", "512"], ["Late Leaf Spot", "489"], ["Early Rust", "467"],
      ["Rust", "445"], ["Alternaria Leaf Spot", "423"], ["Cercospora Leaf Spot", "401"], ["Leaf Blight", "378"],
    ],
  },
  {
    title: "Leaf Insects (10 classes)",
    items: [
      ["Aphids", "356"], ["Thrips", "334"], ["Leaf Miner", "312"], ["Jassids", "298"],
      ["Whitefly", "276"], ["Caterpillar", "254"], ["Armyworm", "232"],
      ["Tobacco Caterpillar", "210"], ["Spodoptera", "198"], ["Helicoverpa", "186"],
    ],
  },
  {
    title: "Pod Diseases (6 classes)",
    items: [
      ["Pod Rot", "289"], ["Aflatoxin Contamination", "267"], ["Aspergillus Infection", "245"],
      ["Rhizoctonia Pod Rot", "223"], ["Pythium Pod Rot", "201"], ["Sclerotium Pod Rot", "189"],
    ],
  },
  {
    title: "Pod Insects (4 classes)",
    items: [
      ["Pod Borer", "198"], ["Red Hairy Caterpillar", "176"], ["Pod Fly", "154"], ["Storage Pests", "132"],
    ],
  },
  {
    title: "Stem Diseases (5 classes)",
    items: [
      ["Collar Rot", "234"], ["Stem Rot", "212"], ["Bacterial Wilt", "190"],
      ["Fusarium Wilt", "168"], ["Sclerotium Stem Rot", "146"],
    ],
  },
  {
    title: "Stem Insects (3 classes)",
    items: [["Stem Borer", "145"], ["Stem Weevil", "123"], ["Stem Fly", "101"]],
  },
  {
    title: "Root Diseases (5 classes)",
    items: [
      ["Root Rot", "198"], ["Root Knot Nematode", "176"], ["Charcoal Rot", "154"],
      ["Crown Rot", "132"], ["Pythium Root Rot", "110"],
    ],
  },
  {
    title: "Root Insects (3 classes)",
    items: [["White Grub", "123"], ["Termites", "101"], ["Root Aphids", "89"]],
  },
  {
    title: "General/Physiological (5 classes)",
    items: [
      ["Nutrition Deficiency", "167"], ["Iron Chlorosis", "145"], ["Drought Stress", "123"],
      ["Waterlogging Damage", "101"], ["Herbicide Injury", "89"],
    ],
  },
  {
    title: "Healthy Categories (4 classes)",
    items: [["Healthy Leaf", "456"], ["Healthy Pod", "389"], ["Healthy Stem", "312"], ["Healthy Root", "245"]],
  },
  {
    title: "Non-Peanut/Invalid (8 classes)",
    items: [
      ["Not Peanut", "234"], ["Other Crop", "198"], ["Weed", "167"], ["Soil Only", "145"],
      ["Poor Image Quality", "123"], ["Non-Plant Object", "101"], ["Multiple Plants", "89"], ["Unclear Symptoms", "78"],
    ],
  },
];

export default function TechDatasetDetails() {
  return (
    <Card className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Database className="w-6 h-6 mr-2 text-primary" />
        Dataset Details
      </h2>
      <p className="text-muted-foreground mb-4">
        The models were trained on a comprehensive dataset combining public agricultural datasets and custom field data collected from research stations.
      </p>

      <div className="grid md:grid-cols-5 gap-4 mb-6">
        {[
          { value: "10,847", label: "Total Images" },
          { value: "70/20/10", label: "Train / Val / Test" },
          { value: "60", label: "Total Classes" },
          { value: "640×640", label: "After Preprocessing" },
          { value: "YOLO", label: "Annotation Format" },
        ].map((m) => (
          <div key={m.label} className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-primary">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-foreground mb-3">Class Distribution by Category</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {datasetCategories.map((cat) => (
          <div key={cat.title} className="border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground text-sm mb-2">{cat.title}</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              {cat.items.map(([name, count]) => (
                <div key={name} className="flex justify-between border-b border-border/50 pb-1">
                  <span>{name}</span>
                  <span className="font-mono">{count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-foreground mt-6 mb-2">Data Sources</h3>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
        <li><strong>PlantVillage Dataset</strong> — General plant disease images (Kaggle)</li>
        <li><strong>Peanut Leaf Disease Dataset</strong> — Peanut-specific disease images (Kaggle)</li>
        <li><strong>Agricultural Research Stations</strong> — Custom field data from multiple locations</li>
        <li><strong>Farmer Submissions</strong> — Real-world images from farming communities</li>
      </ul>
    </Card>
  );
}
