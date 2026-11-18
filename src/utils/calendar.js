import { invitationData } from '../data/invitationData';

export function handleAddToCalendar() {
  const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  const formatDate = (d) => d.replace(/[-:]/g, '').slice(0, 15);
  
  if (isApple && invitationData.event.icsFile) {
    const link = document.createElement('a');
    link.href = invitationData.event.icsFile;
    link.download = 'wedding.ics';
    link.click();
  } else {
    const gUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      invitationData.event.title
    )}&dates=${formatDate(invitationData.event.startDate)}/${formatDate(invitationData.event.endDate)}&location=${encodeURIComponent(
      invitationData.event.venueAddress
    )}&details=${encodeURIComponent('Our wedding invitation: ' + window.location.href.split(/[?#]/)[0])}`;
    window.open(gUrl, '_blank', 'noopener,noreferrer');
  }
}
