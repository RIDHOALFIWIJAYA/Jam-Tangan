import { useRef, useEffect } from "react";

export default function AOS({ children, animation = "fade-up", delay = 0, duration = 800, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("aos-init");
    el.style.setProperty("--aos-dur", `${duration}ms`);
    el.style.setProperty("--aos-del", `${delay}ms`);
    el.setAttribute("data-aos", animation);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => entry.target.classList.add("aos-animate"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
