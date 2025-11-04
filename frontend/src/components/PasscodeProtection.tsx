import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AdminDashboard } from "./admin/AdminDashboard";

const CORRECT_PASSCODE = "70941281";
const ADMIN_PASSCODE = "digma2025";
const STORAGE_KEY = "digma_passcode_verified";
const ADMIN_STORAGE_KEY = "digma_is_admin";

export function PasscodeProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [passcode, setPasscode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    // Check if passcode was previously verified
    const verified = sessionStorage.getItem(STORAGE_KEY);
    const adminStatus = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (verified === "true") {
      setIsVerified(true);
      if (adminStatus === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted passcode:", passcode);
    console.log("Checking against ADMIN_PASSCODE:", ADMIN_PASSCODE);
    console.log("Checking against CORRECT_PASSCODE:", CORRECT_PASSCODE);

    if (passcode === CORRECT_PASSCODE) {
      console.log("Regular user login");
      setIsVerified(true);
      setIsAdmin(false);
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "false");
      setError("");
    } else if (passcode === ADMIN_PASSCODE) {
      console.log("Admin login detected!");
      setIsVerified(true);
      setIsAdmin(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setError("");
    } else {
      console.log("Invalid passcode");
      setError("Incorrect passcode. Please try again.");
      setPasscode("");
    }
  };

  const handleLogoClick = () => {
    setLogoClicks(logoClicks + 1);
    if (logoClicks >= 5) {
      setIsAdmin(true);
      setIsVerified(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setError("");
    }
  };

  if (isVerified && isAdmin) {
    console.log("Rendering Admin Dashboard");
    return (
      <AdminDashboard
        onLogout={() => {
          setIsVerified(false);
          setIsAdmin(false);
          sessionStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(ADMIN_STORAGE_KEY);
        }}
      />
    );
  }

  if (isVerified) {
    console.log("Rendering regular app");
    return <>{children}</>;
  }

  console.log(
    "Rendering login screen, isVerified:",
    isVerified,
    "isAdmin:",
    isAdmin,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo/Header */}
          <div className="text-center space-y-2">
            <div
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
              onClick={handleLogoClick}
            >
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-slate-900">DigMa Prototype</h1>
            <p className="text-slate-600">Enter passcode to access</p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                autoComplete="off"
                data-slot="input"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-center text-lg tracking-widest"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={!passcode}>
              Access Prototype
            </Button>
          </form>

          {/* Footer */}
          <p className="text-xs text-slate-500 text-center">
            This is a protected prototype for authorized users only.
          </p>
        </div>
      </div>
    </div>
  );
}
