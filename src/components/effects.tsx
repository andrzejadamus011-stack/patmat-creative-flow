import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

/** Tekst podkreślony „zakreślaczem”, który wjeżdża przy scrollu. */
export function Highlight({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.6);
  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span
        aria-hidden
        className="absolute inset-x-[-0.18em] bottom-[0.02em] top-[0.42em] -z-10 origin-left rounded-[2px]"
        style={{
          background: "var(--marker)",
          transform: `scaleX(${visible ? 1 : 0}) skewX(-8deg)`,
          transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

/** Pasek zakreślacza, który przesuwa się i chowa w trakcie przewijania. */
export function ScrollMarker() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(Math.max(window.scrollY / h, 0), 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[6px]">
      <div
        className="h-full origin-left rounded-r-full"
        style={{
          background: "var(--marker)",
          transform: `scaleX(${p}) skewX(-12deg)`,
          transition: "transform 160ms linear",
        }}
      />
    </div>
  );
}

/** Delikatny magnetyzm przycisków. */
export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${
      (e.clientY - (r.top + r.height / 2)) * strength
    }px, 0)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };
  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-block will-change-transform", className)}
      style={{ transition: "transform 450ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </span>
  );
}

/** Licznik animowany po wejściu w kadr. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / 1500, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
