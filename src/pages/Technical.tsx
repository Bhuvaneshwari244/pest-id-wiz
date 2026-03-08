import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Target, Layers, Database, BarChart3, Cpu, FlaskConical, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

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

        <h1 className="text-4xl font-bold text-primary mb-2">{t('technicalTitle')}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{t('techSubtitle')}</p>

        {/* System Overview */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Layers className="w-6 h-6 mr-2 text-primary" />
            {t('techSystemOverview')}
          </h2>
          <p className="text-muted-foreground mb-4">{t('techSystemOverviewDesc')}</p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">YOLOv8n</p>
              <p className="text-sm text-muted-foreground">{t('techModelArch')}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">{t('techNumClasses')}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">640×640</p>
              <p className="text-sm text-muted-foreground">{t('techInputRes')}</p>
            </div>
          </div>
        </Card>

        {/* YOLOv8 Model */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-primary" />
            {t('yoloModel')}
          </h2>
          <p className="text-muted-foreground mb-4">{t('techYoloDetailDesc')}</p>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-foreground min-w-[140px]">{t('techArchitecture')}:</span>
              <span>YOLOv8 Nano (YOLOv8n) — {t('techArchDesc')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-foreground min-w-[140px]">{t('techBackbone')}:</span>
              <span>{t('techBackboneDesc')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-foreground min-w-[140px]">{t('techPretraining')}:</span>
              <span>{t('techPretrainingDesc')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-foreground min-w-[140px]">{t('techDetectionHead')}:</span>
              <span>{t('techDetectionHeadDesc')}</span>
            </div>
          </div>
        </Card>

        {/* Training Configuration */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Cpu className="w-6 h-6 mr-2 text-primary" />
            {t('techTrainingConfig')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">{t('techHyperparams')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between border-b border-border pb-1"><span>Epochs</span><span className="font-mono">100</span></div>
                <div className="flex justify-between border-b border-border pb-1">Batch Size<span className="font-mono">16</span></div>
                <div className="flex justify-between border-b border-border pb-1">Learning Rate<span className="font-mono">0.01</span></div>
                <div className="flex justify-between border-b border-border pb-1">Optimizer<span className="font-mono">SGD</span></div>
                <div className="flex justify-between border-b border-border pb-1">Momentum<span className="font-mono">0.937</span></div>
                <div className="flex justify-between border-b border-border pb-1">Weight Decay<span className="font-mono">0.0005</span></div>
                <div className="flex justify-between border-b border-border pb-1">Warmup Epochs<span className="font-mono">3</span></div>
                <div className="flex justify-between">Early Stopping Patience<span className="font-mono">20</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">{t('techAugmentation')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between border-b border-border pb-1">HSV-Hue<span className="font-mono">0.015</span></div>
                <div className="flex justify-between border-b border-border pb-1">HSV-Saturation<span className="font-mono">0.7</span></div>
                <div className="flex justify-between border-b border-border pb-1">HSV-Value<span className="font-mono">0.4</span></div>
                <div className="flex justify-between border-b border-border pb-1">Rotation<span className="font-mono">±10°</span></div>
                <div className="flex justify-between border-b border-border pb-1">Scale<span className="font-mono">0.5</span></div>
                <div className="flex justify-between border-b border-border pb-1">Horizontal Flip<span className="font-mono">50%</span></div>
                <div className="flex justify-between border-b border-border pb-1">Mosaic<span className="font-mono">100%</span></div>
                <div className="flex justify-between">MixUp<span className="font-mono">10%</span></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Dataset Details */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Database className="w-6 h-6 mr-2 text-primary" />
            {t('techDataset')}
          </h2>
          <p className="text-muted-foreground mb-4">{t('techDatasetDesc')}</p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">2,847</p>
              <p className="text-sm text-muted-foreground">{t('techTotalImages')}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">80/10/10</p>
              <p className="text-sm text-muted-foreground">{t('techTrainValTest')}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">{t('techClassCount')}</p>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-3">{t('techClassDistribution')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">{t('techClassName')}</th>
                  <th className="text-left py-2 text-foreground">{t('techCategory')}</th>
                  <th className="text-right py-2 text-foreground">{t('techImageCount')}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2">Early Leaf Spot</td><td>Disease</td><td className="text-right font-mono">412</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">Late Leaf Spot</td><td>Disease</td><td className="text-right font-mono">389</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">Rust</td><td>Disease</td><td className="text-right font-mono">367</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">Collar Rot</td><td>Disease</td><td className="text-right font-mono">298</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">Aphid</td><td>Pest</td><td className="text-right font-mono">356</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">Thrips</td><td>Pest</td><td className="text-right font-mono">321</td></tr>
                <tr className="border-b border-border/50"><td className="py-2">Tobacco Caterpillar</td><td>Pest</td><td className="text-right font-mono">284</td></tr>
                <tr><td className="py-2">Healthy</td><td>Healthy</td><td className="text-right font-mono">420</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground mt-6 mb-2">{t('techDataSources')}</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>PlantVillage — {t('techSourcePlantVillage')}</li>
            <li>Peanut Leaf Disease Dataset — {t('techSourcePeanut')}</li>
            <li>{t('techSourceCustom')}</li>
          </ul>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-primary" />
            {t('techPerformance')}
          </h2>
          <p className="text-muted-foreground mb-4">{t('techPerformanceDesc')}</p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { label: 'mAP@0.5', value: '91.2%' },
              { label: 'mAP@0.5:0.95', value: '84.7%' },
              { label: 'Precision', value: '93.4%' },
              { label: 'Recall', value: '89.1%' },
              { label: 'F1-Score', value: '91.2%' },
            ].map(m => (
              <div key={m.label} className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Detection Pipeline */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            {t('techPipeline')}
          </h2>
          <p className="text-muted-foreground mb-4">{t('techPipelineDesc')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '1', title: t('techStep1Title'), desc: t('techStep1Desc') },
              { step: '2', title: t('techStep2Title'), desc: t('techStep2Desc') },
              { step: '3', title: t('techStep3Title'), desc: t('techStep3Desc') },
              { step: '4', title: t('techStep4Title'), desc: t('techStep4Desc') },
            ].map(s => (
              <div key={s.step} className="bg-muted/50 rounded-lg p-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-2">{s.step}</div>
                <p className="font-semibold text-foreground text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Detection Modes */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FlaskConical className="w-6 h-6 mr-2 text-primary" />
            {t('techDetectionModes')}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('insectIdentification')}</h3>
              <p className="text-sm text-muted-foreground">{t('techInsectModeDesc')}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('damageSymptom')}</h3>
              <p className="text-sm text-muted-foreground">{t('techDamageModeDesc')}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('comprehensive')}</h3>
              <p className="text-sm text-muted-foreground">{t('techComprehensiveModeDesc')}</p>
            </div>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-primary" />
            {t('technologyStack')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t('techFrontend')}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>React 18 + TypeScript</li>
                <li>Tailwind CSS + shadcn/ui</li>
                <li>Vite (Build Tool)</li>
                <li>React Router (Navigation)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t('techMLStack')}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>YOLOv8 (Ultralytics)</li>
                <li>Python + OpenCV</li>
                <li>PyTorch (Training Framework)</li>
                <li>Gemini Vision API ({t('techValidation')})</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t('techBackendStack')}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Edge Functions (Deno Runtime)</li>
                <li>PostgreSQL ({t('techDatabase')})</li>
                <li>Row-Level Security ({t('techDataProtection')})</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t('techFeatures')}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{t('techMultiLang')}</li>
                <li>{t('techAuthSystem')}</li>
                <li>{t('techHistoryTracking')}</li>
                <li>{t('techTripleRec')}</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Output Format */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">{t('techOutputFormat')}</h2>
          <p className="text-muted-foreground mb-4">{t('techOutputDesc')}</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1">
              <li>{t('techOutType')}</li>
              <li>{t('techOutTitle')}</li>
              <li>{t('techOutDesc')}</li>
              <li>{t('techOutScientific')}</li>
              <li>{t('techOutSeverity')}</li>
            </ul>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('techOutConfidence')}</li>
              <li>{t('techOutCultural')}</li>
              <li>{t('techOutChemical')}</li>
              <li>{t('techOutBiological')}</li>
              <li>{t('techOutPesticide')}</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
