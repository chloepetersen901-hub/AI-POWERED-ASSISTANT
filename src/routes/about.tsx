import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        icon={Info}
        title="About KP SKIN BY KIESHA"
        description="A luxury skincare brand — now paired with an AI productivity studio."
      />
      <div className="glass-card p-8 flex flex-col sm:flex-row items-center gap-6">
        <img src={logo} alt="KP SKIN BY KIESHA" className="h-32 w-32 rounded-full glow" />
        <div>
          <h2 className="font-display text-2xl">Elegant tools for effortless skin.</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            KP SKIN BY KIESHA is a modern skincare brand built around clean rituals and confident beauty.
            The AI Beauty Assistant is our internal studio for streamlining client communication,
            appointment planning, consultation records, and ongoing research — freeing more time for the
            work only human hands can do.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { title: "Mission", body: "Make luxury skincare accessible through education, ritual, and care." },
          { title: "Values", body: "Clean formulation, evidence-informed advice, and elegant customer experience." },
          { title: "Technology", body: "Built with React, TypeScript, Tailwind, shadcn/ui and Lovable AI." },
          { title: "Contact", body: "hello@kpskin.example — Mon–Sat, 9am to 6pm." },
        ].map((c) => (
          <div key={c.title} className="glass-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">{c.title}</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
