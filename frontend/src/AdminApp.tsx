import React, { useState } from "react";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Lock } from "lucide-react";

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin passcode: "digma2025"
    if (passcode === "digma2025") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPasscode("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-slate-900 mb-2">DigMa Admin</h1>
              <p className="text-slate-600">Enter admin passcode to continue</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-4"
              noValidate
            >
              <input
                type="text"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${
                  error ? "border-red-500" : "border-slate-300"
                }`}
                autoComplete="off"
              />
              {error && (
                <p className="text-red-600 text-sm">
                  Incorrect passcode. Please try again.
                </p>
              )}
              <Button type="submit" className="w-full" disabled={!passcode}>
                Access Dashboard
              </Button>
            </form>
            <p className="text-xs text-slate-500 text-center">
              Demo passcode: digma2025
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
// ...copy from sample/src/AdminApp.tsx...
