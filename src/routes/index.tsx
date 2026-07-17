import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  CalendarClock,
  ClipboardList,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Users,
  Clock,
  Star,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import brandBoard from "@/assets/kp-brand-board.png.asset.json";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    title: "Smart Email Generator",
    desc: "Craft polished client emails, confirmations, and supplier notes in seconds.",
    icon: Mail,
  },
  {
    to: "/planner",
    title: "Appointment & Task Planner",
    desc: "Prioritized daily and weekly schedules for your salon workflow.",
    icon: CalendarClock,
  },
  {
    to: "/consultation",
    title: "Consultation Notes Summarizer",
    desc: "Turn long client notes into structured skincare summaries.",
    icon: ClipboardList,
  },
  {
    to: "/research",
    title: "Skincare Research Assistant",
    desc: "Deep-dive briefs on ingredients, treatments, and trends.",
    icon: Sparkles,
  },
  {
    to: "/chat",
    title: "AI Beauty Chat Assistant",
    desc: "A friendly expert to answer routines, prep, and business questions.",
    icon: MessageCircle,
  },
] as const;

const STATS = [
  { label: "Time saved / week", value: "8.4h", icon: Clock, trend: "+12%" },
  { label: "Client emails sent", value: "126", icon: Mail, trend: "+24%" },
  { label: "Active clients", value: "58", icon: Users, trend: "+6%" },
  { label: "Avg. review", value: "4.9", icon: Star, trend: "+0.2" },
] as const;

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="glass-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Welcome back, Kiesha</p>
        <h1 className="font-display text-4xl sm:text-5xl mt-3">Your beauty business, refined by AI.</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          A luxurious productivity studio for KP SKIN — draft emails, plan appointments, summarize
          consultations, and research skincare in one soft, elegant workspace.
        </p>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, trend }) => (
          <div key={label} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="font-display text-3xl mt-2">{value}</p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {trend}
            </p>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl">AI Tools</h2>
          <span className="text-xs text-muted-foreground">Tap a card to begin</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ to, title, desc, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300 hover:glow"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
              <span className="text-xs text-primary mt-4 inline-block">Open tool →</span>
            </Link>
          ))}
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}

export { PageHeader };
