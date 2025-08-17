import { useEffect, useRef, ReactNode } from "react";

// Scales children so the ENTIRE page fits within the device viewport.
// min: how far you're willing to zoom out (smaller = more zoomed out)
// max: cap (usually 1)
// onlyFirstLoad: do it once, then leave user's zoom alone afterwards
export default function FitToScreen({
  children,
  min = 0.35,
  max = 1,
  onlyFirstLoad = false,
}: { children: ReactNode; min?: number; max?: number; onlyFirstLoad?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onlyFirstLoad && localStorage.getItem("fit-once-done")) return;

    const el = ref.current!;
    const fit = () => {
      // reset to measure true content size
      el.style.setProperty("--page-scale", "1");
      el.style.width = "";

      // measure full content size
      const contentW = el.scrollWidth || el.getBoundingClientRect().width;
      const contentH = el.scrollHeight || el.getBoundingClientRect().height;

      // scale so BOTH width and height fit (choose the tighter)
      const sW = window.innerWidth / contentW;
      const sH = window.innerHeight / contentH;
      const s = Math.min(sW, sH);
      const clamped = Math.max(min, Math.min(max, s));

      el.style.setProperty("--page-scale", String(clamped));
      el.style.width = `calc(100% / ${clamped})`;
    };

    // fit after layout/paint
    const run = () => requestAnimationFrame(fit);
    run();

    // refit on rotate/resize or content changes
    const ro = new ResizeObserver(run);
    ro.observe(document.body);

    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);
    window.addEventListener("load", run);

    if (onlyFirstLoad) localStorage.setItem("fit-once-done", "1");

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
      window.removeEventListener("orientationchange", run);
      window.removeEventListener("load", run);
    };
  }, [min, max, onlyFirstLoad]);

  return <div id="page-scale" ref={ref}>{children}</div>;
}
