import { Link, useLocation } from "react-router-dom";
import { Leaf, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { Button } from "./ui/button";

export default function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { path: "/", label: t('home') },
    { path: "/abstract", label: t('abstract') },
    { path: "/detect", label: t('pestDetection') },
    { path: "/technical", label: t('technicalDetails') },
  ];

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PeanutGuard AI</span>
          </Link>
          
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSelector />
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
