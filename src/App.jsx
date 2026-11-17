import React, { useState, useEffect, useRef } from 'react';
import NoiseOverlay from './components/NoiseOverlay';
import MusicButton from './components/MusicButton';
import Cover from './components/Cover';
import Hero from './components/Hero';
import Curtain from './components/Curtain';
import WaxSeal from './components/WaxSeal';
import EveningTimeline from './components/EveningTimeline';
import VenueSpotlight from './components/VenueSpotlight';
import Countdown from './components/Countdown';
import NotesDeck from './components/NotesDeck';
import RSVPForm from './components/RSVPForm';
import FAQ from './components/FAQ';
import Finale from './components/Finale';
import FloatingDock from './components/FloatingDock';
import { invitationData } from './data/invitationData';

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [isCoverGone, setIsCoverGone] = useState(false);
  const [isCoverWaiting, setIsCoverWaiting] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStill, setIsStill] = useState(false);
  const [isRSVPSent, setIsRSVPSent] = useState(false);

  const videoRef = useRef(null);
  const musicRef = useRef(null);

  // Parse ?g=GuestName query parameter
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const g = params.get('g');
      if (g) {
        setGuestName(g.trim().slice(0, 60));
      }
    } catch (_) {}
  }, []);

  // Lock body scroll while cover is open
  useEffect(() => {
    if (!isCoverGone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCoverGone]);

  const handleOpenInvitation = () => {
    setIsCoverWaiting(true);

    // Play background music
    if (musicRef.current) {
      musicRef.current.play();
    }

    // Play video
    const video = videoRef.current;
    if (video) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          // Hide cover text once video starts rolling
          setTimeout(() => {
            setIsCoverGone(true);
          }, 300);

          // After OPEN_AT seconds (around 8.5s) or when ended, reveal hero
          const interval = setInterval(() => {
            if (video.currentTime >= 8.5 || video.ended) {
              clearInterval(interval);
              setIsOpened(true);
            }
          }, 100);
        })
        .catch(() => {
          // If video autoplay fails, immediately switch to still frame
          setIsStill(true);
          setIsCoverGone(true);
          setIsOpened(true);
        });
    } else {
      setIsStill(true);
      setIsCoverGone(true);
      setIsOpened(true);
    }
  };

  const handleSkipInvitation = () => {
    const video = videoRef.current;
    if (video) {
      try {
        video.currentTime = video.duration || 8.6;
      } catch (_) {}
    }
    setIsStill(true);
    setIsCoverGone(true);
    setIsOpened(true);
    if (musicRef.current) {
      musicRef.current.play();
    }
  };

  const handleVideoEnded = () => {
    setIsOpened(true);
  };

  return (
    <div className="relative min-h-screen bg-ox text-ivory selection:bg-car selection:text-ivory">
      {/* Film grain noise canvas */}
      <NoiseOverlay alpha={12} />

      {/* Floating music toggle */}
      <MusicButton ref={musicRef} audioSrc={invitationData.media.audioTrack} />

      {/* Opening envelope ribbon cover */}
      <Cover
        guestName={guestName}
        isGone={isCoverGone}
        isWaiting={isCoverWaiting}
        onOpen={handleOpenInvitation}
        onSkip={handleSkipInvitation}
      />

      {/* Main invitation content */}
      <main>
        {/* 1. Hero / Chandelier hall */}
        <Hero
          ref={videoRef}
          guestName={guestName}
          isOpened={isOpened}
          isPlaying={isPlaying}
          isStill={isStill}
          onVideoEnded={handleVideoEnded}
        />

        {/* 2. Velvet curtains scroll section */}
        <Curtain guestName={guestName} />

        {/* 3. Wax seal interactive press & date reveal */}
        <WaxSeal />

        {/* 4. The evening itinerary horizontal scroll */}
        <EveningTimeline />

        {/* 5. Palazzo Rosso flashlight spotlight & venue details */}
        <VenueSpotlight />

        {/* 6. Wedding countdown */}
        <Countdown />

        {/* 7. Swipeable notes deck */}
        <NotesDeck />

        {/* 8. RSVP response & ticket confirmation */}
        <RSVPForm
          defaultGuestName={guestName}
          onRSVPSubmitted={() => setIsRSVPSent(true)}
        />

        {/* 9. FAQ accordion */}
        <FAQ />

        {/* 10. Finale with falling petals & vintage portrait */}
        <Finale />
      </main>

      {/* Floating RSVP reply button */}
      <FloatingDock isRSVPSent={isRSVPSent} />
    </div>
  );
}
