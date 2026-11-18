import React, { useEffect, useRef, useState } from 'react';

const guestNotes = [
  {
    number: '01',
    title: 'Come As You Are',
    desc: 'Your presence is the greatest gift. We would love to have you with us as our families come together for this special occasion.',
    bg: 'bg-wine',
  },
  {
    number: '02',
    title: 'Bring Your Duas',
    desc: 'Keep us in your prayers as we begin this beautiful new journey together. Your blessings mean the world to us.',
    bg: 'bg-car',
  },
  {
    number: '03',
    title: 'Celebrate With Us',
    desc: 'Come share the happiness, laughter and precious moments. We look forward to celebrating this day with you.',
    bg: 'bg-ox',
  },
];

export default function EveningTimeline() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const currentScroll = -rect.top;

      const value = Math.max(
        0,
        Math.min(1, currentScroll / Math.max(1, totalScrollable))
      );

      setProgress(value);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const translateX = -progress * (guestNotes.length - 1) * 100;
  const barScale = 0.08 + 0.92 * progress;

  return (
    <section
      ref={containerRef}
      id="evening"
      className="relative bg-wine"
      style={{ height: `${guestNotes.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen h-[100svh] overflow-hidden">

        {/* Section heading */}
        <p className="absolute left-[clamp(20px,6vw,30px)] top-[calc(26px+env(safe-area-inset-top))] z-20 font-pinyon text-[30px] leading-none text-rose">
          A note to our guests
        </p>

        {/* Horizontal storytelling cards */}
        <div
          className="flex h-full [will-change:transform]"
          style={{
            transform: `translate3d(${translateX}vw, 0, 0)`,
          }}
        >
          {guestNotes.map((item) => (
            <article
              key={item.number}
              className={`relative flex h-full w-screen flex-none flex-col justify-end overflow-hidden px-[clamp(24px,7vw,40px)] pb-[22vh] ${item.bg}`}
            >
              {/* Number */}
              <span className="mb-5 font-pinyon text-5xl leading-none text-rose">
                {item.number}
              </span>

              {/* Title */}
              <h3 className="max-w-[90vw] font-gloock text-[clamp(48px,13vw,76px)] font-normal leading-[0.98] tracking-[-0.02em] text-ivory">
                {item.title}
              </h3>

              {/* Message */}
              <p className="mt-6 max-w-[28ch] font-familjen text-base leading-relaxed text-ivory/85 sm:text-lg">
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        {/* Scroll progress indicator */}
        <div
          className="absolute bottom-[calc(30px+env(safe-area-inset-bottom))] left-[clamp(20px,6vw,30px)] right-[clamp(20px,6vw,30px)] h-[2px] bg-[rgba(247,236,232,0.2)]"
          aria-hidden="true"
        >
          <div
            className="h-full origin-left bg-ivory transition-transform duration-75"
            style={{ transform: `scaleX(${barScale})` }}
          />
        </div>

      </div>
    </section>
  );
}