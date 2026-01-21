import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Technical() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t('home')}
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-8">{t('technicalTitle')}</h1>

        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-primary" />
            {t('yoloModel')}
          </h2>
          <p className="text-muted-foreground mb-4">{t('yoloDesc')}</p>
        </Card>


        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            {t('cloudInfra')}
          </h2>
          <p className="text-muted-foreground">{t('cloudDesc')}</p>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">{t('technologyStack')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('yoloModel')}</p>
            <p>{t('cloudInfra')}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
