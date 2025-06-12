
import React from 'react';
import { Button } from './ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
              alt="StartupGPT Logo" 
              className="h-12 mb-4 invert"
            />
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Your AI legal partner for Nigerian startup success. Navigate legal complexities with confidence.
            </p>
            <div className="space-y-1 text-sm">
              <p>📧 support@startupgpt.ng</p>
              <p>📞 +234 800 0000 GPT</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                CAC Portal
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                FIRS Online
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                SEC Nigeria
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Legal Resources
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <div className="space-y-2">
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Company Registration
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Document Generation
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Legal Consultation
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Compliance Tracking
              </Button>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <div className="space-y-2">
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Terms of Service
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                Disclaimer
              </Button>
              <Button variant="link" className="text-secondary-foreground/80 hover:text-secondary-foreground p-0 h-auto">
                About Us
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary-foreground/60">
              © 2024 StartupGPT. All rights reserved.
            </p>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium">
                ⚠️ AI guidance only - consult human lawyer for complex matters
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
