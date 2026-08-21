import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Sparkles,
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
import {
  CursorGlow,
  ParticleField,
  TiltCard,
  Magnetic,
  SplitText,
  Counter,
  ScrollPlanet,
} from "@/components/effects";
import { useReveal, useScrollProgress, usePointer } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pat&Mat.corp — Creative Studio marketingowe od A do Z" },
      {
        name: "description",
        content:
          "Pat&Mat.corp to creative studio: strategia, branding, kampanie, content i performance marketing od A do Z. Jedna firma, spójny styl, szybka realizacja i realny wzrost klientów.",
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
      <span className="relative flex h-1.5 w-1.5">
        <span className="bg-iris absolute inline-flex h-full w-full rounded-full opacity-75" />
      </span>
      {children}
    </span>
  );
}

/* ---------------- sections ---------------- */

function ProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <div
        className="bg-iris h-full origin-left"
        style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

const NAV = [
  { label: "Studio", href: "#studio" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Dlaczego my", href: "#dlaczego" },
  { label: "Proces", href: "#proces" },
  { label: "Kontakt", href: "#kontakt" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
          scrolled ? "glass scale-100" : "glass-soft scale-[0.98]",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 px-2 font-display text-sm font-semibold tracking-tight"
        >
          <img
            src={logoMini.url}
            alt="Logo Pat&Mat.corp"
            width={64}
            height={64}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          <span className="hidden sm:inline">
            Pat&amp;Mat<span className="text-muted-foreground">.corp</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic strength={0.25}>
          <a
            href="#kontakt"
            className="bg-iris inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Zaczynamy <ArrowUpRight className="h-4 w-4" />
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}

function Hero() {
  const { x, y } = usePointer();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="noise relative overflow-hidden pb-24 pt-36">
      <div className="absolute inset-0">
        <div
          className="animate-float-slow absolute -left-40 top-10 h-[560px] w-[560px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--iris) 55%, transparent), transparent 70%)",
            transform: `translate3d(${x * 40}px, ${y * 30 - scrollY * 0.1}px, 0)`,
          }}
        />
        <div
          className="absolute -right-32 top-52 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--amber) 40%, transparent), transparent 70%)",
            transform: `translate3d(${-x * 50}px, ${-y * 30 + scrollY * 0.06}px, 0)`,
          }}
        />
        <ParticleField />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <div
              className="glass mb-9 inline-flex w-full max-w-xl items-center justify-center rounded-3xl px-6 py-5"
              style={{ background: "oklch(0.96 0.012 85)" }}
            >
              <img
                src={logoFull.url}
                alt="Pat&Mat.corp — creative studio marketingowe"
                width={1960}
                height={780}
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <Eyebrow>Creative Studio · Marketing od A do Z</Eyebrow>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            <SplitText text="Marketing" />
            <br />
            <span className="text-iris">
              <SplitText text="od A do Z." />
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Cały marketing robi jedna firma — dzięki temu Twoja marka mówi jednym, spójnym głosem,
            czekasz krócej i płacisz mniej niż za kilku osobnych wykonawców.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#kontakt"
                className="bg-iris inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)]"
              >
                Porozmawiajmy o wzroście <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a
              href="#uslugi"
              className="glass-soft rounded-full px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Co robimy
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "Zrealizowanych projektów", v: 120, s: "+" },
              { k: "Marketing w jednym miejscu", v: 100, s: "%" },
              { k: "Odpowiedź w godzinach", v: 24, s: "h" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-3xl font-semibold">
                  <Counter to={s.v} suffix={s.s} />
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.k}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div
            className="animate-orbit absolute inset-0 rounded-full border border-dashed border-border"
            aria-hidden
          >
            <span className="bg-iris absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full" />
          </div>
          <div
            className="absolute inset-8 overflow-hidden rounded-full ring-1 ring-border"
            style={{
              transform: `translate3d(${(x - 0.5) * -34}px, ${(y - 0.5) * -34 + scrollY * 0.05}px, 0) rotate(${scrollY * 0.03}deg)`,
              transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <img
              src={logoMini.url}
              alt="Znak graficzny Pat&Mat.corp — planeta z pierścieniem"
              width={860}
              height={860}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass absolute -bottom-4 left-0 rounded-2xl px-5 py-3 text-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Jeden zespół
            </p>
            <p className="font-display font-semibold">Strategia → kreacja → wynik</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const MARQUEE = [
  "Strategia",
  "Branding",
  "Social",
  "Performance",
  "Wideo",
  "UX/UI",
  "SEO",
  "Kampanie 360°",
  "Influencer",
  "Data",
];

function Marquee() {
  return (
    <section aria-hidden className="relative border-y border-border/60 py-6">
      <div className="marquee-track gap-10">
        {[...MARQUEE, ...MARQUEE].map((m, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-display text-2xl font-medium text-muted-foreground/70"
          >
            {m}
            <Sparkles className="h-4 w-4 text-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="studio" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Studio</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Świeża energia, <span className="text-iris">setki godzin praktyki</span>.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            Pat&amp;Mat.corp to młode creative studio z dużym portfolio zrealizowanych projektów —
            od identyfikacji wizualnych, przez treści i wideo, po kampanie sprzedażowe. Pracujemy
            szybko, bez korporacyjnych procedur, za to z pełną odpowiedzialnością za efekt.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            Bierzemy na siebie cały marketing, żebyś Ty mógł zająć się prowadzeniem firmy.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <TiltCard intensity={8} className="glass glow-ring h-full rounded-[2rem] p-8">
            <ul className="relative z-10 space-y-5">
              {[
                "Dużo zrealizowanych projektów w różnych branżach",
                "Pomagamy zwiększać liczbę klientów, nie tylko zasięgi",
                "Jeden spójny styl w każdym kanale komunikacji",
                "Krótki czas oczekiwania na materiały i poprawki",
                "Niższy koszt niż kilku osobnych wykonawców",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="bg-iris mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </TiltCard>
        </Reveal>
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
    desc: "Wideo, fotografia, motion i social-first formaty produkowane u nas, bez podwykonawców.",
  },
  {
    icon: LineChart,
    title: "Performance & Data",
    desc: "Paid media, CRO, dashboardy i atrybucja. Kreacja karmiona liczbami, nie przeczuciem.",
  },
  {
    icon: Globe,
    title: "Web & Produkt",
    desc: "Strony, sklepy i interfejsy — szybkie, dostępne i zaprojektowane pod konwersję.",
  },
];

function Services() {
  return (
    <section id="uslugi" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Eyebrow>Usługi</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Jedno studio. <span className="text-iris">Cała droga marki.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <TiltCard className="glass glow-ring h-full rounded-3xl p-7">
              <div className="relative z-10">
                <span className="glass-soft inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                  <s.icon className="h-5 w-5 text-accent" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const REASONS = [
  {
    icon: TrendingUp,
    title: "Więcej klientów",
    desc: "Działania projektujemy pod jeden cel: żeby do Twojej firmy trafiało więcej wartościowych klientów i zapytań.",
    tone: "var(--iris)",
  },
  {
    icon: Layers,
    title: "Spójny styl",
    desc: "Cały marketing robi jedna firma, więc logo, strona, social media i reklamy wyglądają i brzmią jak jedna marka.",
    tone: "var(--amber)",
  },
  {
    icon: Timer,
    title: "Krótki czas oczekiwania",
    desc: "Bez przerzucania pracy między agencjami i freelancerami. Krótkie ścieżki decyzji, szybkie realizacje i poprawki.",
    tone: "var(--aqua)",
  },
  {
    icon: PiggyBank,
    title: "Realna oszczędność",
    desc: "Jeden zespół zamiast kilku wykonawców to jedna faktura, mniej godzin koordynacji i niższy koszt całości.",
    tone: "var(--magenta)",
  },
];

function Reasons() {
  return (
    <section id="dlaczego" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Eyebrow>Dlaczego my</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Wszystko w <span className="text-iris">jednym miejscu</span>.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 90}>
            <TiltCard intensity={8} className="glass h-full rounded-3xl p-8">
              <div className="relative z-10">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `color-mix(in oklab, ${r.tone} 28%, transparent)` }}
                >
                  <r.icon className="h-5 w-5" style={{ color: r.tone }} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
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
    d: "Pozycjonowanie, big idea, KPI i plan kanałów. Wszystko na jednej stronie.",
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
    <section id="proces" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Eyebrow>Proces</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Cztery kroki, <span className="text-iris">zero chaosu</span>.
        </h2>
      </Reveal>

      <div className="relative mt-16 grid gap-6 md:grid-cols-4">
        <div
          aria-hidden
          className="bg-iris absolute left-0 top-8 hidden h-px w-full opacity-40 md:block"
        />
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} delay={i * 120}>
            <div className="glass relative h-full rounded-3xl p-7">
              <span className="bg-iris absolute -top-3 left-7 flex h-6 items-center rounded-full px-3 font-mono text-[10px] font-bold text-primary-foreground">
                {p.n}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="kontakt" className="relative mx-auto max-w-5xl px-6 pb-28 pt-10">
      <Reveal>
        <TiltCard
          intensity={6}
          className="glass glow-ring rounded-[2.5rem] p-12 text-center sm:p-20"
        >
          <div className="relative z-10">
            <Eyebrow>Kontakt</Eyebrow>
            <h2 className="mt-7 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Powiedz nam, co chcesz <span className="text-iris">rozkręcić</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Odpowiadamy w 24 h. Pierwsza konsultacja jest bezpłatna — wychodzisz z niej z
              konkretnym planem, nawet jeśli nie zaczniemy współpracy.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a
                  href="mailto:Pat&Mat.corp.contact@gmail.com"
                  className="bg-iris inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)]"
                >
                  Pat&amp;Mat.corp.contact@gmail.com <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <a
                href="tel:+48506728042"
                className="glass-soft rounded-full px-8 py-4 text-sm font-medium transition-colors hover:bg-secondary"
              >
                506 728 042
              </a>
            </div>
          </div>
        </TiltCard>
      </Reveal>
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
            className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
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
      <ProgressBar />
      <CursorGlow />
      <ScrollPlanet src={logoMini.url} />
      <Nav />
      <Hero />
      <Marquee />
      <Studio />
      <Services />
      <Reasons />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
