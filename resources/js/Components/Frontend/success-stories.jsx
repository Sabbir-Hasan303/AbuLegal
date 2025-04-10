"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, Lightbulb, Scale, Target, Trophy } from "lucide-react"

// Sample success stories data
const successStories = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
    category: "Immigration Law",
    categoryColor: "bg-blue-600",
    clientName: "Mr X & Mr Y.",
    date: "March 2023",
    image: "https://familyhubs.campaign.gov.uk/wp-content/uploads/sites/170/2023/12/6.8620_DfE_Family-Hubs-campaign_website_man-holding-a-child-looking-at-camera-900x600.jpg",
    outcome:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa corrupti dolore saepe, est laudantium.",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio debitis nesciunt doloribus itaque iste voluptatem vero sed earum fuga?",
    keyMetric: "8 months",
    keyMetricLabel: "Processing Time",
    keyMetricIcon: Clock,
  },
  {
    id: 2,
    title: "Father Secures Equal Custody After Difficult Separation",
    category: "Family Law",
    categoryColor: "bg-emerald-600",
    clientName: "David W.",
    date: "January 2023",
    image: "https://pa4law.com/wp-content/uploads/2019/10/father-custody-rights-1000x675.jpg",
    outcome:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa corrupti dolore saepe, est laudantium.",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio debitis nesciunt doloribus itaque iste voluptatem vero sed earum fuga?",
    keyMetric: "50/50",
    keyMetricLabel: "Custody Share",
    keyMetricIcon: Scale,
  },
  {
    id: 3,
    title: "Serious Charges Dismissed Before Trial",
    category: "Criminal Law",
    categoryColor: "bg-red-600",
    clientName: "Anonymous Client",
    date: "November 2022",
    image: "https://www.steindefense.com/wp-content/uploads/2025/02/SDF-Banner-Criminal-Case-Dismissed.jpg",
    outcome:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa corrupti dolore saepe, est laudantium.",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio debitis nesciunt doloribus itaque iste voluptatem vero sed earum fuga?",
    keyMetric: "100%",
    keyMetricLabel: "Case Dismissed",
    keyMetricIcon: CheckCircle2,
  },
  {
    id: 4,
    title: "Skilled Professional Secures Permanent Residency",
    category: "Immigration Law",
    categoryColor: "bg-blue-600",
    clientName: "Dr. Michael C.",
    date: "October 2022",
    image: "https://www.shutterstock.com/image-photo/concept-immigration-australia-virtual-button-260nw-1747153526.jpg",
    outcome:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa corrupti dolore saepe, est laudantium.",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio debitis nesciunt doloribus itaque iste voluptatem vero sed earum fuga?",
    keyMetric: "PR",
    keyMetricLabel: "Visa Type",
    keyMetricIcon: Trophy,
  },
  {
    id: 5,
    title: "Complex Property Settlement Resolved Without Trial",
    category: "Family Law",
    categoryColor: "bg-emerald-600",
    clientName: "Jennifer L.",
    date: "September 2022",
    image: "https://media.istockphoto.com/id/1208652540/photo/puzzle-house-is-divided-into-two-equal-parts-by-a-lawyer-in-a-divorce-process-protection-of.jpg?s=612x612&w=0&k=20&c=dMAUIpPngLtiSxMPU0ML63obeatMw-ztRRUrHHCaAGI=",
    outcome:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa corrupti dolore saepe, est laudantium.",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio debitis nesciunt doloribus itaque iste voluptatem vero sed earum fuga?",
    keyMetric: "$4.2M",
    keyMetricLabel: "Settlement",
    keyMetricIcon: Target,
  },
  {
    id: 6,
    title: "Reduced Sentence in High-Profile Case",
    category: "Criminal Law",
    categoryColor: "bg-red-600",
    clientName: "Protected Identity",
    date: "August 2022",
    image: "https://freedomhouse.org/sites/default/files/2021-09/FINAL_FOTN_2021_Cover_Illustration.jpg",
    outcome:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa corrupti dolore saepe, est laudantium.",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio debitis nesciunt doloribus itaque iste voluptatem vero sed earum fuga?",
    keyMetric: "65%",
    keyMetricLabel: "Reduction",
    keyMetricIcon: Lightbulb,
  },
]

