import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="inline-block mb-4">
              <img
                src="/images/logo/logo.png"
                alt="Abu Legal Logo"
                className="h-14"
              />
            </a>
            <p className="text-primary-foreground/80 mb-4">
              A premier law firm providing exceptional legal services across Australia, specializing in immigration,
              family, and criminal law.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Practice Areas</h3>
            <ul className="space-y-2">
              <li>
                <a href="#migration" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Migration Law
                </a>
              </li>
              <li>
                <a href="#family" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Family Law
                </a>
              </li>
              <li>
                <a href="#criminal" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Criminal Law
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for legal updates, news, and insights.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-primary-foreground/50 cursor-not-allowed opacity-50"
                disabled
              />
              <Button
                type="submit"
                className="bg-secondary/50 hover:bg-secondary/50 text-secondary-foreground cursor-not-allowed"
                disabled
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/50 mt-2">Newsletter subscription currently disabled</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Abu Legal. All rights reserved.
          </p>
          {/* <div className="flex space-x-4 text-sm text-primary-foreground/70">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}