import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Abstract() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">{t('abstractTitle')}</h1>
        
        <Card className="p-8 max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('abstractContent')}
          </p>
        </Card>
      </div>
    </div>
  );
}
