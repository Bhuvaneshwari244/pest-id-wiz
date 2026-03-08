import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Cpu, TrendingUp, Users, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingLeaves from "@/components/FloatingLeaves";
import heroBg from "@/assets/hero-crop-bg.jpg";


export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, titleKey: "accurateDetection", descKey: "accurateDesc", delay: 0 },
    { icon: Cpu, titleKey: "instantResults", descKey: "instantDesc", delay: 0.1 },
    { icon: TrendingUp, titleKey: "expertGuidance", descKey: "expertDesc", delay: 0.2 },
    { icon: Users, titleKey: "easyToUse", descKey: "easyDesc", delay: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingLeaves />
      <Navigation />

      {/* Hero Section with crop background */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(142,76%,20%)/0.92] via-[hsl(142,76%,25%)/0.85] to-[hsl(142,76%,30%)/0.75]" />
        </div>

        {/* Animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }} />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              >
                {t("heroTitle")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-yellow-200 mb-4 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] font-medium"
              >
                {t("heroSubtitle")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-white mb-10 max-w-lg mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
              >
                {t("easyDesc")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link to="/detect">
                  <Button size="lg" variant="secondary" className="text-lg px-8 group shadow-xl hover:shadow-2xl transition-all duration-300">
                    {t("getStarted")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/abstract">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-primary transition-all duration-300"
                  >
                    {t("learnMore")}
                  </Button>
                </Link>
              </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("whyChoose")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("expertDesc")}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((f) => (
              <AnimatedSection key={f.titleKey} delay={f.delay}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-card p-8 rounded-xl border shadow-sm hover:shadow-lg transition-shadow text-center h-full"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <f.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t(f.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(f.descKey)}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with crop bg */}
      <section className="relative overflow-hidden py-28 z-10">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" style={{ objectPosition: "center 70%" }} />
          <div className="absolute inset-0 bg-[hsl(142,76%,22%)/0.88]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">{t("readyToProtect")}</h2>
            <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">{t("expertDesc")}</p>
            <Link to="/detect">
              <Button size="lg" variant="secondary" className="text-lg px-10 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                {t("startDetecting")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">© 2024 PeanutGuard</p>
        </div>
      </footer>
    </div>
  );
}
