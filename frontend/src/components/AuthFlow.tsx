import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Mail,
  Phone,
  CheckCircle,
  ArrowLeft,
  Bot,
  Sparkles,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { LandingPage } from "./LandingPage";

interface AuthFlowProps {
  onComplete: (userData: any) => void;
}

export function AuthFlow({ onComplete }: AuthFlowProps) {
  const [showLanding, setShowLanding] = useState(true);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  const canProceed = () => {
    // For sign-in, we don't need terms acceptance (they already accepted)
    if (authMode === "signin") return true;
    return acceptedTerms;
  };

  const handleEmailAuth = async () => {
    if (!canProceed()) {
      setShowValidation(true);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationSent(true);
      setIsLoading(false);
      // Simulate user clicking magic link
      setTimeout(() => {
        onComplete({ email, method: "email" });
      }, 2000);
    }, 1000);
  };

  const handlePhoneAuth = async () => {
    if (!canProceed()) {
      setShowValidation(true);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationSent(true);
      setIsLoading(false);
      // Simulate OTP verification
      setTimeout(() => {
        onComplete({ phone, method: "phone" });
      }, 2000);
    }, 1000);
  };

  const handleSocialAuth = (provider: string) => {
    if (!canProceed()) {
      setShowValidation(true);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onComplete({
        email: `demo@${provider}.com`,
        method: provider,
        name: "Demo User",
      });
    }, 1000);
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-slate-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-slate-900 mb-2">
                  Verification Sent!
                </h3>
                <p className="text-slate-600">
                  {activeTab === "email"
                    ? `Check your email (${email}) for the magic link`
                    : `We sent an OTP to ${phone}`}
                </p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <div className="animate-spin">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-sm">Authenticating automatically...</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Enhanced Hero */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-medium">DigMa</span>
                <Badge className="bg-primary/20 text-blue-200 border-primary/30">
                  AI Autopilot
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl mb-6 leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  AI Marketing
                </span>
                <br />
                Autopilot
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Join 2,000+ local businesses using AI to plan, create, schedule,
                and optimise their digital marketing across Facebook, Instagram,
                Google Business, and WhatsApp.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Setup in under 60 seconds
                  </p>
                  <p className="text-slate-400 text-sm">
                    Connect your accounts and you're ready to go
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Stay within your weekly budget cap
                  </p>
                  <p className="text-slate-400 text-sm">
                    AI never exceeds your spending limits
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    AI learns and optimises automatically
                  </p>
                  <p className="text-slate-400 text-sm">
                    Pauses losers, boosts winners, 24/7
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-blue-200 text-sm font-medium">
                  30-Day Free Trial
                </span>
              </div>
              <p className="text-slate-300 text-sm">
                No credit card required. Experience the full power of AI
                marketing automation.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-lg space-y-8">
            {/* Back button for mobile */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLanding(true)}
                className="text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6 lg:hidden">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl text-slate-800">DigMa</span>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  AI Autopilot
                </Badge>
              </div>

              <h2 className="text-4xl text-slate-800 mb-3">
                {authMode === "signup" ? "Welcome to DigMa" : "Welcome Back"}
              </h2>
              <p className="text-lg text-slate-600">
                {authMode === "signup"
                  ? "Start your AI marketing autopilot journey"
                  : "Sign in to your AI marketing autopilot"}
              </p>
            </div>

            <Card className="bg-white border-slate-200 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={authMode === "signup" ? "default" : "ghost"}
                      onClick={() => setAuthMode("signup")}
                      className="h-10 px-6 rounded-lg"
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant={authMode === "signin" ? "default" : "ghost"}
                      onClick={() => setAuthMode("signin")}
                      className="h-10 px-6 rounded-lg"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-800">
                  {authMode === "signup" ? "Get Started" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  {authMode === "signup"
                    ? "Choose your preferred sign-up method. No passwords required."
                    : "Sign in with the same method you used to register."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-slate-100 border-slate-200 h-12 p-1 rounded-xl">
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm rounded-lg h-10 text-base font-medium"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="phone"
                      className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm rounded-lg h-10 text-base font-medium"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-6 mt-8">
                    <div className="space-y-4">
                      <Label
                        htmlFor="email"
                        className="text-lg font-medium text-slate-800"
                      >
                        Email address
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@yourbusiness.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                          className="pl-12 h-16 text-lg border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl transition-all duration-200 bg-slate-50/50 hover:bg-white focus:bg-white"
                        />
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        We'll send you a secure link to sign in instantly
                      </p>
                    </div>

                    <Button
                      onClick={handleEmailAuth}
                      disabled={!email || isLoading || !canProceed()}
                      className="w-full h-16 text-lg font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white disabled:bg-slate-300 disabled:text-slate-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending magic link...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Sparkles className="w-5 h-5 mr-3" />
                          {authMode === "signup"
                            ? "Send magic link"
                            : "Sign in with Email"}
                        </div>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-6 mt-8">
                    <div className="space-y-4">
                      <Label
                        htmlFor="phone"
                        className="text-lg font-medium text-slate-800"
                      >
                        Phone number
                      </Label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isLoading}
                          className="pl-12 h-16 text-lg border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl transition-all duration-200 bg-slate-50/50 hover:bg-white focus:bg-white"
                        />
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        We'll text you a verification code
                      </p>
                    </div>

                    <Button
                      onClick={handlePhoneAuth}
                      disabled={!phone || isLoading || !canProceed()}
                      className="w-full h-16 text-lg font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white disabled:bg-slate-300 disabled:text-slate-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending OTP...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 mr-3" />
                          {authMode === "signup"
                            ? "Send OTP"
                            : "Sign in with Phone"}
                        </div>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* Terms and Privacy Checkbox - Only for Sign Up */}
                {authMode === "signup" && (
                  <div className="space-y-4 py-6 border-t border-slate-200">
                    {/* Global validation message */}
                    {!canProceed() && showValidation && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <p className="text-sm text-amber-800 text-center font-medium">
                          Please accept the Terms of Service and Privacy Policy
                          below to continue.
                        </p>
                      </div>
                    )}

                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => {
                          setAcceptedTerms(checked as boolean);
                          if (checked) setShowValidation(false);
                        }}
                        className="mt-1 w-5 h-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="terms"
                          className="text-base leading-relaxed text-slate-700 cursor-pointer"
                        >
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-primary hover:text-blue-700 underline font-medium"
                            onClick={(e) => e.preventDefault()}
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-primary hover:text-blue-700 underline font-medium"
                            onClick={(e) => e.preventDefault()}
                          >
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sign In Helper Text */}
                {authMode === "signin" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800 text-center">
                      💡 Use the same method (Email, Phone, Google, or Facebook)
                      you used when you first signed up.
                    </p>
                  </div>
                )}

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase font-medium">
                    <span className="bg-white px-4 text-slate-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialAuth("google")}
                    disabled={isLoading || !canProceed()}
                    className="h-14 text-base font-medium border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC04"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialAuth("facebook")}
                    disabled={isLoading || !canProceed()}
                    className="h-14 text-base font-medium border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                {/* Toggle between Sign Up and Sign In */}
                <div className="text-center pt-6 border-t border-slate-200">
                  <p className="text-slate-600">
                    {authMode === "signup" ? (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={() => setAuthMode("signin")}
                          className="text-primary hover:text-blue-700 font-medium underline"
                        >
                          Sign in here
                        </button>
                      </>
                    ) : (
                      <>
                        Don't have an account?{" "}
                        <button
                          onClick={() => setAuthMode("signup")}
                          className="text-primary hover:text-blue-700 font-medium underline"
                        >
                          Sign up for free
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
