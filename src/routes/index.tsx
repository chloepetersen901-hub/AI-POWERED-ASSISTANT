import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, MessageCircle, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import brandBoard from "@/assets/kp-brand-board.png.asset.json";

// Placeholder details — replace with the real ones
const WHATSAPP_NUMBER = "27000000000";
const LOCATION = "Johannesburg, South Africa";
const HOURS = "Mon–Sat, 9am – 6pm";

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const TREATMENTS = [
  { name: "Signature Deep Cleanse Facial", time: "60 min", price: "R550", desc: "Double cleanse, gentle exfoliation, extractions and a calming mask." },
  { name: "Brightening Facial for Hyperpigmentation", time: "75 min", price: "R750", desc: "Targets dark marks and uneven tone — safe for melanin-rich skin." },
  { name: "Hydrating Glow Facial", time: "60 min", price: "R650", desc: "Deep hydration for dull, dry or dehydrated skin." },
  { name: "Gentle Chemical Peel", time: "45 min", price: "R700", desc: "Carefully chosen peels to refine texture without irritation." },
  { name: "Dermaplaning", time: "45 min", price: "R600", desc: "Removes dead skin and fine hair for a smooth, radiant finish." },
  { name: "Skin Consultation", time: "30 min", price: "R250", desc: "A personal skin assessment and home-care routine plan." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KP SKIN BY KIESHA — Facials & Skin Treatments in Johannesburg" },
      { name: "description", content: "Facials, peels and brightening treatments for hyperpigmentation, safe for melanin-rich skin. Book on WhatsApp with KP SKIN BY KIESHA." },
      { property: "og:title", content: "KP SKIN BY KIESHA — Healthy skin, confident you" },
      { property: "og:description", content: "Facials and skin treatments safe for melanin-rich skin. See prices and book on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "KP SKIN BY KIESHA",
          address: LOCATION,
          openingHours: "Mo-Sa 09:00-18:00",
          slogan: "Healthy skin, confident you",
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-background/70 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
          <img src={logo} alt="KP SKIN BY KIESHA" className="h-10 w-10 rounded-full" />
          <p className="font-display text-lg">KP SKIN BY KIESHA</p>
          <nav className="ml-auto flex items-center gap-4 text-sm">
            <a href="#treatments" className="hidden sm:inline text-muted-foreground hover:text-foreground">Treatments</a>
            <a href="#visit" className="hidden sm:inline text-muted-foreground hover:text-foreground">Visit</a>
            <Button asChild size="sm" className="rounded-full">
              <a href={waLink("Hi Kiesha, I'd like to book a treatment.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-1.5" /> Book
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Skin therapy · {LOCATION}</p>
            <h1 className="font-display text-4xl sm:text-6xl mt-4 leading-tight">Healthy skin, confident you.</h1>
            <p className="text-muted-foreground mt-5 text-lg max-w-xl">
              Personal facials and treatments for dark marks, uneven tone and dull skin — gentle,
              effective care that is safe for melanin-rich skin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href={waLink("Hi Kiesha, I'd like to book a treatment.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" /> Book on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#treatments">See treatments & prices</a>
              </Button>
            </div>
          </div>
          <img src={brandBoard.url} alt="KP SKIN BY KIESHA — healthy skin, confident you" className="w-full rounded-3xl border border-border glow" />
        </section>

        <section className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, t: "Safe for darker skin", d: "Treatments chosen to avoid irritation and pigment flare-ups." },
            { icon: Sparkles, t: "Real results", d: "A clear plan for your skin, not guesswork." },
            { icon: Leaf, t: "Products you can find", d: "Home-care routines with products available locally." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="glass-card p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h2 className="font-display text-xl mt-3">{t}</h2>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </section>

        <section id="treatments" className="max-w-6xl mx-auto px-4 py-20 scroll-mt-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Menu</p>
          <h2 className="font-display text-3xl sm:text-4xl mt-2">Treatments & prices</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {TREATMENTS.map((t) => (
              <div key={t.name} className="glass-card p-6 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t.time}</p>
                  </div>
                  <p className="font-display text-2xl text-primary shrink-0">{t.price}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-3 flex-1">{t.desc}</p>
                <a
                  href={waLink(`Hi Kiesha, I'd like to book the ${t.name} (${t.price}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary mt-4 inline-flex items-center gap-1.5 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" /> Book this on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="visit" className="max-w-6xl mx-auto px-4 pb-20 scroll-mt-20">
          <div className="glass-card p-8 lg:p-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl">Visit KP SKIN</h2>
              <p className="mt-4 flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {LOCATION}</p>
              <p className="mt-2 flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {HOURS}</p>
              <p className="mt-2 text-sm text-muted-foreground">Exact address shared when you book.</p>
            </div>
            <div className="md:text-right">
              <Button asChild size="lg" className="rounded-full">
                <a href={waLink("Hi Kiesha, I'd like to book a treatment.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KP SKIN BY KIESHA</p>
          <Link to="/studio" className="hover:text-foreground">Staff</Link>
        </div>
      </footer>
    </div>
  );
}
