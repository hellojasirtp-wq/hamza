import React, { useEffect, useRef, useState } from 'react';
import { handleAddToCalendar } from '../utils/calendar';
import { invitationData } from '../data/invitationData';

export default function WaxSeal() {
  const { waxSeal, media } = invitationData;
  const wordsLine1 = waxSeal.wordsLine1;
  const wordsLine2 = waxSeal.wordsLine2;
  const allWords = [...wordsLine1, ...wordsLine2];

  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const animRef = useRef(null);
  const lastTimeRef = useRef(0);
  const holdingRef = useRef(false);
  const sealedRef = useRef(false);

  useEffect(() => {
    holdingRef.current = isHolding;
  }, [isHolding]);

  useEffect(() => {
    sealedRef.current = isSealed;
  }, [isSealed]);

  const loop = (time) => {
    const dt = lastTimeRef.current ? Math.min(50, time - lastTimeRef.current) : 16;
    lastTimeRef.current = time;

    setProgress((prev) => {
      if (sealedRef.current) return 1;
      const rate = holdingRef.current ? dt / 1400 : -dt / 900;
      const next = Math.max(0, Math.min(1, prev + rate));

      if (next >= 1 && !sealedRef.current) {
        setIsSealed(true);
        try {
          if (navigator.vibrate) navigator.vibrate([15, 40, 25]);
        } catch (_) {}
        return 1;
      }
      return next;
    });

    if (holdingRef.current || (!sealedRef.current && progress > 0)) {
      animRef.current = requestAnimationFrame(loop);
    } else {
      lastTimeRef.current = 0;
    }
  };

  const startHold = (e) => {
    if (isSealed) return;
    e.preventDefault();
    setIsHolding(true);
    lastTimeRef.current = 0;
    animRef.current = requestAnimationFrame(loop);
  };

  const stopHold = () => {
    setIsHolding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsSealed(true);
      setProgress(1);
    }
  };

  const p = progress;
  const buttonScale = 1 - p * 0.1;

  return (
    <section className="relative py-[clamp(96px,26vw,140px)] bg-ivory text-ink">
      <div className="max-w-col mx-auto px-6 text-center">
        <p className="mb-4 font-pinyon text-[30px] leading-none text-ink opacity-85">
          {waxSeal.sectionLabel}
        </p>

        {/* Wax seal interactive button */}
        <button
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerCancel={stopHold}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={handleKeyDown}
          type="button"
          aria-label="Press and hold the seal to reveal the date"
          className={`block w-[190px] h-[190px] mx-auto mt-2.5 p-0 border-0 rounded-full bg-transparent cursor-pointer [touch-action:none] select-none transition-transform duration-75 ${
            isSealed ? 'animate-thud' : ''
          }`}
          style={{
            transform: `scale(${buttonScale})`,
          }}
        >
         <img
  src={media.waxSealImg}
  alt="Wax seal"
  className="block w-full h-full pointer-events-none"
/>
        </button>

        <p className="mt-[18px] font-pinyon text-[28px] leading-none text-car transition-all">
          {isSealed ? waxSeal.sealedSuccessText : waxSeal.pressHint}
        </p>

        {/* Revealed date words */}
        <div
          className="mt-[30px] mx-auto max-w-[12ch] font-gloock text-[clamp(40px,11.6vw,52px)] leading-none text-car"
          aria-label={allWords.join(' ')}
        >
          <div className="mb-1">
            {wordsLine1.map((w, i) => {
              const a = Math.max(0, Math.min(1, p * allWords.length - i));
              const opacity = isSealed ? 1 : 0.06 + 0.94 * a;
              const blur = isSealed ? 0 : (1 - a) * 6;
              return (
                <span
                  key={w + i}
                  className="inline-block mr-1.5 transition-[opacity,filter] duration-200"
                  style={{
                    opacity,
                    filter: `blur(${blur}px)`,
                  }}
                >
                  {w}{' '}
                </span>
              );
            })}
          </div>

          <div>
            {wordsLine2.map((w, i) => {
              const globalIdx = wordsLine1.length + i;
              const a = Math.max(0, Math.min(1, p * allWords.length - globalIdx));
              const opacity = isSealed ? 1 : 0.06 + 0.94 * a;
              const blur = isSealed ? 0 : (1 - a) * 6;
              return (
                <span
                  key={w + i}
                  className="inline-block mr-1.5 transition-[opacity,filter] duration-200"
                  style={{
                    opacity,
                    filter: `blur(${blur}px)`,
                  }}
                >
                  {w}{' '}
                </span>
              );
            })}
          </div>
        </div>

        <p className="my-5 text-[15px] opacity-75">
          {waxSeal.metaText}
        </p>

        <button
          onClick={handleAddToCalendar}
          type="button"
          className="inline-flex items-center justify-center min-h-[52px] px-[26px] rounded-full bg-[rgba(143,16,32,0.1)] text-car font-familjen font-medium text-[14px] tracking-[0.02em] hover:bg-[rgba(143,16,32,0.2)] transition-colors cursor-pointer"
        >
          {waxSeal.calendarButtonText}
        </button>
      </div>
    </section>
  );
}
