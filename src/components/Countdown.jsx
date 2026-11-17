import React, { useEffect, useMemo, useRef, useState } from 'react';
import { invitationData } from '../data/invitationData';

const emptyTime = { days: '00', hours: '00', minutes: '00', seconds: '00' };

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(emptyTime);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const targetTime = useMemo(
    () => new Date(invitationData.event.startDate).getTime(),
    []
  );

  useEffect(() => {
    const update = () => {
      const distance = targetTime - Date.now();
      if (distance <= 0) {
        setTimeLeft(emptyTime);
        return;
      }
      setTimeLeft({
        days: String(Math.floor(distance / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((distance / 3600000) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((distance / 60000) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [targetTime]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];
  const reveal = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <section
      id="countdown"
      ref={sectionRef}
      aria-labelledby="countdown-title"
      className="relative py-[clamp(96px,26vw,140px)] bg-ox text-ivory"
    >
      <div className="max-w-col mx-auto px-6 text-center">
        <p className={`mb-4 font-pinyon text-[30px] leading-none text-rose opacity-85 transition-all duration-1000 ease-out ${reveal}`}>
          Counting down
        </p>
        <h2 id="countdown-title" className={`mb-5 font-gloock font-normal text-[clamp(44px,12.5vw,56px)] leading-[0.95] tracking-[-0.01em] text-ivory transition-all duration-1000 ease-out delay-150 ${reveal}`}>
          Until our wedding day
        </h2>
        <p className={`mx-auto mb-8 text-[12px] tracking-[0.16em] uppercase leading-relaxed text-ivory/70 transition-all duration-1000 ease-out delay-300 ${reveal}`}>
          4-12-2026 <span className="mx-1.5">·</span>
          {invitationData.event.timeDisplay} <span className="mx-1.5">·</span>
          {invitationData.event.venueName}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {units.map((unit, index) => (
            <div
              key={unit.label}
              style={{ transitionDelay: `${450 + index * 120}ms` }}
              className={`flex min-h-[105px] flex-col items-center justify-center rounded-[20px] border border-ivory/20 bg-white/5 px-1.5 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-[2px] transition-all duration-1000 ease-out ${reveal}`}
            >
              <div className="font-gloock text-[clamp(26px,7vw,38px)] leading-none text-rose tabular-nums">{unit.value}</div>
              <div className="mt-2 text-[10px] tracking-[0.18em] uppercase text-ivory/70">{unit.label}</div>
            </div>
          ))}
        </div>
        <div style={{ transitionDelay: '1050ms' }} className={`mt-8 text-center transition-all duration-1000 ease-out ${reveal}`}>
          <p className="text-[12px] tracking-[0.14em] uppercase leading-relaxed text-ivory/65">
            {invitationData.event.venueAddress}
          </p>
        </div>
      </div>
    </section>
  );
}
