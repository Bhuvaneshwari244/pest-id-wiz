import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import TechSystemOverview from "@/components/technical/TechSystemOverview";
import TechModelArchitecture from "@/components/technical/TechModelArchitecture";
import TechTrainingConfig from "@/components/technical/TechTrainingConfig";
import TechDatasetDetails from "@/components/technical/TechDatasetDetails";
import TechPerformancePipeline from "@/components/technical/TechPerformancePipeline";
import TechStackFeatures from "@/components/technical/TechStackFeatures";
import TechOutputRequirements from "@/components/technical/TechOutputRequirements";

export default function Technical() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t('home')}
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-2">Technical Details</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Complete technical documentation of the Peanut Disease Detection System using ensemble machine learning approach.
        </p>

        <TechSystemOverview />
        <TechModelArchitecture />
        <TechTrainingConfig />
        <TechDatasetDetails />
        <TechPerformancePipeline />
        <TechStackFeatures />
        <TechOutputRequirements />
      </div>
    </div>
  );
}
