
import React, { forwardRef } from 'react';
import { invitationData } from '../data/invitationData';

const Hero = forwardRef(
  (
    {
      isOpened,
      isPlaying,
      isStill,
      onVideoEnded,
    },
    videoRef
  ) => {
    const { couple, media } = invitationData;

    // Get only the first initials
    const brideInitial = (couple.bride || 'H')
      .trim()
      .charAt(0)
      .toUpperCase();

    const groomInitial = (couple.groom || 'T')
      .trim()
      .charAt(0)
      .toUpperCase();

    return (
      <header
        id="top"
        className={`relative h-screen h-[100svh] min-h-[560px] overflow-hidden bg-ox text-ivory ${
          isOpened ? 'is-opened' : ''
        } ${isPlaying ? 'is-playing' : ''} ${
          isStill ? 'is-still' : ''
        }`}
        style={{ containerType: 'size' }}
      >
        {/* Background container */}
        <div
          className="absolute inset-0 isolate z-0 bg-ox bg-center bg-cover"
          style={{
            backgroundImage: `url('${
              isStill ? media.posterLast : media.posterFirst
            }')`,
          }}
          aria-hidden="true"
        >
          {/* Intro video */}
          {!isStill && (
            <video
              ref={videoRef}
              src={media.introVideo}
              poster={media.posterFirst}
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              disablePictureInPicture
              onEnded={onVideoEnded}
              className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${
                isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Background overlay - covers both image and video */}
          <div
            className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-1000 ${
              isOpened ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(25, 0, 8, 0.48) 0%,
                  rgba(25, 0, 8, 0.22) 35%,
                  rgba(25, 0, 8, 0.32) 65%,
                  rgba(25, 0, 8, 0.48) 100%
                ),
                radial-gradient(
                  ellipse 75% 50% at center,
                  rgba(20, 0, 5, 0.25),
                  rgba(20, 0, 5, 0.4)
                )
              `,
            }}
          />
        </div>

        {/* Centred hero content - 9:16 layout */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[2] aspect-[9/16] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'max(100cqw, 56.25cqh)',
            containerType: 'inline-size',
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5cqw] px-[9%] text-center">

            {/* TOP: Bismillah and translation */}
            <div className="w-full">

              {/* Arabic Bismillah */}
              <p
                dir="rtl"
                className={`mb-[3cqw] font-normal text-[7cqw] leading-relaxed text-ivory transition-all duration-[1600ms] ${
                  isOpened
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-[2cqw] opacity-0'
                }`}
                style={{
                  fontFamily: "'Amiri', serif",
                  textShadow: '0 2px 12px rgba(0,0,0,0.75)',
                }}
              >
                {couple.bismillah}
              </p>

              {/* English translation */}
              <p
                className={`mx-auto max-w-full pb-2 font-familjen text-[2.5cqw] font-semibold uppercase leading-[1.9] tracking-[0.32em] text-ivory/95 transition-all duration-[1600ms] delay-[300ms] ${
                  isOpened
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-[2cqw] opacity-0'
                }`}
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}
              >
                In the name of Allah, the most
                gracious, the most merciful
              </p>

            </div>

            {/* MIDDLE: Initial monogram */}
            <div
              className={`flex items-center justify-center transition-all duration-[1800ms] delay-[450ms] ${
                isOpened
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-[3cqw] scale-95 opacity-0'
              }`}
            >

              {/* Bride initial */}
              <span
                className="font-gloock text-[29cqw] font-normal leading-none tracking-[-0.08em] text-ivory drop-shadow-lg"
                style={{
                  textShadow: '0 3px 18px rgba(0,0,0,0.65)',
                }}
              >
                {brideInitial}
              </span>

              {/* Ampersand */}
              <span
                className="z-10 -mx-[1.5cqw] -mt-[1cqw] font-pinyon text-[18cqw] font-normal leading-none text-rose"
                style={{
                  textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                }}
              >
                &
              </span>

              {/* Groom initial */}
              <span
                className="font-gloock text-[29cqw] font-normal leading-none tracking-[-0.08em] text-ivory drop-shadow-lg"
                style={{
                  textShadow: '0 3px 18px rgba(0,0,0,0.65)',
                }}
              >
                {groomInitial}
              </span>

            </div>

            {/* BOTTOM: Tagline and date */}
            <div
              className={`w-full transition-all duration-[1600ms] delay-[800ms] ${
                isOpened
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-[2cqw] opacity-0'
              }`}
            >

              {/* Fine divider */}
              <div className="mx-auto h-px w-[88%] bg-gradient-to-r from-transparent via-rose/70 to-transparent" />

              {/* Main tagline */}
              <p
                className="mt-[8cqw] font-familjen text-[3.3cqw] font-semibold uppercase leading-[1.8] tracking-[0.32em] text-white"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                }}
              >
                We're Celebrating Our Nikah
              </p>

              {/* Wedding date */}
              <p
                className="mt-[4cqw] font-familjen text-[3.3cqw] font-medium uppercase leading-[1.8] tracking-[0.32em] text-ivory"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                }}
              >
                04-12-2026
              </p>

              {/* Decorative diamond */}
              <div className="mx-auto mt-[6cqw] h-[2cqw] w-[2cqw] rotate-45 bg-rose/90 shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />

            </div>
          </div>
        </div>

        {/* BOTTOM LEFT: Scroll indicator */}
        <div
          className={`pointer-events-none absolute bottom-[calc(22px+env(safe-area-inset-bottom))] left-6 z-20 transition-all duration-1000 ${
            isOpened
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0'
          }`}
        >
          <span
            className="font-familjen text-[10px] uppercase tracking-[0.3em] text-ivory"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
            }}
          >
            Scroll
          </span>
        </div>

      </header>
    );
  }
);

Hero.displayName = 'Hero';

export default Hero;
