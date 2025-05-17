import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react"
import { useForm } from "@inertiajs/react"
import { toast } from "react-hot-toast"
export default function Footer() {

  // useForm
  const { post, processing, errors, data, setData } = useForm({
    email: ''
  })

  const handleSubscribe = () => {
    post(route('newsletter.store'), {
      onSuccess: () => {
        toast.success('You have successfully subscribed to our newsletter')
        setData('email', '')
      },
      onError: (errors) => {
        if (errors.error) {
          toast.error(errors.error)
        } else {
          toast.error('Something went wrong')
        }
      }
    })
  }

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
              A premier law firm providing exceptional legal services across Australia, specialising in immigration,
              family, and criminal law.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/people/ABU-Legal/100094264995789/" target="_blank" rel="noopener noreferrer">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
                >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                </Button>
              </a>
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
              <a href="https://www.linkedin.com/in/abu-siddque-663b918a/?originalSubdomain=au" target="_blank" rel="noopener noreferrer">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-white hover:bg-primary-foreground/10"
                >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
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
                <a href="/about" className="text-primary-foreground/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">
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
              <li>
                <a href="#commercial-litigation" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Commercial Litigation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4">Subscribe to our newsletter for legal updates, news, and insights.</p>

            <div className="flex space-x-2">
              <div>
                <Input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  placeholder="Your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-primary-foreground/50"
                  error={errors.email}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-secondary/90 hover:bg-secondary/90 text-secondary-foreground"
                onClick={handleSubscribe}
                disabled={processing}
              >
                {processing ? 'Subscribing...' : ''}
                <ArrowRight className="h-4 w-4" />
                {/* <span className="sr-only">Subscribe</span> */}
              </Button>
            </div>
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
