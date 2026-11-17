import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { invitationData } from '../data/invitationData';

export default function RSVPForm({ defaultGuestName = '', onRSVPSubmitted }) {
  const { rsvp, couple } = invitationData;

  const [name, setName] = useState(defaultGuestName);
  const [nameError, setNameError] = useState(false);
  const [come, setCome] = useState('');
  const [comeError, setComeError] = useState(false);
  const [parts, setParts] = useState(rsvp.partsOptions.map((p) => p.val));
  const [plus, setPlus] = useState('');
  const [kidsList, setKidsList] = useState([]);
  const [menu, setMenu] = useState('');
  const [food, setFood] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [trip, setTrip] = useState([]);
  const [stay, setStay] = useState('');
  const [song, setSong] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const [isSent, setIsSent] = useState(false);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    if (defaultGuestName) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName]);

  const toggleCheckbox = (list, setList, val) => {
    if (list.includes(val)) {
      setList(list.filter((x) => x !== val));
    } else {
      setList([...list, val]);
    }
  };

  const handleKidsCount = (delta) => {
    const nextCount = Math.max(0, Math.min(6, kidsList.length + delta));
    if (nextCount > kidsList.length) {
      setKidsList([...kidsList, '']);
    } else if (nextCount < kidsList.length) {
      setKidsList(kidsList.slice(0, nextCount));
    }
  };

  const updateKidInfo = (index, val) => {
    const updated = [...kidsList];
    updated[index] = val;
    setKidsList(updated);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7d0e1c', '#f7ece8', '#c9787a', '#3a0710', '#e9c6bf'],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasName = name.trim().length > 0;
    const hasCome = come.length > 0;

    setNameError(!hasName);
    setComeError(!hasCome);

    if (!hasName || !hasCome) return;

    const safePhone = phone.trim();
    const data = {
      name: name.trim(),
      come,
      parts,
      plus: plus.trim(),
      kids: kidsList.filter(Boolean),
      menu,
      food: food.trim(),
      drinks,
      trip,
      stay,
      song: song.trim(),
      phone: safePhone.startsWith('+') ? `'${safePhone}` : safePhone,
      msg: msg.trim(),
      at: new Date().toISOString(),
    };

    try {
      localStorage.setItem('inv-rsvp', JSON.stringify(data));
    } catch (_) {}

    // Automatically send RSVP to Google Sheets if configured
    if (rsvp.googleScriptUrl) {
      try {
        fetch(rsvp.googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).catch(() => {});
      } catch (_) {}
    }

    setSavedData(data);
    setIsSent(true);

    if (come === 'yes') {
      triggerConfetti();
    }

    if (onRSVPSubmitted) {
      onRSVPSubmitted();
    }
  };

  const handleSaveTicket = () => {
    if (!savedData) return;
    const W = 1080;
    const H = 1500;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#7d0e1c';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#f7ece8';
    ctx.textAlign = 'center';

    ctx.font = '400 34px "Familjen Grotesk", sans-serif';
    ctx.fillText(rsvp.ticketTitle, W / 2, 300);

    ctx.font = '400 120px "Gloock", serif';
    ctx.fillText(savedData.name, W / 2, 520, 900);

    const extra = [];
    if (savedData.plus) extra.push(`with ${savedData.plus}`);
    if (savedData.kids && savedData.kids.length) {
      extra.push(`${savedData.kids.length} ${savedData.kids.length > 1 ? 'children' : 'child'}`);
    }
    const extraText = extra.join(' and ');

    ctx.font = '400 40px "Familjen Grotesk", sans-serif';
    if (extraText) {
      ctx.fillText(extraText, W / 2, 600, 900);
    }

    ctx.font = '400 150px "Pinyon Script", cursive';
    ctx.fillText(`${couple.bride} & ${couple.groom}`, W / 2, 900, 960);

    ctx.font = '400 40px "Familjen Grotesk", sans-serif';
    const metaLines = rsvp.ticketMeta.split('\n');
    metaLines.forEach((line, idx) => {
      ctx.fillText(line, W / 2, 1100 + idx * 60);
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'our-table.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: `${couple.bride} & ${couple.groom}` }).catch(() => {});
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'our-table.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  const handleReset = () => {
    setIsSent(false);
  };

  return (
    <section id="rsvp" className="relative py-[clamp(96px,26vw,140px)] bg-ivory text-ink">
      <div className="max-w-col mx-auto px-6 text-left">
        <div className="text-center">
          <p className="mb-4 font-pinyon text-[30px] leading-none text-car opacity-85">
            {rsvp.deadlineLabel}
          </p>
          <h2 className="m-0 font-gloock font-normal text-[clamp(44px,12.5vw,56px)] leading-[0.95] text-car">
            {isSent ? rsvp.confirmationHeadings[come] || rsvp.heading : rsvp.heading}
          </h2>
          <p className="mt-3 mb-[34px] text-[15px] opacity-70">
            {isSent ? rsvp.confirmationMessages[come] || rsvp.subheading : rsvp.subheading}
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="gName" className="block text-[13px] font-medium text-car mb-2">
                {rsvp.nameLabel}
              </label>
              <input
                id="gName"
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim()) setNameError(false);
                }}
                className="w-full min-h-[46px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[22px] py-1 text-ink"
                required
              />
              {nameError && (
                <p className="mt-1.5 text-[14px] text-car">
                  {rsvp.nameError}
                </p>
              )}
            </div>

            {/* Attendance Choice */}
            <fieldset className="border-0 p-0 m-0">
              <legend className="block text-[13px] font-medium text-car mb-2">
                {rsvp.attendanceLegend}
              </legend>
              <div className="grid gap-2">
                {rsvp.attendanceOptions.map((opt) => (
                  <label
                    key={opt.val}
                    className={`flex items-center min-h-[52px] px-5 rounded-full cursor-pointer transition-colors text-[16px] ${
                      come === opt.val
                        ? 'bg-car text-ivory font-medium'
                        : 'bg-[rgba(143,16,32,0.07)] text-ink hover:bg-[rgba(143,16,32,0.12)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="come"
                      value={opt.val}
                      checked={come === opt.val}
                      onChange={() => {
                        setCome(opt.val);
                        setComeError(false);
                      }}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {comeError && (
                <p className="mt-1.5 text-[14px] text-car">{rsvp.attendanceError}</p>
              )}
            </fieldset>

            {/* Conditional fields for "Yes" */}
            {come === 'yes' && (
              <div className="space-y-6 pt-2">
                {/* Which parts */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.partsLegend}
                  </legend>
                  <div className="grid gap-2">
                    {rsvp.partsOptions.map((p) => {
                      const checked = parts.includes(p.val);
                      return (
                        <label
                          key={p.val}
                          className={`flex items-center min-h-[52px] px-5 rounded-full cursor-pointer transition-colors text-[16px] ${
                            checked
                              ? 'bg-car text-ivory font-medium'
                              : 'bg-[rgba(143,16,32,0.07)] text-ink'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheckbox(parts, setParts, p.val)}
                            className="sr-only"
                          />
                          {p.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Plus One */}
                <div>
                  <label htmlFor="plus" className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.plusLabel}
                  </label>
                  <input
                    id="plus"
                    name="plus"
                    type="text"
                    value={plus}
                    onChange={(e) => setPlus(e.target.value)}
                    placeholder={rsvp.plusPlaceholder}
                    className="w-full min-h-[46px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[22px] py-1 text-ink placeholder:font-familjen placeholder:text-[16px] placeholder:opacity-50"
                  />
                  <small className="block mt-1.5 text-[12px] opacity-65">
                    {rsvp.plusHelpText}
                  </small>
                </div>

                {/* Children counter */}
                <div>
                  <label className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.childrenLabel}
                  </label>
                  <div className="inline-flex items-center rounded-full bg-[rgba(143,16,32,0.07)]">
                    <button
                      type="button"
                      onClick={() => handleKidsCount(-1)}
                      className="w-[46px] h-[44px] border-0 bg-transparent text-[22px] cursor-pointer text-ink font-familjen"
                      aria-label="Fewer children"
                    >
                      −
                    </button>
                    <output className="min-w-[36px] text-center font-gloock text-[22px]">
                      {kidsList.length}
                    </output>
                    <button
                      type="button"
                      onClick={() => handleKidsCount(1)}
                      className="w-[46px] h-[44px] border-0 bg-transparent text-[22px] cursor-pointer text-ink font-familjen"
                      aria-label="More children"
                    >
                      +
                    </button>
                  </div>

                  {kidsList.length > 0 && (
                    <div className="grid gap-2 mt-3">
                      {kidsList.map((k, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={k}
                          onChange={(e) => updateKidInfo(idx, e.target.value)}
                          placeholder={rsvp.childPlaceholder(idx + 1)}
                          className="w-full min-h-[42px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[18px] py-1 text-ink"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Main course choice */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.menuLegend}
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {rsvp.menuOptions.map((item) => (
                      <label
                        key={item}
                        className={`flex items-center justify-center min-h-[52px] px-3 rounded-full cursor-pointer transition-colors text-[15px] ${
                          menu === item
                            ? 'bg-car text-ivory font-medium'
                            : 'bg-[rgba(143,16,32,0.07)] text-ink'
                        }`}
                      >
                        <input
                          type="radio"
                          name="menu"
                          value={item}
                          checked={menu === item}
                          onChange={() => setMenu(item)}
                          className="sr-only"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Dietary requirements */}
                <div>
                  <label htmlFor="food" className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.dietaryLabel}
                  </label>
                  <input
                    id="food"
                    type="text"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    placeholder={rsvp.dietaryPlaceholder}
                    className="w-full min-h-[46px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[20px] py-1 text-ink placeholder:font-familjen placeholder:text-[15px] placeholder:opacity-50"
                  />
                </div>

                {/* Drinks */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.drinksLegend}
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {rsvp.drinksOptions.map((d) => {
                      const checked = drinks.includes(d);
                      return (
                        <label
                          key={d}
                          className={`flex items-center justify-center min-h-[52px] px-3 rounded-full cursor-pointer transition-colors text-[15px] ${
                            checked
                              ? 'bg-car text-ivory font-medium'
                              : 'bg-[rgba(143,16,32,0.07)] text-ink'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheckbox(drinks, setDrinks, d)}
                            className="sr-only"
                          />
                          {d}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Transportation */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.transportLegend}
                  </legend>
                  <div className="grid gap-2">
                    {rsvp.transportOptions.map((t) => {
                      const checked = trip.includes(t.val);
                      return (
                        <label
                          key={t.val}
                          className={`flex items-center min-h-[52px] px-5 rounded-full cursor-pointer transition-colors text-[16px] ${
                            checked
                              ? 'bg-car text-ivory font-medium'
                              : 'bg-[rgba(143,16,32,0.07)] text-ink'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheckbox(trip, setTrip, t.val)}
                            className="sr-only"
                          />
                          {t.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Stay accommodation */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.accommodationLegend}
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {rsvp.accommodationOptions.map((s) => (
                      <label
                        key={s}
                        className={`flex items-center justify-center min-h-[52px] px-3 rounded-full cursor-pointer transition-colors text-[15px] ${
                          stay === s
                            ? 'bg-car text-ivory font-medium'
                            : 'bg-[rgba(143,16,32,0.07)] text-ink'
                        }`}
                      >
                        <input
                          type="radio"
                          name="stay"
                          value={s}
                          checked={stay === s}
                          onChange={() => setStay(s)}
                          className="sr-only"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Dance song request */}
                <div>
                  <label htmlFor="song" className="block text-[13px] font-medium text-car mb-2">
                    {rsvp.songLabel}
                  </label>
                  <input
                    id="song"
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder={rsvp.songPlaceholder}
                    className="w-full min-h-[46px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[20px] py-1 text-ink placeholder:font-familjen placeholder:text-[15px] placeholder:opacity-50"
                  />
                </div>
              </div>
            )}

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-[13px] font-medium text-car mb-2">
                {rsvp.phoneLabel}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={rsvp.phonePlaceholder}
                className="w-full min-h-[46px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[22px] py-1 text-ink placeholder:font-familjen placeholder:text-[15px] placeholder:opacity-50"
              />
              <small className="block mt-1.5 text-[12px] opacity-65">
                {rsvp.phoneHelpText}
              </small>
            </div>

            {/* Wish */}
            <div>
              <label htmlFor="msg" className="block text-[13px] font-medium text-car mb-2">
                {rsvp.wishLabel}
              </label>
              <textarea
                id="msg"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full min-h-[84px] border-0 border-b border-[rgba(143,16,32,0.35)] focus:border-car focus:outline-none bg-transparent font-gloock text-[20px] py-1 text-ink resize-y"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center min-h-[56px] rounded-full bg-car text-ivory font-familjen font-medium text-[15px] hover:bg-opacity-95 transition-opacity cursor-pointer mt-6"
            >
              {rsvp.submitButtonText}
            </button>
          </form>
        ) : (
          /* Confirmation Ticket state */
          <div className="text-center pt-2">
            {come === 'yes' && savedData && (
              <div className="my-6 mx-auto max-w-[320px] p-[34px_24px] rounded-[26px] bg-car text-ivory text-center shadow-lg">
                <p className="m-0 text-[13px] opacity-80">{rsvp.ticketTitle}</p>
                <p className="mt-3 font-gloock text-[44px] leading-none text-ivory break-words">
                  {savedData.name}
                </p>
                {(savedData.plus || (savedData.kids && savedData.kids.length > 0)) && (
                  <p className="mt-1.5 text-[14px] opacity-85">
                    {[
                      savedData.plus ? `with ${savedData.plus}` : null,
                      savedData.kids && savedData.kids.length
                        ? `${savedData.kids.length} ${
                            savedData.kids.length > 1 ? 'children' : 'child'
                          }`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' and ')}
                  </p>
                )}
                <p className="mt-[18px] text-[14px] leading-[1.7] opacity-85 whitespace-pre-line">
                  {rsvp.ticketMeta}
                </p>
              </div>
            )}

            {come === 'yes' && (
              <button
                onClick={handleSaveTicket}
                type="button"
                className="w-full flex items-center justify-center min-h-[56px] rounded-full bg-car text-ivory font-familjen font-medium text-[15px] hover:bg-opacity-90 transition-opacity cursor-pointer"
              >
                {rsvp.saveTicketButtonText}
              </button>
            )}

            <div className="mt-3">
              <button
                onClick={handleReset}
                type="button"
                className="w-full flex items-center justify-center min-h-[52px] rounded-full bg-[rgba(143,16,32,0.08)] text-car font-familjen font-medium text-[15px] hover:bg-[rgba(143,16,32,0.15)] transition-colors cursor-pointer"
              >
                {rsvp.changeReplyButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
