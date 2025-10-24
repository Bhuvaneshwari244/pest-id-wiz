import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Cpu, TrendingUp, Users, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary-foreground mb-4">
              Enhanced Pest Management
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              in Peanut Farming Using CNN
            </p>
            <p className="text-lg text-primary-foreground/80 mb-12 max-w-3xl mx-auto">
              Revolutionary AI-powered pest detection system specifically designed for peanut crops. Identify 
              threats early, protect your harvest, and maximize agricultural productivity.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/detect">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Detection →
                </Button>
              </Link>
              <Link to="/abstract">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Learn More
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
            <h2 className="text-4xl font-bold mb-4">Why Choose PeanutGuard AI?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our cutting-edge CNN technology provides farmers with the most accurate and 
              efficient pest detection solution available today.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Protection</h3>
              <p className="text-muted-foreground">
                AI-powered pest detection with comprehensive analysis of both visible 
                insects and damage symptoms.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">CNN Technology</h3>
              <p className="text-muted-foreground">
                Deep learning models trained on thousands of peanut crop images for accurate pest 
                identification.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
              <p className="text-muted-foreground">
                Monitor pest trends and track detection history to make informed agricultural 
                decisions.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Support</h3>
              <p className="text-muted-foreground">
                Agricultural specialists available with detailed recommendations for integrated 
                pest management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Ready to Protect Your Peanut Crops?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Start using our AI-powered detection system today and join thousands of farmers 
              protecting their harvest with cutting-edge technology.
            </p>
            <Link to="/detect">
              <Button size="lg" variant="secondary" className="text-lg px-10">
                Get Started Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">
            © 2024 PeanutGuard AI. Empowering farmers with advanced pest detection technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
