"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminLoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@vastrabyvarun.com" && password === "VastraAdmin@2026") {
      try {
        localStorage.setItem("vastra_admin_auth", "true");
      } catch {}
      toast("Authentication Successful", "Welcome to Vastra Executive Suite.", "success");
      window.location.href = "/admin/dashboard";
    } else {
      toast("Invalid Credentials", "Please enter valid administrator email and password.", "error");
    }
  };

  return (
    <div className="py-20 bg-ivory min-h-screen flex items-center">
      <Container className="max-w-md">
        <div className="border border-gold-400/30 bg-ivory-warm p-8 shadow-luxury space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-gold-400/20 text-gold-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6 text-gold-600" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-obsidian uppercase">
              Atelier Admin Portal
            </h1>
            <p className="text-xs text-obsidian/60">
              Enter your executive credentials to access product catalog, orders, and store settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-obsidian block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="admin@vastrabyvarun.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-xs"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian/40" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-obsidian block mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-xs"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian/40" />
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-2">
              Sign In to Admin Portal
            </Button>
          </form>

          <div className="border-t border-obsidian/10 pt-4 text-center text-[11px] text-obsidian/60 bg-gold-400/5 p-3">
            <strong className="block text-gold-700">DEFAULT CREDENTIALS:</strong>
            <span>Email: <code>admin@vastrabyvarun.com</code></span><br />
            <span>Password: <code>VastraAdmin@2026</code></span>
          </div>
        </div>
      </Container>
    </div>
  );
}
