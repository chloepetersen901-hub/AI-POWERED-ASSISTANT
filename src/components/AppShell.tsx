import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  CalendarClock,
  ClipboardList,
  Sparkles,
  MessageCircle,
  Info,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/studio", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/planner", label: "Appointment & Task Planner", icon: CalendarClock },
  { to: "/consultation", label: "Consultation Notes Summarizer", icon: ClipboardList },
  { to: "/research", label: "AI Skincare Research Assistant", icon: Sparkles },
  { to: "/chat", label: "AI Beauty Chat Assistant", icon: MessageCircle },
  { to: "/about", label: "About", icon: Info },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("kp-theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("kp-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { dark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Public pages render without the private studio sidebar
  if (pathname === "/") return <>{children}</>;


  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 shrink-0 bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <img src={logo} alt="KP SKIN BY KIESHA" className="h-11 w-11 rounded-full glow" />
          <div className="leading-tight">
            <p className="font-display text-lg text-sidebar-foreground">KP SKIN</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">by Kiesha · AI</p>
          </div>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-5rem)]">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary/90 text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 flex items-center gap-3 px-4 lg:px-8 bg-background/70 backdrop-blur-xl border-b border-border">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-3">
            <img src={logo} alt="KP SKIN BY KIESHA" className="h-9 w-9 rounded-full lg:hidden" />
            <div>
              <p className="font-display text-base sm:text-lg">KP SKIN BY KIESHA</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">
                AI Beauty Assistant
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
