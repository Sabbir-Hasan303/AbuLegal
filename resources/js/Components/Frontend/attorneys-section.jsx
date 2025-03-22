"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const attorneys = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Immigration Law Specialist",
    image: "https://anthonyostlund.com/wp-content/uploads/2023/04/Ryan-Downs-for-Web.jpg",
    bio: "With over 15 years of experience in immigration law, Sarah has helped hundreds of clients successfully navigate Australia's complex immigration system.",
    specialties: ["Visa Applications", "Appeals", "Citizenship"],
    social: {
      email: "sarah@abulegal.com.au",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Law Attorney",
    image: "https://justatic.com/profile-images/1667191-1643989786-s.jpeg",
    bio: "Michael specializes in family law matters including divorce, child custody, and property settlements, providing compassionate guidance during difficult times.",
    specialties: ["Divorce", "Child Custody", "Property Settlement"],
    social: {
      email: "michael@abulegal.com.au",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    id: 3,
    name: "David Williams",
    role: "Criminal Defense Lawyer",
    image: "https://www.dglawyers.com/wp-content/uploads/2019/09/attorney-mark-s-tomlinson-2020.jpg",
    bio: "David is a seasoned criminal defense attorney with a strong track record of successful case outcomes and a deep understanding of the Australian legal system.",
    specialties: ["Criminal Defense", "Traffic Offenses", "Appeals"],
    social: {
      email: "david@abulegal.com.au",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Amina Patel",
    role: "Managing Partner",
    image: "https://www.jw.com/wp-content/uploads/2021/12/Paisley-Park-Headshot-NEW.jpg",
    bio: "As the founding partner of Abu Legal, Amina oversees all practice areas and brings over 20 years of legal experience to the firm.",
    specialties: ["Strategic Leadership", "Complex Cases", "International Law"],
    social: {
      email: "amina@abulegal.com.au",
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Property Law Specialist",
    image: "https://www.coepiolegal.com/wp-content/uploads/2023/11/16294ae7-7f9c-4c7a-aec5-05d1a5dd3f3e.png",
    bio: "James specializes in property law and real estate transactions, helping clients navigate complex property matters with expertise and attention to detail.",
    specialties: ["Property Transactions", "Leasing", "Conveyancing"],
    social: {
      email: "james@abulegal.com.au",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 6,
    name: "Emily Zhang",
    role: "Business Law Attorney",
    image: "https://sorensonlaw.net/wp-content/uploads/2022/10/20220810_SorensonLaw_N.png.webp",
    bio: "Emily provides strategic legal advice to businesses of all sizes, from startups to established corporations, with a focus on commercial contracts and compliance.",
    specialties: ["Business Formation", "Contracts", "Compliance"],
    social: {
      email: "emily@abulegal.com.au",
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
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
        className="rounded-full bg-white/80 text-primary backdrop-blur-sm shadow-md hover:bg-secondary hover:text-white transition-all duration-300 border-none h-10 w-10"
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
        className="rounded-full bg-white/80 text-primary backdrop-blur-sm shadow-md hover:bg-secondary hover:text-white transition-all duration-300 border-none h-10 w-10"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}

export default function AttorneysSection() {
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1280, // Desktop
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Laptop
        settings: {
          slidesToShow: 3,
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
    <section id="attorneys" ref={sectionRef} className="attorneys-section section-padding overflow-hidden relative bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="section-title">Our Expert Attorneys</h2>
          <p className="section-subtitle">Meet our team of experienced legal professionals dedicated to your success</p>
        </div>

        <div
          className={`mt-16 px-8 transition-all duration-1000 delay-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Slider ref={sliderRef} {...settings} className="attorneys-carousel">
            {attorneys.map((attorney, index) => (
              <div key={attorney.id} className="px-3 h-full">
                <div
                  className={`attorney-card-wrapper transition-all duration-500 transform ${activeSlide === index ? "scale-100" : "scale-95"}`}
                >
                  <div className="attorney-card-inner bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                    <div className="relative overflow-hidden attorney-image-container">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      <img
                        src={attorney.image || "/placeholder.svg"}
                        alt={attorney.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-white text-xl font-bold">{attorney.name}</h3>
                        <p className="text-secondary font-medium text-sm">{attorney.role}</p>
                      </div>
                    </div>

                    <div className="p-5 flex-grow">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Specialties</h4>
                          <div className="flex flex-wrap gap-2">
                            {attorney.specialties.map((specialty, i) => (
                              <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                      <div className="flex space-x-1">
                        {attorney.social.email && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-gray-500 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Button>
                        )}
                        {attorney.social.linkedin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-gray-500 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                          </Button>
                        )}
                        {attorney.social.twitter && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-gray-500 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </Button>
                        )}
                        {attorney.social.facebook && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-gray-500 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Facebook className="h-4 w-4" />
                            <span className="sr-only">Facebook</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-32 h-32 bg-secondary/10 rounded-full"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-primary/5 rounded-full"></div>
    </section>
  )
}