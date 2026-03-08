import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, Search, FileText, CheckCircle, Play } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingLeaves from "@/components/FloatingLeaves";
import demoVideo from "@/assets/demo-detection-workflow.mp4";

export default function Abstract() {
  const { t } = useLanguage();

  const steps = [
    { icon: Upload, titleKey: "stepUploadTitle", descKey: "stepUploadDesc" },
    { icon: Search, titleKey: "stepAnalyzeTitle", descKey: "stepAnalyzeDesc" },
    { icon: FileText, titleKey: "stepResultsTitle", descKey: "stepResultsDesc" },
    { icon: CheckCircle, titleKey: "stepActionTitle", descKey: "stepActionDesc" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingLeaves />
      <Navigation />

      {/* Header banner */}
      <div className="bg-primary/5 border-b py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23228B22' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("abstractTitle")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Understanding PeanutGuard's approach to crop protection
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border shadow-md">
            <p className="text-lg text-muted-foreground leading-relaxed">{t("abstractContent")}</p>
          </Card>
        </AnimatedSection>

        {/* Demo Video */}
        <AnimatedSection className="max-w-4xl mx-auto mb-16" delay={0.1}>
          <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Play className="w-8 h-8 text-primary" />
            {t("demoVideoTitle")}
          </h2>
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <video src={demoVideo} controls className="w-full aspect-video">
              Your browser does not support the video tag.
            </video>
          </Card>
          <p className="text-center text-muted-foreground mt-4">{t("demoVideoDesc")}</p>
        </AnimatedSection>

        {/* How to Use */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-8">{t("howToUseTitle")}</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-6 relative overflow-hidden hover:shadow-lg transition-all duration-300 h-full border">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/8">{index + 1}</div>
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="p-3 bg-primary/10 rounded-xl shrink-0"
                      >
                        <step.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{t(step.titleKey)}</h3>
                        <p className="text-muted-foreground">{t(step.descKey)}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Tips */}
          <AnimatedSection delay={0.3} className="mt-8">
            <Card className="p-6 bg-primary/5 border-primary/20 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">💡 {t("tipsTitle")}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {t("tip1")}</li>
                <li>• {t("tip2")}</li>
                <li>• {t("tip3")}</li>
                <li>• {t("tip4")}</li>
              </ul>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
