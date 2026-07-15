import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/consultation")({
  component: Consultation,
});

function Consultation() {
  const generate = useServerFn(generateAi);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const run = async () => {
    if (!notes.trim()) {
      toast.error("Please paste consultation notes.");
      return;
    }
    setLoading(true);
    try {
      const system = `You are a senior esthetician at KP SKIN BY KIESHA. Read the raw consultation notes and produce a clean, structured summary in markdown with these exact sections:
### Client Summary
### Skin Concerns
### Recommended Treatments
### Products Recommended
### Follow-up Actions
### Appointment Reminders
Keep it professional, warm, and safe — never give medical diagnoses.`;
      const prompt = `Raw consultation notes:\n${notes}`;
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
        icon={ClipboardList}
        title="Consultation Notes Summarizer"
        description="Structured, client-ready summaries from your raw session notes."
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <div>
            <Label>Paste consultation notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste full session notes, observations, client history…"
              className="mt-1.5 min-h-[380px]"
            />
          </div>
          <Button onClick={run} disabled={loading} className="w-full rounded-full">
            <Sparkles className="h-4 w-4 mr-2" />
            {loading ? "Summarizing…" : "Summarize Consultation"}
          </Button>
        </div>
        <AiOutput text={text} loading={loading} onRegenerate={run} filenameBase="kp-skin-consultation" />
      </div>
      <Disclaimer />
    </div>
  );
}
