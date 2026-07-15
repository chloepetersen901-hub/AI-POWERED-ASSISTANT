import { useEffect, useRef, useState } from "react";
import { Copy, Download, RefreshCw, Pencil, Check, FileText, FileType2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  loading?: boolean;
  onRegenerate?: () => void;
  filenameBase?: string;
}

export function AiOutput({ text, loading, onRegenerate, filenameBase = "kp-skin-output" }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setValue(text), [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  const download = (type: "txt" | "docx" | "pdf") => {
    if (type === "txt") {
      const blob = new Blob([value], { type: "text/plain" });
      triggerDownload(blob, `${filenameBase}.txt`);
      return;
    }
    if (type === "docx") {
      // Simple HTML-in-.doc trick that opens in Word cleanly
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${filenameBase}</title></head><body><pre style="font-family:Georgia,serif;white-space:pre-wrap">${escapeHtml(value)}</pre></body></html>`;
      const blob = new Blob([html], { type: "application/msword" });
      triggerDownload(blob, `${filenameBase}.doc`);
      return;
    }
    if (type === "pdf") {
      const w = window.open("", "_blank");
      if (!w) return;
      w.document.write(
        `<html><head><title>${filenameBase}</title><style>body{font-family:Georgia,serif;padding:40px;line-height:1.6;white-space:pre-wrap;color:#1a2740}</style></head><body>${escapeHtml(value)}</body></html>`,
      );
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 300);
    }
  };

  return (
    <div className={cn("glass-card p-5 space-y-3", loading && "animate-pulse")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI Result</p>
        <div className="flex flex-wrap gap-1.5">
          <Button variant="ghost" size="sm" onClick={() => setEditing((e) => !e)}>
            {editing ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Pencil className="h-3.5 w-3.5 mr-1.5" />}
            {editing ? "Done" : "Edit"}
          </Button>
          <Button variant="ghost" size="sm" onClick={copy}>
            <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
          </Button>
          {onRegenerate && (
            <Button variant="ghost" size="sm" onClick={onRegenerate} disabled={loading}>
              <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", loading && "animate-spin")} /> Regenerate
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => download("pdf")}>
            <FileText className="h-3.5 w-3.5 mr-1.5" /> PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={() => download("docx")}>
            <FileType2 className="h-3.5 w-3.5 mr-1.5" /> DOCX
          </Button>
          <Button variant="ghost" size="sm" onClick={() => download("txt")}>
            <Download className="h-3.5 w-3.5 mr-1.5" /> TXT
          </Button>
        </div>
      </div>

      {editing ? (
        <Textarea
          ref={areaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[300px] font-mono text-sm bg-background/60"
        />
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-p:leading-relaxed">
          <ReactMarkdown>{value || "*No output yet. Fill the form and click Generate.*"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
}