function SuccessStoriesSection() {
  const [selectedStory, setSelectedStory] = useState(successStories[0])
  const [visibleStories, setVisibleStories] = useState(4) // For mobile view "Load More" functionality
  const timelineRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleStoryClick = (story) => {
    if (isAnimating || story.id === selectedStory.id) return

    setIsAnimating(true)
    setSelectedStory(story)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const handleScroll = (direction) => {
    if (!timelineRef.current) return

    const scrollAmount = direction === "left" ? -320 : 320
    timelineRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const loadMoreStories = () => {
    setVisibleStories(successStories.length)
  }

  // Helper function to conditionally join class names
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <section id="success-stories" className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-64 h-64 bg-primary/5 rounded-full transform rotate-45"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-secondary/5 rounded-full"></div>
        <div className="absolute -bottom-48 left-1/3 w-80 h-80 bg-primary/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-4">Success Stories</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Real cases, real people, real results. Discover how we've helped our clients overcome legal challenges and
            achieve life-changing outcomes.
          </p>
        </div>

        {/* Featured Story */}
        <div className="mb-20 relative z-10">
          <div
            className={cn(
              "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-opacity duration-500",
              isAnimating ? "opacity-0" : "opacity-100",
            )}
          >
            {/* Image Side */}
            <div className="relative">
              <div className="absolute inset-0 border-2 border-secondary/20 rounded-xl transform translate-x-4 translate-y-4 -z-10"></div>
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <Badge className={cn("absolute top-4 left-4 z-10 text-white", selectedStory.categoryColor)}>
                  {selectedStory.category}
                </Badge>
                <Badge className="absolute top-4 right-4 z-10 bg-white text-primary hover:text-white">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {selectedStory.date}
                </Badge>
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <div>
                <Badge className={cn("mb-3 text-white hidden lg:inline-flex", selectedStory.categoryColor)}>
                  {selectedStory.category}
                </Badge>
                <h3 className="text-3xl font-bold text-primary font-serif mb-2">{selectedStory.title}</h3>
                <p className="text-xl text-secondary">{selectedStory.clientName}</p>
              </div>

              <div className="flex items-center justify-center bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                <div className="text-center">
                  <selectedStory.keyMetricIcon className="h-10 w-10 mx-auto mb-2 text-secondary" />
                  <span className="block text-3xl font-bold text-primary">{selectedStory.keyMetric}</span>
                  <span className="text-sm text-muted-foreground">{selectedStory.keyMetricLabel}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-2">The Outcome</h4>
                <p className="text-gray-700 dark:text-gray-300">{selectedStory.outcome}</p>
              </div>

              <div className="relative p-6 bg-white dark:bg-gray-700 rounded-xl border-l-4 border-secondary shadow-sm">
                <div className="absolute -top-2 -left-2 text-secondary opacity-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path d="M11.9997 14H8.99973C8.99973 15.93 10.0697 16 10.9997 16C11.9997 16 11.9997 17 11.9997 17C9.49973 17 6.99973 15.94 6.99973 14V10H11.9997V14ZM17.9997 14H14.9997C14.9997 15.93 16.0697 16 16.9997 16C17.9997 16 17.9997 17 17.9997 17C15.4997 17 12.9997 15.94 12.9997 14V10H17.9997V14Z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic relative z-10">{selectedStory.quote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Navigation (Desktop) */}
        <div className=" relative mb-8 z-10">
          <div className="flex justify-end mb-2">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScroll("left")}
                className="h-8 w-8 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScroll("right")}
                className="h-8 w-8 rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>

          <div
            ref={timelineRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-4">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => handleStoryClick(story)}
                  className={cn(
                    "flex-shrink-0 w-72 overflow-hidden rounded-xl shadow-sm cursor-pointer transition-all duration-300",
                    selectedStory.id === story.id
                      ? "border-2 border-secondary transform -translate-y-1"
                      : "border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md",
                  )}
                >
                  <div className="relative h-40">
                    <Badge className={cn("absolute top-2 left-2 z-10 text-white", story.categoryColor)}>
                      {story.category}
                    </Badge>
                    <img
                      src={story.image}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-700">
                    <h4 className="font-medium line-clamp-1 mb-1">{story.title}</h4>
                    <p className="text-sm text-muted-foreground">{story.clientName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Grid View */}
        {/* <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {successStories.slice(0, visibleStories).map((story) => (
            <Card
              key={story.id}
              onClick={() => handleStoryClick(story)}
              className={cn(
                "overflow-hidden cursor-pointer transition-all duration-300",
                selectedStory.id === story.id ? "border-2 border-secondary" : "hover:shadow-md",
              )}
            >
              <div className="relative h-40">
                <Badge className={cn("absolute top-2 left-2 z-10 text-white", story.categoryColor)}>
                  {story.category}
                </Badge>
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium line-clamp-2 mb-1">{story.title}</h4>
                <p className="text-sm text-muted-foreground">{story.clientName}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Load More Button (Mobile) */}
        {visibleStories < successStories.length && (
          <div className="md:hidden text-center mb-8">
            <Button variant="outline" onClick={loadMoreStories}>
              Load More Stories
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <h3 className="text-2xl font-bold mb-4 font-serif">Your Success Story Could Be Next</h3>
          <p className="text-muted-foreground mb-6">
            Contact our team today to discuss your legal needs and discover how we can help you achieve a positive
            outcome.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SuccessStoriesSection