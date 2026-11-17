import React, { useEffect, useRef } from 'react';
import { invitationData } from '../data/invitationData';

export default function Finale() {
  const canvasRef = useRef(null);
  const { couple, media, footer } = invitationData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = media.petalImg;

    const particles = [];
    let isIntersecting = false;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (w, h, initialSpread) => ({
      x: Math.random() * w,
      y: initialSpread ? Math.random() * h : -30,
      s: 9 + Math.random() * 13,
      r: Math.random() * 6.3,
      vr: (Math.random() - 0.5) * 0.04,
      vy: 0.5 + Math.random() * 1.1,
      ph: Math.random() * 6.3,
      a: 0.55 + Math.random() * 0.35,
    });

    const tick = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      ctx.clearRect(0, 0, W, H);

      if (img.naturalWidth) {
        particles.forEach((p) => {
          p.y += p.vy;
          p.ph += 0.02;
          p.x += Math.sin(p.ph) * 0.6;
          p.r += p.vr;

          if (p.y > H + 30) {
            Object.assign(p, spawn(W, H, false));
          }

          const k = (p.s * 2.2) / Math.max(img.naturalWidth, img.naturalHeight);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.r);
          ctx.globalAlpha = p.a;
          ctx.drawImage(
            img,
            (-img.naturalWidth * k) / 2,
            (-img.naturalHeight * k) / 2,
            img.naturalWidth * k,
            img.naturalHeight * k
          );
          ctx.restore();
        });
      }

      if (isIntersecting) {
        animId = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && !animId) {
        resize();
        const rect = canvas.getBoundingClientRect();
        if (!particles.length) {
          for (let i = 0; i < 22; i++) {
            particles.push(spawn(rect.width, rect.height, true));
          }
        }
        animId = requestAnimationFrame(tick);
      } else if (!isIntersecting && animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    });

    observer.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [media.petalImg]);

  return (
    <>
      <section
        id="finale"
        className="relative overflow-hidden pt-[110px] pb-[120px] px-6 text-center bg-car text-ivory"
      >
        {/* Floating rose petals canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          aria-hidden="true"
        />

        {/* Vintage arches couple portrait */}
        <figure className="relative mx-auto w-[min(72vw,280px)] z-[2] m-0">
          <img
            src={media.couplePhoto}
            alt={`${couple.bride} and ${couple.groom}`}
            loading="lazy"
            className="block w-full aspect-[3/4] object-cover rounded-t-full shadow-2xl"
          />
        </figure>

        <p className="relative mt-[34px] font-pinyon text-[34px] leading-none text-rose z-[2]">
          {couple.closingSalutation}
        </p>

        <h2 className="relative mt-2 font-gloock font-normal text-[clamp(52px,15vw,70px)] leading-[0.92] text-ivory z-[2]">
          {couple.bride}
          <i className="block font-pinyon not-italic text-[0.5em] leading-[0.8] my-[0.06em] text-rose">
            &amp;
          </i>
          {couple.groom}
        </h2>

        <p className="relative mt-[18px] text-[14px] tracking-[0.1em] opacity-80 z-[2]">
          {couple.romanNumeralDate}
        </p>
      </section>

      {/* Footer credits */}
      <footer className="block py-6 px-6 pb-[calc(100px+env(safe-area-inset-bottom))] text-center text-[12px] opacity-60 bg-ox text-ivory">
        {footer.madeWithText}{' '}
        <a
          href={footer.agencyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-[3px] hover:opacity-100"
        >
          {footer.agencyName}
        </a>
        {footer.agencyPrompt}
      </footer>
    </>
  );
}
