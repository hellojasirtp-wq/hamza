import React, { useEffect, useRef, useState } from 'react';
import { handleAddToCalendar } from '../utils/calendar';
import { invitationData } from '../data/invitationData';

export default function VenueSpotlight() {
  const pinRef = useRef(null);
  const photoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 45 });

  const { venue, event, media } = invitationData;

  useEffect(() => {
    const handleScroll = () => {
      if (!pinRef.current) return;
      const rect = pinRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      const s = Math.max(0, Math.min(1, currentScroll / Math.max(1, totalScrollable)));
      setScrollProgress(s);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100;
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)) * 100;
    setSpotPos({ x, y });
  };

  const radius = 14 + scrollProgress * 90;
  const clipPath = `circle(${radius}% at ${spotPos.x}% ${spotPos.y}%)`;

  const venueTitle = event.venueName || venue.title;
  const venueAddress = event.venueAddress || venue.address;
  const mapQuery = encodeURIComponent(`${venueTitle} ${venueAddress}`.trim());
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const mapEmbedUrl =
    event.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="venue" className="relative bg-wine text-ivory">
      {/* Interactive Spotlight Sticky Container */}
      <div ref={pinRef} className="relative h-[210vh]">
        <div
          onPointerMove={handlePointerMove}
          className="sticky top-0 h-screen h-[100svh] overflow-hidden"
        >
          {/* Base dark backdrop */}
          <div className="absolute inset-0 bg-[#0c0204]" />

          {/* Table photo revealed by flashlight circle */}
          <div
            ref={photoRef}
            role="img"
            aria-label={venueTitle}
            className="absolute inset-0 bg-black bg-cover bg-center brightness-[0.62] [touch-action:pan-y] transition-[clip-path] duration-75"
            style={{
              backgroundImage: `url('${media.tablePhoto}')`,
              clipPath,
              WebkitClipPath: clipPath,
            }}
          />

          {/* Hint */}
          <p
            className="absolute left-0 right-0 top-[calc(30px+env(safe-area-inset-top))] m-0 text-center font-pinyon text-[26px] text-rose pointer-events-none drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)]"
            aria-hidden="true"
          >
            {venue.spotlightHint}
          </p>

          {/* Venue title at bottom of spotlight */}
          <div className="absolute left-0 right-0 bottom-[calc(96px+env(safe-area-inset-bottom))] px-6 text-center pointer-events-none drop-shadow-[0_2px_22px_rgba(0,0,0,0.7)]">
            <p className="mb-2 font-pinyon text-[30px] leading-none text-rose opacity-85">
              {venue.sectionLabel}
            </p>
            <h2 className="m-0 font-gloock font-normal text-[clamp(40px,12vw,68px)] leading-[0.92]">
              {venueTitle}
            </h2>
            <p className="mt-3 text-[15px] opacity-90">
              {venueAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Details, actions, map */}
      <div className="max-w-col mx-auto px-6 pt-10 pb-[110px] text-center">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[52px] px-2.5 rounded-full bg-car text-ivory font-familjen font-medium text-[14px] tracking-[0.02em] hover:bg-opacity-90 transition-colors"
          >
            {venue.directionsButtonText}
          </a>
          <button
            onClick={handleAddToCalendar}
            type="button"
            className="inline-flex items-center justify-center min-h-[52px] px-2.5 rounded-full bg-[rgba(247,236,232,0.12)] text-ivory font-familjen font-medium text-[14px] tracking-[0.02em] hover:bg-[rgba(247,236,232,0.2)] transition-colors cursor-pointer"
          >
            {venue.calendarButtonText}
          </button>
        </div>

        {/* Embedded styled map */}
        <div className="mt-4 rounded-[22px] overflow-hidden">
          <iframe
            className="block w-full aspect-[4/3] border-0 bg-ink grayscale contrast-125 sepia-[0.6] hue-rotate-[-30deg] saturate-[1.8] brightness-[0.85]"
            title={`Map: ${venueTitle}`}
            src={mapEmbedUrl}
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          />
        </div>

        <p className="mt-5 text-[15px] opacity-75">
          {venue.parkingNote}
        </p>
      </div>
    </section>
  );
}
