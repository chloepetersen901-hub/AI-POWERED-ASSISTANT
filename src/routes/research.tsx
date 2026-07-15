import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { generateAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  component: Research,
});

function Research() {
  const generate = useServerFn(generateAi);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const run = async () => {
    if (!topic.trim()) {
      toast.error("Enter an ingredient, product, treatment, or trend.");
      return;
    }
    setLoading(true);
    try {
      const system = `You are a research analyst for KP SKIN BY KIESHA covering skincare ingredients, products, treatments, and beauty industry trends. Produce an easy-to-read brief in markdown with these sections:
### Overview
### Key Benefits
### Risks & Contraindications
### Recommendations (skin types, pairings, usage)
### Industry Insights & Trends
### Sources to double-check
Be balanced, evidence-aware, and clearly note when something needs a dermatologist's input.`;
      const prompt = `Research topic: ${topic}`;
      const { text } = await generate({ data: { system, prompt } });
      setText(text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        icon={Sparkles}
        title="AI Skincare Research Assistant"
        description="Deep-dive briefs on ingredients, products, treatments, and beauty trends."
      />
      <div className="glass-card p-6 space-y-4">
        <div>
          <Label>What should we research?</Label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="e.g. Niacinamide, Hydrafacial, retinol for sensitive skin…"
            className="mt-1.5"
          />
        </div>
        <Button onClick={run} disabled={loading} className="rounded-full">
          <Sparkles className="h-4 w-4 mr-2" />
          {loading ? "Researching…" : "Generate Research Brief"}
        </Button>
      </div>
      <AiOutput text={text} loading={loading} onRegenerate={run} filenameBase="kp-skin-research" />
      <Disclaimer />
    </div>
  );
}
