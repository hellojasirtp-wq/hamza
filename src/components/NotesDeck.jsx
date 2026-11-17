import React, { useState, useRef } from 'react';
import { invitationData } from '../data/invitationData';

export default function NotesDeck() {
  const { notesDeck } = invitationData;
  const [cards, setCards] = useState(notesDeck.cards);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyingDirection, setFlyingDirection] = useState(null); // -1 | 1 | null

  const dragStartRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (flyingDirection) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const flingCard = (dir) => {
    setFlyingDirection(dir);
    setTimeout(() => {
      setCards((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setFlyingDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 500);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 60) {
      flingCard(dragOffset.x < 0 ? -1 : 1);
    } else if (Math.abs(dragOffset.x) < 6 && Math.abs(dragOffset.y) < 6) {
      // Tap/click also cycles to next
      flingCard(1);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  return (
    <section className="relative py-[clamp(96px,26vw,140px)] bg-car text-ivory">
      <div className="max-w-col mx-auto px-6 text-center">
        <p className="mb-4 font-pinyon text-[30px] leading-none opacity-85">
          {notesDeck.sectionLabel}
        </p>

        {/* Deck container */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative h-[min(390px,72vw)] min-h-[290px] sm:h-[360px] mt-4 select-none [touch-action:pan-y] cursor-grab active:cursor-grabbing"
        >
          {cards.map((card, i) => {
            const isTop = i === 0;

            let cardTransform = `translateY(${i * 14}px) scale(${1 - i * 0.05})`;
            let opacity = 1;
            let transitionClass = 'transition-all duration-500 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]';

            if (isTop) {
              if (flyingDirection) {
                cardTransform = `translate(${flyingDirection * 140}%, ${dragOffset.y * 0.4}px) rotate(${flyingDirection * 24}deg)`;
                opacity = 0;
                transitionClass = 'transition-all duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.8,0.6)]';
              } else if (isDragging) {
                cardTransform = `translate(${dragOffset.x}px, ${dragOffset.y * 0.3}px) rotate(${dragOffset.x * 0.06}deg)`;
                transitionClass = 'transition-none';
              }
            }

            return (
              <article
                key={card.id}
                className={`absolute inset-0 flex flex-col justify-center p-[24px_22px] sm:p-[34px_30px] rounded-[26px] bg-ivory text-ink text-left shadow-[0_30px_40px_-30px_rgba(0,0,0,0.6)] ${transitionClass}`}
                style={{
                  zIndex: cards.length - i,
                  transform: cardTransform,
                  opacity,
                }}
              >
                <p className="m-0 font-gloock text-[32px] sm:text-[40px] leading-none text-car">
                  {card.title}
                </p>
                <p className="mt-4 text-[15px] sm:text-[17px] leading-[1.5] text-ink">
                  {card.text}{' '}
                  {card.phoneNumber && (
                    <a href={card.phoneLink || `tel:${card.phoneNumber}`} className="text-car underline">
                      {card.phoneNumber}
                    </a>
                  )}
                </p>
                <p className="mt-[22px] text-[12px] opacity-50">
                  {card.num}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-9 font-pinyon text-[26px] text-rose">
          {notesDeck.swipeHint}
        </p>
      </div>
    </section>
  );
}
