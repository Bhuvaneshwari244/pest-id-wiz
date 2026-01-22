import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, Search, FileText, CheckCircle, Play } from "lucide-react";
import demoVideo from "@/assets/demo-detection-workflow.mp4";

export default function Abstract() {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Upload,
      titleKey: 'stepUploadTitle',
      descKey: 'stepUploadDesc'
    },
    {
      icon: Search,
      titleKey: 'stepAnalyzeTitle',
      descKey: 'stepAnalyzeDesc'
    },
    {
      icon: FileText,
      titleKey: 'stepResultsTitle',
      descKey: 'stepResultsDesc'
    },
    {
      icon: CheckCircle,
      titleKey: 'stepActionTitle',
      descKey: 'stepActionDesc'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">{t('abstractTitle')}</h1>
        
        <Card className="p-8 max-w-4xl mx-auto mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('abstractContent')}
          </p>
        </Card>

        {/* Demo Video Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Play className="w-8 h-8 text-primary" />
            {t('demoVideoTitle')}
          </h2>
          <Card className="overflow-hidden">
            <video 
              src={demoVideo}
              controls
              className="w-full aspect-video"
              poster=""
            >
              Your browser does not support the video tag.
            </video>
          </Card>
          <p className="text-center text-muted-foreground mt-4">{t('demoVideoDesc')}</p>
        </div>

        {/* How to Use Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{t('howToUseTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                  {index + 1}
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t(step.titleKey)}</h3>
                    <p className="text-muted-foreground">{t(step.descKey)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Tips Section */}
          <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              💡 {t('tipsTitle')}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t('tip1')}</li>
              <li>• {t('tip2')}</li>
              <li>• {t('tip3')}</li>
              <li>• {t('tip4')}</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
