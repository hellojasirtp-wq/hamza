
import React, { forwardRef } from 'react';
import { invitationData } from '../data/invitationData';

const Hero = forwardRef(
  (
    {
      guestName,
      isOpened,
      isPlaying,
      isStill,
      onVideoEnded,
    },
    videoRef
  ) => {
    const { couple, cover, media } = invitationData;

    // Personalized guest greeting
    const personalizedText = guestName
      ? couple.personalizedTagline(guestName)
      : null;

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
        {/* Background container with poster image */}
        <div
          className="absolute inset-0 bg-ox bg-center bg-cover transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${
              isStill ? media.posterLast : media.posterFirst
            }')`,
          }}
          aria-hidden="true"
        >
          {/* Darkening vignette overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              isOpened ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(ellipse 75% 45% at 50% 50%, rgba(18,0,4,0.55), rgba(18,0,4,0.25) 70%), rgba(18,0,4,0.25)',
            }}
          />

          {/* Video element */}
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {/* Scaled stage container */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[9/16] pointer-events-none z-[2]"
          style={{
            width: 'max(100cqw, 56.25cqh)',
            containerType: 'inline-size',
          }}
        >
          {guestName && (
            <p className="hidden" id="forGuest">
              Dear {guestName}, we invite you
            </p>
          )}

          <div className="absolute left-[10%] right-[10%] top-[36%] text-center">

            {/* Bismillah */}
            <p
              className={`m-0 mb-[2.5cqw] text-[6cqw] leading-relaxed transition-all duration-[1600ms] ${
                isOpened
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[2cqw]'
              }`}
              dir="rtl"
              style={{
                fontFamily: "'Amiri', serif",
              }}
            >
              {couple.bismillah}
            </p>

            {/* Wedding tagline */}
            <p
              className={`m-0 font-pinyon text-[5.5cqw] leading-snug transition-all duration-[1600ms] delay-[200ms] ${
                isOpened
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[2cqw]'
              }`}
            >
              {couple.tagline}
            </p>

            {/* Personalized guest greeting */}
            {personalizedText && (
              <p
                className={`mt-[2cqw] font-pinyon text-[5cqw] leading-snug transition-all duration-[1600ms] delay-[300ms] ${
                  isOpened
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[2cqw]'
                }`}
              >
                {personalizedText}
              </p>
            )}

            {/* Couple names */}
            <h1
              className={`mt-[5cqw] font-gloock font-normal leading-[0.86] transition-all duration-[1600ms] delay-[350ms] ${
                isOpened
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[2cqw]'
              }`}
            >
              <span className="block text-[10.5cqw] tracking-[-0.02em]">
                {couple.bride}
              </span>

              <i className="block font-pinyon not-italic text-[7cqw] leading-[0.7] my-[1.4cqw] text-rose">
                &amp;
              </i>

              <span className="block text-[10.5cqw] tracking-[-0.02em]">
                {couple.groom}
              </span>
            </h1>

            {/* Wedding date */}
            <p
              className={`mt-[4.6cqw] font-familjen text-[3.6cqw] tracking-[0.04em] transition-all duration-[1600ms] delay-[1100ms] ${
                isOpened
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[2cqw]'
              }`}
            >
              {couple.romanNumeralDate}
            </p>
          </div>
        </div>

        {/* CTA to jump down to RSVP */}
        <a
          href="#rsvp"
          className={`absolute left-5 right-5 bottom-[calc(18px+env(safe-area-inset-bottom))] z-[3] max-w-col mx-auto flex items-center justify-center min-h-[54px] rounded-full bg-ivory text-wine font-medium text-[15px] no-underline transition-all duration-[1400ms] delay-[2000ms] hover:bg-rose ${
            isOpened ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {cover.replyButtonText}
        </a>

      </header>
    );
  }
);

Hero.displayName = 'Hero';

export default Hero;
