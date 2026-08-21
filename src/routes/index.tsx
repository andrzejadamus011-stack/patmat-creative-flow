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
} from "lucide-react";
import heroOrb from "@/assets/hero-orb.jpg";
import {
  CursorGlow,
  ParticleField,
  TiltCard,
  Magnetic,
  SplitText,
  Counter,
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
          "Pat&Mat.corp to creative studio: strategia, branding, kampanie, content i performance marketing od A do Z. Zobacz, jak budujemy marki, które się zapamiętuje.",
      },
      { property: "og:title", content: "Pat&Mat.corp — Creative Studio" },
      {
        property: "og:description",
        content:
          "Strategia, branding, kampanie i performance marketing od A do Z. Creative studio Pat&Mat.corp.",
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
  { label: "Prace", href: "#prace" },
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
          className="flex items-center gap-2 px-3 font-display text-sm font-semibold tracking-tight"
        >
          <span className="bg-iris h-6 w-6 shrink-0 rounded-lg" />
          Pat&amp;Mat<span className="text-muted-foreground">.corp</span>
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
    <section id="top" className="noise relative overflow-hidden pb-24 pt-40">
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
              "radial-gradient(circle, color-mix(in oklab, var(--aqua) 45%, transparent), transparent 70%)",
            transform: `translate3d(${-x * 50}px, ${-y * 30 + scrollY * 0.06}px, 0)`,
          }}
        />
        <ParticleField />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>Creative Studio · Warszawa · Global</Eyebrow>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            <SplitText text="Marketing" />
            <br />
            <span className="text-iris">
              <SplitText text="od A do Z." />
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Jesteśmy Pat&amp;Mat.corp — studio kreatywne, które zamienia strategię w ruch, obraz i
            wynik. Od pierwszego insightu po ostatnią konwersję.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#prace"
                className="bg-iris inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)]"
              >
                Zobacz nasze prace <ArrowUpRight className="h-4 w-4" />
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
              { k: "Projektów", v: 240, s: "+" },
              { k: "Lat na rynku", v: 11, s: "" },
              { k: "Śr. wzrost ROAS", v: 187, s: "%" },
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
            className="absolute inset-6 overflow-hidden rounded-full"
            style={{
              transform: `translate3d(${(x - 0.5) * -34}px, ${(y - 0.5) * -34 + scrollY * 0.05}px, 0) rotate(${scrollY * 0.03}deg)`,
              transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <img
              src={heroOrb}
              alt="Iryzujący, płynny obiekt szklany symbolizujący kreatywność Pat&Mat.corp"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass absolute -bottom-4 left-0 rounded-2xl px-5 py-3 text-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Live
            </p>
            <p className="font-display font-semibold">14 kampanii w locie</p>
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

const SERVICES = [
  {
    icon: Compass,
    title: "Strategia & Insight",
    desc: "Badania, pozycjonowanie marki, architektura komunikacji i mapa kanałów na 12 miesięcy.",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Identyfikacja wizualna, systemy designu, opakowania i key visuale, które nie starzeją się po kwartale.",
  },
  {
    icon: Megaphone,
    title: "Kampanie 360°",
    desc: "Od konceptu po media plan — ATL, digital, OOH i aktywacje, spięte jedną narracją.",
  },
  {
    icon: Video,
    title: "Content & Produkcja",
    desc: "Wideo, fotografia, motion i social-first formaty produkowane w naszym studiu.",
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

const WORK = [
  {
    client: "Nordvita",
    kind: "Rebranding + kampania 360°",
    result: "+212% rozpoznawalności",
    tone: "var(--iris)",
  },
  {
    client: "Kawa Ferox",
    kind: "Content & social-first wideo",
    result: "38 mln zasięgu organicznego",
    tone: "var(--amber)",
  },
  {
    client: "Loop Mobility",
    kind: "Performance & CRO",
    result: "ROAS 6,4 w 90 dni",
    tone: "var(--aqua)",
  },
  {
    client: "Atelier Senn",
    kind: "E-commerce & design system",
    result: "+64% konwersji",
    tone: "var(--magenta)",
  },
];

function Work() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="prace" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Eyebrow>Wybrane prace</Eyebrow>
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Efekty, nie <span className="text-iris">slajdy</span>.
        </h2>
      </Reveal>

      <div className="mt-14 divide-y divide-border border-y border-border">
        {WORK.map((w, i) => (
          <Reveal key={w.client} delay={i * 60}>
            <a
              href="#kontakt"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              className="group relative flex flex-col gap-2 overflow-hidden py-8 transition-[padding] duration-500 hover:pl-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, color-mix(in oklab, ${w.tone} 22%, transparent), transparent 70%)`,
                }}
              />
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {w.client}
                </h3>
              </div>
              <div className="flex items-center gap-6 pl-10 sm:pl-0">
                <span className="text-sm text-muted-foreground">{w.kind}</span>
                <span
                  className="glass-soft rounded-full px-4 py-1.5 text-xs font-semibold"
                  style={{ color: active === i ? w.tone : undefined }}
                >
                  {w.result}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const PROCESS = [
  { n: "01", t: "Discovery", d: "Warsztat, dane, konkurencja, audyt. Wychodzimy z jasnym problemem do rozwiązania." },
  { n: "02", t: "Strategia", d: "Pozycjonowanie, big idea, KPI i plan kanałów. Wszystko na jednej stronie." },
  { n: "03", t: "Kreacja", d: "Design, copy, produkcja. Iterujemy szybko i testujemy na żywym ruchu." },
  { n: "04", t: "Skalowanie", d: "Optymalizacja, automatyzacja, raporty. Co miesiąc więcej z tego samego budżetu." },
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

const QUOTES = [
  {
    q: "Pat&Mat.corp zrobili nam rebranding i kampanię w 9 tygodni. Sprzedaż w Q1 wzrosła o 41%.",
    a: "Julia Kwaśniak",
    r: "CMO, Nordvita",
  },
  {
    q: "Jedyna agencja, która przynosi na spotkanie zarówno moodboard, jak i model atrybucji.",
    a: "Marek Dolny",
    r: "Founder, Loop Mobility",
  },
  {
    q: "Zero przeciągania. Kreacja na poziomie, którego nie spodziewasz się przy takim tempie.",
    a: "Ala Rembert",
    r: "Head of Brand, Kawa Ferox",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 5200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-28">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14">
          <div
            aria-hidden
            className="animate-float-slow absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--magenta) 45%, transparent), transparent 70%)",
            }}
          />
          <div className="relative min-h-[190px]">
            {QUOTES.map((q, idx) => (
              <blockquote
                key={q.a}
                className={cn(
                  "absolute inset-0 transition-all duration-700",
                  idx === i
                    ? "translate-y-0 opacity-100 blur-0"
                    : "pointer-events-none translate-y-6 opacity-0 blur-sm",
                )}
              >
                <p className="font-display text-2xl leading-snug sm:text-3xl">“{q.q}”</p>
                <footer className="mt-6 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{q.a}</span> — {q.r}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 flex gap-2">
            {QUOTES.map((q, idx) => (
              <button
                key={q.a}
                onClick={() => setI(idx)}
                aria-label={`Opinia ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  idx === i ? "bg-iris w-10" : "w-4 bg-border",
                )}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CTA() {
  return (
    <section id="kontakt" className="relative mx-auto max-w-5xl px-6 pb-28 pt-10">
      <Reveal>
        <TiltCard intensity={6} className="glass glow-ring rounded-[2.5rem] p-12 text-center sm:p-20">
          <div className="relative z-10">
            <Eyebrow>Kontakt</Eyebrow>
            <h2 className="mt-7 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Powiedz nam, co chcesz <span className="text-iris">rozkręcić</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Odpowiadamy w 24 h. Pierwsza konsultacja strategiczna jest bezpłatna — wychodzisz z
              niej z konkretnym planem, nawet jeśli nie zaczniemy współpracy.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a
                  href="mailto:hello@patmat.corp"
                  className="bg-iris inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)]"
                >
                  hello@patmat.corp <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <a
                href="tel:+48555010203"
                className="glass-soft rounded-full px-8 py-4 text-sm font-medium transition-colors hover:bg-secondary"
              >
                +48 555 010 203
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
        <p className="font-display text-foreground">
          Pat&amp;Mat<span className="text-muted-foreground">.corp</span>
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
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
