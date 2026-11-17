import { invitationData } from '../data/invitationData';

export function handleAddToCalendar() {
  const ua = navigator.userAgent || '';
  const isIOS =
    /iPhone|iPad|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);

  const { event } = invitationData;
  const title = event.title || 'Hazra & Thameem Wedding';
  const location = event.venueAddress || event.venueName || 'K hills resort, Farook, Kerala';
  const details = `By the grace of Allah and with the blessings of our families, you are cordially invited to celebrate the Nikkah ceremony and wedding reception of Hazra & Thameem on Friday, 4 December 2026.\n\nVenue: ${location}\nTime: ${event.timeDisplay || '5:00 PM'}`;

  // 04 Dec 2026, 17:00 IST to 22:30 IST (11:30 UTC to 17:00 UTC)
  const startUTC = '20261204T113000Z';
  const endUTC = '20261204T170000Z';

  // Google Calendar URL (Native app on Android, standard on Android/Chrome)
  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startUTC}/${endUTC}&location=${encodeURIComponent(
    location
  )}&details=${encodeURIComponent(details)}`;

  // ICS File absolute URL (Native Apple Calendar on iOS / macOS)
  const icsPath = event.icsFile || './wedding.ics';
  const absoluteIcsUrl = new URL(icsPath, window.location.href).href;

  if (isIOS) {
    // iOS Safari natively prompts "Add to Calendar" when navigating to a .ics file
    window.location.href = absoluteIcsUrl;
  } else if (isAndroid) {
    // Android automatically launches the Google Calendar app via intent
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  } else {
    // Desktop (Mac/PC): opens Google Calendar; also triggers .ics download for Apple/Outlook users
    const win = window.open(gCalUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = absoluteIcsUrl;
    }
  }
}
