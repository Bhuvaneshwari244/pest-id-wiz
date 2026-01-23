import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Cpu, TrendingUp, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary-foreground mb-4">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg text-primary-foreground/80 mb-12 max-w-3xl mx-auto">
              {t('easyDesc')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/detect">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  {t('getStarted')}
                </Button>
              </Link>
              <Link to="/abstract">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('whyChoose')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('expertDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('accurateDetection')}</h3>
              <p className="text-muted-foreground">
                {t('accurateDesc')}
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('instantResults')}</h3>
              <p className="text-muted-foreground">
                {t('instantDesc')}
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('expertGuidance')}</h3>
              <p className="text-muted-foreground">
                {t('expertDesc')}
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('easyToUse')}</h3>
              <p className="text-muted-foreground">
                {t('easyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              {t('readyToProtect')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('expertDesc')}
            </p>
            <Link to="/detect">
                <Button size="lg" variant="secondary" className="text-lg px-10">
                  {t('startDetecting')}
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">
            © 2024 PeanutGuard
          </p>
        </div>
      </footer>
    </div>
  );
}
