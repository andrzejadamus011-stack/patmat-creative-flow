import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Compass,
  Palette,
  Megaphone,
  LineChart,
  Video,
  Globe,
  Layers,
  Timer,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import logoFull from "@/assets/logo-patmat.png.asset.json";
import logoMini from "@/assets/logo-patmat-mini.jpg.asset.json";
import { Highlight, ScrollMarker, Magnetic, Counter } from "@/components/effects";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pat&Mat.corp — Creative Studio marketingowe od A do Z" },
      {
        name: "description",
        content:
          "Pat&Mat.corp to creative studio: strategia, branding, kampanie, content i performance marketing od A do Z. Jedna firma, spójny styl, szybka realizacja i wzrost liczby klientów.",
      },
      { property: "og:title", content: "Pat&Mat.corp — Creative Studio" },
      {
        property: "og:description",
        content:
          "Marketing od A do Z w jednym miejscu: spójny styl, krótki czas realizacji, niższe koszty i wzrost liczby klientów.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------- helpers ---------------- */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
      {children}
    </span>
  );
}

/* ---------------- nav ---------------- */

const NAV = [
  { label: "Studio", href: "#studio" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Dlaczego my", href: "#dlaczego" },
  { label: "Proces", href: "#proces" },
  { label: "Kontakt", href: "#kontakt" },
];

function Nav() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b bg-background/85 backdrop-blur-xl transition-all duration-500",
        shown
          ? "translate-y-0 border-border opacity-100"
          : "pointer-events-none -translate-y-full border-transparent opacity-0",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5 font-display text-sm font-semibold">
          <img
            src={logoMini.url}
            alt="Logo Pat&Mat.corp"
            width={64}
            height={64}
            className="h-8 w-8 rounded-full object-cover"
          />
          Pat&amp;Mat<span className="-ml-2 text-muted-foreground">.corp</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Zaczynamy <ArrowUpRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => setP(Math.min(window.scrollY / (window.innerHeight * 0.8), 1));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      <div
        className="w-full max-w-3xl"
        style={{
          opacity: 1 - p,
          transform: `translateY(${p * -40}px) scale(${1 - p * 0.06})`,
        }}
      >
        <img
          src={logoFull.url}
          alt="Pat&Mat.corp — creative studio marketingowe"
          width={1960}
          height={780}
          className="h-auto w-full mix-blend-multiply"
        />
      </div>
      <p
        className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
        style={{ opacity: 1 - p * 1.4 }}
      >
        Creative Studio · Marketing od A do Z
      </p>
      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 h-10 w-px -translate-x-1/2 bg-border"
        style={{ opacity: 1 - p * 1.6 }}
      />
    </section>
  );
}

/* ---------------- sections ---------------- */

