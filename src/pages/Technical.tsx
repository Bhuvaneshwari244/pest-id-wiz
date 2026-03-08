import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingLeaves from "@/components/FloatingLeaves";

import TechSystemOverview from "@/components/technical/TechSystemOverview";
import TechModelArchitecture from "@/components/technical/TechModelArchitecture";
import TechTrainingConfig from "@/components/technical/TechTrainingConfig";
import TechDatasetDetails from "@/components/technical/TechDatasetDetails";
import TechPerformancePipeline from "@/components/technical/TechPerformancePipeline";
import TechOutputRequirements from "@/components/technical/TechOutputRequirements";

export default function Technical() {
  const { t } = useLanguage();

  const sections = [
    { Component: TechSystemOverview, delay: 0 },
    { Component: TechModelArchitecture, delay: 0.1 },
    { Component: TechTrainingConfig, delay: 0.15 },
    { Component: TechDatasetDetails, delay: 0.2 },
    { Component: TechPerformancePipeline, delay: 0.25 },
    { Component: TechOutputRequirements, delay: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingLeaves />
      <Navigation />

      {/* Header */}
      <div className="border-b py-12 relative overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 max-w-5xl relative z-10"
        >
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t("home")}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Technical Details</h1>
          <p className="text-muted-foreground text-lg">
            Complete technical documentation of the Peanut Disease Detection System using ensemble machine learning approach.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {sections.map(({ Component, delay }, i) => (
          <AnimatedSection key={i} delay={delay}>
            <Component />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
