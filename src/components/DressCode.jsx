
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { invitationData } from '../data/invitationData';

const defaultCountdown = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
};

export default function DressCode() {
  const [timeLeft, setTimeLeft] = useState(defaultCountdown);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  // Target wedding date and time
  const targetDate = useMemo(
    () => new Date(invitationData.event.startDate).getTime(),
    [invitationData.event.startDate]
  );

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        setTimeLeft(defaultCountdown);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((distance / 3600000) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((distance / 60000) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
      });
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  // Scroll reveal animation
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-6';

  const countdownUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ox text-ivory"
    >
      <div className="mx-auto w-full max-w-[480px] px-5 text-center sm:px-6">

        {/* Heading */}
        <p
          className={`mb-6 font-pinyon text-[28px] leading-none text-rose transition-all duration-1000 ease-out ${revealClass}`}
        >
          Counting down
        </p>

        <h2
          className={`mb-7 font-gloock text-[clamp(38px,10vw,64px)] font-normal leading-[0.98] tracking-[-0.02em] text-ivory transition-all duration-1000 ease-out delay-150 ${revealClass}`}
        >
          Until our wedding day
        </h2>

        {/* Wedding details */}
        <p
          className={`mx-auto mb-10 text-[11px] uppercase leading-relaxed tracking-[0.13em] text-ivory/70 transition-all duration-1000 ease-out delay-300 sm:text-[13px] ${revealClass}`}
        >
          04-12-2026
          <span className="mx-2">·</span>
          {invitationData.event.timeDisplay}
          <span className="mx-2">·</span>
          {invitationData.event.venueName}
        </p>

        {/* Countdown - Single horizontal row */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {countdownUnits.map((unit, index) => (
            <div
              key={unit.label}
              style={{
                transitionDelay: `${450 + index * 150}ms`,
              }}
              className={`flex min-w-0 min-h-[85px] flex-col items-center justify-center rounded-[16px] border border-ivory/20 bg-white/5 px-1 py-3 shadow-[0_20px_60px_rgba(21,9,13,0.18)] backdrop-blur-[2px] transition-all duration-1000 ease-out sm:min-h-[110px] sm:rounded-[22px] ${revealClass}`}
            >
              <div className="font-gloock text-[clamp(25px,7vw,48px)] leading-none tabular-nums text-rose">
                {unit.value}
              </div>

              <div className="mt-2 text-[8px] uppercase tracking-[0.12em] text-ivory/70 sm:text-[10px]">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
