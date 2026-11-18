
import React, { useEffect, useRef, useState } from 'react';
import { invitationData } from '../data/invitationData';

export default function Curtain() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { curtain, media } = invitationData;

  // Curtain scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const currentScroll = -rect.top;

      const p = Math.max(
        0,
        Math.min(1, currentScroll / Math.max(1, totalScrollable))
      );

      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const p = progress;

  const leftTransform = `translateX(${p * -96}%) skewY(${p * 3}deg)`;
  const rightTransform = `translateX(${p * 96}%) skewY(${p * -3}deg)`;

  const hintOpacity = Math.max(0, 1 - p * 4);

  return (
    <section
      ref={containerRef}
      id="curtain"
      className="relative h-[240vh] bg-ox"
    >
      <div className="sticky top-0 flex h-screen h-[100svh] items-center justify-center overflow-hidden">

        {/* Family invitation */}
        <div className="mx-auto flex w-full max-w-lg flex-col items-center px-5 py-3 text-center">

          {/* Bismillah */}
          <p
            dir="rtl"
            className="font-normal text-2xl leading-relaxed text-rose sm:text-3xl"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Together with families */}
          <p className="mx-auto mt-4 max-w-sm font-familjen text-[13px] leading-[1.8] tracking-[0.02em] text-ivory/85 sm:text-base">
            With the blessings of Allah, together with our families, we joyfully invite you to celebrate the Nikah of
          </p>

          {/* Bride */}
          <div className="mt-5">
            <h1 className="font-gloock text-[clamp(2.8rem,8vw,3.5rem)] font-normal leading-none text-ivory">
              Hazra
            </h1>

            {/* Bride's parents */}
            <p className="mt-3 font-familjen text-[10px] font-medium uppercase tracking-[0.2em] text-rose">
              D/O
            </p>

            <p className="mt-1 font-familjen text-[13px] leading-relaxed text-ivory/90 sm:text-sm">
              Mr. Abdul Naser & Mrs. Shehana
            </p>

            {/* Bride's grandparents */}
            <p className="mx-auto mt-2 max-w-xs font-familjen text-[11px] leading-[1.8] text-ivory/65 sm:text-xs">
              Grand daughter of late PP Ahammed Koya Haji & Ayshakutty
              <span className="block">
                and P. Moidunny Haji & Subaida
              </span>
            </p>
          </div>

          {/* Ampersand */}
          <p className="my-3 font-pinyon text-4xl leading-none text-rose">
            &
          </p>

          {/* Groom */}
          <div>
            <h1 className="font-gloock text-[clamp(2.8rem,8vw,3.5rem)] font-normal leading-none text-ivory">
              Thameem
            </h1>

            {/* Groom's parents */}
            <p className="mt-3 font-familjen text-[10px] font-medium uppercase tracking-[0.2em] text-rose">
              S/O
            </p>

            <p className="mt-1 font-familjen text-[13px] leading-relaxed text-ivory/90 sm:text-sm">
              Mr. Mayin Karuthedath & Mrs. Fathima Zuhara
            </p>

            {/* Groom's grandparents */}
            <p className="mx-auto mt-2 max-w-xs font-familjen text-[11px] leading-[1.8] text-ivory/65 sm:text-xs">
              Grand son of late Alavi Karuthedath & Kadiyumma
              <span className="block">
                and late Muhammed MK & Kadheeja
              </span>
            </p>
          </div>

          {/* Decorative divider */}
          <div className="my-4 flex w-28 items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rose/70" />
            <span className="h-2 w-2 rotate-45 border border-rose/80" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rose/70" />
          </div>

          {/* Closing */}
          <p className="max-w-sm font-pinyon text-[21px] leading-[1.35] text-rose sm:text-2xl">
            Your presence and duas would make this beautiful occasion even more special.
          </p>

        </div>

        {/* Left velvet curtain */}
        <div
          className="absolute -top-[2%] -bottom-[2%] left-0 w-[52%] bg-[#5a0712] bg-cover bg-center shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage: `url('${media.velvetBg}')`,
            transformOrigin: '0 0',
            transform: leftTransform,
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Right velvet curtain */}
        <div
          className="absolute -top-[2%] -bottom-[2%] right-0 w-[52%] bg-[#5a0712] bg-cover bg-right shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage: `url('${media.velvetBg}')`,
            transformOrigin: '100% 0',
            transform: rightTransform,
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Scroll hint */}
        <p
          className="pointer-events-none absolute bottom-[calc(30px+env(safe-area-inset-bottom))] left-0 right-0 m-0 text-center font-pinyon text-[26px] text-rose"
          style={{ opacity: hintOpacity }}
          aria-hidden="true"
        >
          {curtain.scrollHint}
        </p>

      </div>
    </section>
  );
}
