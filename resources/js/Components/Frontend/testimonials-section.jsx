import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    location: "Sydney",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Abu Legal helped me with my partner visa application. Their attention to detail and knowledge of immigration law was impressive. Thanks to their expertise, my visa was approved without any issues.",
    service: "Immigration Law",
  },
  {
    id: 2,
    name: "Emma Thompson",
    location: "Melbourne",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Going through a divorce is never easy, but the team at Abu Legal made the process as smooth as possible. They were compassionate, professional, and fought for my rights every step of the way.",
    service: "Family Law",
  },
  {
    id: 3,
    name: "Robert Chen",
    location: "Brisbane",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 5,
    text: "When I was facing criminal charges, I thought my future was over. Abu Legal not only provided excellent legal representation but also emotional support during this difficult time. The charges were reduced significantly.",
    service: "Criminal Law",
  },
  {
    id: 4,
    name: "Sophia Patel",
    location: "Perth",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    text: "I needed help with a complex business visa application. The team at Abu Legal guided me through every step, explaining the process clearly and preparing a strong application. I'm now successfully running my business in Australia.",
    service: "Immigration Law",
  },
  {
    id: 5,
    name: "David Johnson",
    location: "Adelaide",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    text: "Abu Legal helped me secure custody of my children after a difficult separation. They were always available to answer my questions and provided sound advice throughout the process. I'm grateful for their support.",
    service: "Family Law",
  },
  {
    id: 6,
    name: "Linda Williams",
    location: "Canberra",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5,
    text: "After being wrongfully accused, I was terrified about my future. Abu Legal fought tirelessly for me, and all charges were eventually dropped. Their expertise in criminal law is unmatched.",
    service: "Criminal Law",
  },
]

// Custom arrow components for the carousel
const PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className="slick-arrow slick-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{ ...style, left: "-20px" }}
      onClick={onClick}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/90 text-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 border-none h-10 w-10"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>
    </div>
  )
}

const NextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className="slick-arrow slick-next absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{ ...style, right: "4px" }}
      onClick={onClick}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/90 text-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 border-none h-10 w-10"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const sliderRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(sectionRef.current)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1280, // Desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Laptop
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-section section-padding overflow-hidden relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent z-0"></div>

      {/* Large quote mark decorative element */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-gray-100 dark:text-gray-800 z-0">
        <Quote className="h-64 w-64 opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">Hear what our clients have to say about their experience with Abu Legal</p>
        </div>

        <div
          className={`mt-16 px-8 transition-all duration-1000 delay-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Slider ref={sliderRef} {...settings} className="testimonials-carousel">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="px-4 h-full">
                <div
                  className={`testimonial-card-wrapper transition-all duration-500 transform ${activeSlide === index ? "scale-100" : "scale-95 opacity-80"}`}
                >
                  <div className="testimonial-card-inner bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full z-0"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/5 rounded-full z-0"></div>

                    <div className="p-8 flex-grow relative z-10">
                      {/* Quote icon */}
                      <div className="absolute top-4 right-4 text-secondary/20">
                        <Quote className="h-10 w-10 transform rotate-180" />
                      </div>

                      {/* Rating stars */}
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < testimonial.rating ? "text-secondary fill-secondary" : "text-gray-300",
                            )}
                          />
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic relative">"{testimonial.text}"</p>

                      {/* Client info */}
                      <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-secondary">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                          <div className="flex items-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                            {/*<span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                            <p className="text-sm text-secondary font-medium">{testimonial.service}</p>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div
          className={`mt-12 text-center transition-all duration-1000 delay-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our growing list of satisfied clients who have experienced our exceptional legal services. We're
            committed to providing the highest level of legal representation for every client.
          </p>
          {/*<Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-base">
            Read More Success Stories
          </Button>*/}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-primary/5 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full"></div>
    </section>
  )
}