
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, BarChart4 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 backdrop-blur-sm mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BarChart4 className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-semibold tracking-tight">
                KappaFinAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Advanced financial analysis powered by AI. Make better trading decisions with real-time data and insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Stocks
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/stock/nvda" className="text-muted-foreground hover:text-foreground transition-colors">NVIDIA (NVDA)</Link>
              </li>
              <li>
                <Link to="/stock/tsla" className="text-muted-foreground hover:text-foreground transition-colors">Tesla (TSLA)</Link>
              </li>
              <li>
                <Link to="/stock/goog" className="text-muted-foreground hover:text-foreground transition-colors">Alphabet (GOOG)</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Market Insights</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} KappaFinAI. All rights reserved.</p>
            <p className="text-xs">
              Not financial advice. For educational purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
