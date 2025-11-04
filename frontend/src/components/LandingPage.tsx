import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  TrendingUp,
  MessageCircle,
  Calendar,
  Target,
  Shield,
  CheckCircle,
  Play,
  Star,
  Globe,
  BarChart3,
  Rocket,
  Brain,
  Wand2,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LANDING_PREVIEW_TIERS, formatPrice } from "./pricing-config";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Campaign Generator",
      description:
        "Generates contextual campaigns based on weather, events, and business patterns",
      demo: "Creates 'Rainy Day Coffee Special' when it detects rain forecast",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Budget Optimiser",
      description:
        "Automatically reallocates spend to winning campaigns and pauses underperformers",
      demo: "Moved $15/day from poor-performing breakfast ads to winning lunch specials",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Cross-Platform Orchestration",
      description:
        "Coordinates Facebook, Instagram, Google Business Profile, and WhatsApp campaigns",
      demo: "Posts to Instagram → Google Business offer → WhatsApp follow-up sequence",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Attribution Intelligence",
      description:
        "Tracks customers from QR codes, WhatsApp chats, and social media to sales",
      demo: "Sarah saw Instagram post → scanned QR → WhatsApp enquiry → $45 cake order",
    },
  ];

  const businessTypes = [
    { name: "Pharmacies", emoji: "💊", growth: "+142%" },
    { name: "Lawyers", emoji: "⚖️", growth: "+186%" },
    { name: "Doctors", emoji: "🩺", growth: "+165%" },
    { name: "Pizza Shops", emoji: "🍕", growth: "+198%" },
    { name: "Nail Salons", emoji: "💅", growth: "+134%" },
    { name: "Beauty Services", emoji: "💄", growth: "+156%" },
    { name: "Restaurants", emoji: "🍽️", growth: "+178%" },
    { name: "Bakeries", emoji: "🥖", growth: "+127%" },
    { name: "Coffee Shops", emoji: "☕", growth: "+89%" },
    { name: "Barbershops", emoji: "💇", growth: "+145%" },
    { name: "Fitness Studios", emoji: "💪", growth: "+163%" },
    { name: "Pet Groomers", emoji: "🐕", growth: "+129%" },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      business: "The Village Bakery",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote:
        "DigMa increased our weekend footfall by 40% without me lifting a finger. It's like having a marketing team that never sleeps.",
      result: "40% more weekend customers",
    },
    {
      name: "Marcus Thompson",
      business: "Thompson Plumbing",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote:
        "I was sceptical about AI marketing, but DigMa's WhatsApp campaigns brought in 12 new clients this month. Game changer.",
      result: "12 new clients via WhatsApp",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100"></div>
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-slate-900 font-medium">DigMa</span>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                AI Autopilot
              </Badge>
            </div>
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Now Available Globally • Join 2,000+ Early Adopters</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl text-slate-900 mb-6 leading-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI Marketing
              </span>
              <br />
              Autopilot for Local Business
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              DigMa plans, creates, schedules, and optimises your Facebook,
              Instagram, Google Business, and WhatsApp campaigns whilst you
              focus on running your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg"
                onClick={onGetStarted}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg rounded-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-primary rounded-full border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span>2,000+ businesses growing</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2">4.9/5 from early users</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features Showcase */}
        <section className="px-4 md:px-6 py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                <Wand2 className="w-3 h-3 mr-1" />
                Artificial Intelligence
              </Badge>
              <h2 className="text-3xl md:text-5xl text-slate-900 mb-4">
                AI That Actually <span className="text-primary">Works</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Not just another chatbot. DigMa's AI understands your business
                context and customer behaviour patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {aiFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 mb-3">
                          {feature.description}
                        </p>
                        {hoveredFeature === index && (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-slate-700 text-sm">
                            <span className="text-primary font-medium">
                              Example:
                            </span>{" "}
                            {feature.demo}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Types - Horizontal Carousel */}
        <section className="py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
              Built for Local Businesses
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From corner cafés to professional services, DigMa helps local
              businesses thrive in the digital age.
            </p>
          </div>

          {/* Auto-scrolling carousel */}
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <div className="flex animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
              {/* First set of cards */}
              {businessTypes.map((business, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-80 mx-4">
                  <Card className="group relative bg-white border-slate-200 hover:border-primary/30 hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden h-64">
                    {/* Enhanced gradient backgrounds */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent"></div>

                    {/* Floating decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-300/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-emerald-200/30 to-blue-200/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000 delay-200"></div>

                    <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between">
                      {/* Icon section */}
                      <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                          {/* Main icon container */}
                          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:from-primary/10 group-hover:via-blue-50 group-hover:to-indigo-50 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                            <span className="text-3xl filter group-hover:drop-shadow-lg transition-all duration-500 group-hover:scale-110">
                              {business.emoji}
                            </span>
                          </div>

                          {/* Animated pulse rings */}
                          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-3xl border-2 border-primary/30 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000"></div>
                          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-3xl border border-blue-400/20 opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-1000 delay-300"></div>
                        </div>

                        {/* Business name */}
                        <h4 className="text-xl text-slate-900 font-semibold mb-4 group-hover:text-primary transition-colors duration-500 text-center">
                          {business.name}
                        </h4>
                      </div>

                      {/* Bottom section */}
                      <div className="space-y-3">
                        {/* Enhanced growth badge */}
                        <div className="flex justify-center">
                          <Badge className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 text-green-700 border-green-200/60 font-semibold px-4 py-2 shadow-sm group-hover:from-green-100 group-hover:via-emerald-100 group-hover:to-green-100 group-hover:shadow-lg group-hover:scale-105 transition-all duration-500">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {business.growth} Growth
                          </Badge>
                        </div>

                        {/* Success metrics */}
                        <div className="flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600 font-medium">
                            4.9/5 avg
                          </span>
                        </div>

                        {/* Animated success dots */}
                        <div className="flex justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Enhanced shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                  </Card>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {businessTypes.map((business, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-80 mx-4"
                >
                  <Card className="group relative bg-white border-slate-200 hover:border-primary/30 hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden h-64">
                    {/* Enhanced gradient backgrounds */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent"></div>

                    {/* Floating decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-300/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-emerald-200/30 to-blue-200/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000 delay-200"></div>

                    <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between">
                      {/* Icon section */}
                      <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                          {/* Main icon container */}
                          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:from-primary/10 group-hover:via-blue-50 group-hover:to-indigo-50 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                            <span className="text-3xl filter group-hover:drop-shadow-lg transition-all duration-500 group-hover:scale-110">
                              {business.emoji}
                            </span>
                          </div>

                          {/* Animated pulse rings */}
                          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-3xl border-2 border-primary/30 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000"></div>
                          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-3xl border border-blue-400/20 opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-1000 delay-300"></div>
                        </div>

                        {/* Business name */}
                        <h4 className="text-xl text-slate-900 font-semibold mb-4 group-hover:text-primary transition-colors duration-500 text-center">
                          {business.name}
                        </h4>
                      </div>

                      {/* Bottom section */}
                      <div className="space-y-3">
                        {/* Enhanced growth badge */}
                        <div className="flex justify-center">
                          <Badge className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 text-green-700 border-green-200/60 font-semibold px-4 py-2 shadow-sm group-hover:from-green-100 group-hover:via-emerald-100 group-hover:to-green-100 group-hover:shadow-lg group-hover:scale-105 transition-all duration-500">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {business.growth} Growth
                          </Badge>
                        </div>

                        {/* Success metrics */}
                        <div className="flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600 font-medium">
                            4.9/5 avg
                          </span>
                        </div>

                        {/* Animated success dots */}
                        <div className="flex justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Enhanced shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-8">
            <div className="text-sm text-slate-500 flex items-center justify-center space-x-2">
              <span>Hover to pause</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 md:px-6 py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
                Real Results from Real Businesses
              </h2>
              <p className="text-xl text-slate-600">
                Don't just take our word for it
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <ImageWithFallback
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-slate-900">{testimonial.name}</h4>
                        <p className="text-slate-500 text-sm">
                          {testimonial.business}
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-slate-700 mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {testimonial.result}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              UAE pricing. No hidden fees. You control your ad spend.
            </p>
            <p className="text-sm text-slate-500 mb-12">
              📍 Pricing optimized for the UAE market
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {LANDING_PREVIEW_TIERS.map((previewTier) => (
                <Card
                  key={previewTier.id}
                  className={`bg-white shadow-lg relative ${previewTier.popular ? "border-primary/20 shadow-xl" : "border-slate-200"}`}
                >
                  {previewTier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1 rounded-full shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {previewTier.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-50 opacity-50 rounded-lg"></div>
                  )}

                  <CardContent className="relative p-8 text-center">
                    <div
                      className={`mb-2 ${previewTier.popular ? "text-4xl" : "text-3xl"} text-slate-900`}
                    >
                      {formatPrice(previewTier.price)}
                    </div>
                    <p className="text-slate-600 mb-2">per month</p>
                    <p className="text-sm text-slate-500 mb-6">
                      {previewTier.description}
                    </p>

                    <ul className="space-y-3 text-left text-slate-700 mb-8">
                      {previewTier.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={previewTier.popular ? "default" : "outline"}
                      className={`w-full ${previewTier.popular ? "bg-primary hover:bg-blue-700 text-white" : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                      onClick={onGetStarted}
                    >
                      Start {previewTier.name} Plan
                    </Button>
                    <p className="text-xs text-slate-500 mt-3">
                      + Ad spend billed directly by platforms
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-primary rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl mb-4">
                Ready to 10x Your Local Marketing?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join 2,000+ UAE businesses already using DigMa's AI autopilot to
                grow their customer base while they sleep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-slate-100 px-8 py-4"
                  onClick={onGetStarted}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free 14-Day Trial
                </Button>
                <p className="text-xs text-blue-200">
                  No credit card required • Setup takes 60 seconds
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-medium">DigMa</span>
                </div>
                <p className="text-slate-400 text-sm">
                  AI-powered marketing autopilot for local businesses in the
                  UAE.
                </p>
              </div>

              <div>
                <h4 className="mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>How it works</li>
                  <li>Pricing</li>
                  <li>Use cases</li>
                  <li>ROI calculator</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Help center</li>
                  <li>Contact us</li>
                  <li>Book a demo</li>
                  <li>System status</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Privacy policy</li>
                  <li>Terms of service</li>
                  <li>Cookie policy</li>
                  <li>GDPR compliance</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 DigMa. All rights reserved.
              </p>
              <p className="text-slate-400 text-sm">
                🇦🇪 Made for UAE businesses
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