function Intro() {
  return (
    <section id="studio" className="mx-auto max-w-4xl px-6 py-32">
      <Reveal>
        <Label>Studio</Label>
        <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
          Cały marketing robi <Highlight>jedna firma</Highlight> — dlatego Twoja marka mówi jednym
          głosem.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Pat&amp;Mat.corp to creative studio z dużym portfolio zrealizowanych projektów: od
          identyfikacji wizualnej, przez treści i wideo, po kampanie sprzedażowe. Projektujemy
          działania pod jeden cel — <Highlight delay={150}>więcej klientów</Highlight>.
        </p>
      </Reveal>

      <div className="mt-20 grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
        {[
          { k: "Zrealizowanych projektów", v: 120, s: "+" },
          { k: "Marketing w jednym miejscu", v: 100, s: "%" },
          { k: "Odpowiedź na zapytanie", v: 24, s: "h" },
        ].map((s, i) => (
          <Reveal key={s.k} delay={i * 90}>
            <p className="font-display text-4xl font-semibold">
              <Counter to={s.v} suffix={s.s} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.k}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const MARQUEE = [
  "Strategia",
  "Branding",
  "Social media",
  "Performance",
  "Wideo",
  "UX/UI",
  "SEO",
  "Kampanie 360°",
  "Content",
  "Data",
];

function Marquee() {
  return (
    <section aria-hidden className="border-y border-border py-5">
      <div className="marquee-track gap-8">
        {[...MARQUEE, ...MARQUEE].map((m, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 font-display text-sm uppercase tracking-[0.2em] text-muted-foreground"
          >
            {m}
            <span className="h-1 w-1 rounded-full bg-border" />
          </span>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Compass,
    title: "Strategia & Insight",
    desc: "Badania, pozycjonowanie marki, architektura komunikacji i mapa kanałów na najbliższe miesiące.",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Identyfikacja wizualna, systemy designu, opakowania i key visuale, które nie starzeją się po kwartale.",
  },
  {
    icon: Megaphone,
    title: "Kampanie 360°",
    desc: "Od konceptu po media plan — digital, social, OOH i aktywacje, spięte jedną narracją.",
  },
  {
    icon: Video,
    title: "Content & Produkcja",
    desc: "Wideo, fotografia, motion i formaty social-first produkowane u nas, bez podwykonawców.",
  },
  {
    icon: LineChart,
    title: "Performance & Data",
    desc: "Paid media, optymalizacja konwersji, raporty i atrybucja. Kreacja karmiona liczbami.",
  },
  {
    icon: Globe,
    title: "Web & Produkt",
    desc: "Strony, sklepy i interfejsy — szybkie, dostępne i zaprojektowane pod konwersję.",
  },
];

function Services() {
  return (
    <section id="uslugi" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <Label>Usługi</Label>
        <h2 className="mt-8 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Jedno studio. <Highlight>Cała droga marki.</Highlight>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="bg-background">
            <Reveal delay={i * 60} className="h-full p-8 transition-colors hover:bg-secondary">
              <s.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

const REASONS = [
  {
    icon: TrendingUp,
    title: "Więcej klientów",
    desc: "Działania projektujemy pod jeden cel: żeby do Twojej firmy trafiało więcej wartościowych zapytań i klientów.",
  },
  {
    icon: Layers,
    title: "Spójny styl",
    desc: "Cały marketing robi jedna firma, więc logo, strona, social media i reklamy wyglądają oraz brzmią jak jedna marka.",
  },
  {
    icon: Timer,
    title: "Krótki czas oczekiwania",
    desc: "Bez przerzucania pracy między agencjami i freelancerami. Krótkie ścieżki decyzji, szybkie realizacje i poprawki.",
  },
  {
    icon: PiggyBank,
    title: "Realna oszczędność",
    desc: "Jeden zespół zamiast kilku wykonawców to jedna faktura, mniej godzin koordynacji i niższy koszt całości.",
  },
];

function Reasons() {
  return (
    <section id="dlaczego" className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <Label>Dlaczego my</Label>
          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Wszystko w <Highlight>jednym miejscu</Highlight>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <r.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-5 font-display text-xl font-semibold">{r.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROCESS = [
  {
    n: "01",
    t: "Rozmowa",
    d: "Poznajemy firmę, cele i grupę odbiorców. Wychodzimy z jasnym problemem do rozwiązania.",
  },
  {
    n: "02",
    t: "Strategia",
    d: "Pozycjonowanie, big idea, cele i plan kanałów. Wszystko na jednej stronie.",
  },
  {
    n: "03",
    t: "Kreacja",
    d: "Design, copy, produkcja. Iterujemy szybko i testujemy na żywym ruchu.",
  },
  {
    n: "04",
    t: "Skalowanie",
    d: "Optymalizacja, automatyzacja, raporty. Co miesiąc więcej z tego samego budżetu.",
  },
];

function Process() {
  return (
    <section id="proces" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <Label>Proces</Label>
        <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Cztery kroki, <Highlight>zero chaosu</Highlight>.
        </h2>
      </Reveal>

      <div className="mt-16 divide-y divide-border border-y border-border">
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} delay={i * 70}>
            <div className="grid gap-4 py-8 sm:grid-cols-[80px_200px_1fr] sm:items-baseline">
              <span className="font-mono text-xs text-muted-foreground">{p.n}</span>
              <h3 className="font-display text-xl font-semibold">{p.t}</h3>
              <p className="leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="kontakt" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-32 text-center">
        <Reveal>
          <Label>Kontakt</Label>
          <h2 className="mt-8 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Powiedz nam, co chcesz <Highlight>rozkręcić</Highlight>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Odpowiadamy w 24 h. Pierwsza konsultacja jest bezpłatna — wychodzisz z niej z konkretnym
            planem, nawet jeśli nie zaczniemy współpracy.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a
                href="mailto:Pat&Mat.corp.contact@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Pat&amp;Mat.corp.contact@gmail.com <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a
              href="tel:+48506728042"
              className="rounded-full border border-border px-8 py-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              506 728 042
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 font-display text-foreground">
          <img
            src={logoMini.url}
            alt="Logo Pat&Mat.corp"
            width={64}
            height={64}
            className="h-8 w-8 rounded-full object-cover"
          />
          Pat&amp;Mat<span className="-ml-3 text-muted-foreground">.corp</span>
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <a className="hover:text-foreground" href="mailto:Pat&Mat.corp.contact@gmail.com">
            Pat&amp;Mat.corp.contact@gmail.com
          </a>
          <a className="hover:text-foreground" href="tel:+48506728042">
            506 728 042
          </a>
        </p>
        <p>© {new Date().getFullYear()} Creative Studio. Marketing od A do Z.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative">
      <ScrollMarker />
      <Nav />
      <Hero />
      <Intro />
      <Marquee />
      <Services />
      <Reasons />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
