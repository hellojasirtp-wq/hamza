/**
 * ==============================================================================
 * INVITATION CONFIGURATION & CONTENT DATA
 * ==============================================================================
 * Wedding Invitation: Hazra & Thameem
 * Date: 04/12/2026 (Friday, 4 December 2026) at 5:00 PM
 * Venue: K hills resort, Farook
 * ==============================================================================
 */

export const invitationData = {
  // ----------------------------------------------------------------------------
  // COUPLE & HERO DETAILS
  // ----------------------------------------------------------------------------
  couple: {
    groom: "Thameem",
    bride: "Hazra",
    tagline: "By the grace of Allah and with the blessings of our families, we are getting married",
    // When personalizing via ?g=GuestName:
    personalizedTagline: (guestName) => `Dear ${guestName}, we are getting married`,
    weddingDateText: "Friday, the fourth of December",
    romanNumeralDate: "04 · 12 · 2026",
    closingSalutation: "With love,",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    dua: "بارك الله لكما وبارك عليكما وجمع بينكما في خير",
  },

  // ----------------------------------------------------------------------------
  // EVENT & CALENDAR DETAILS
  // ----------------------------------------------------------------------------
  event: {
    title: "Nikkah ceremony",
    startDate: "2026-12-04T18:00:00+05:30",
    // ISO string: 04 Dec 2026, 5:00 PM
    endDate: "2026-12-04T22:30:00",
    timeDisplay: "6:00 PM",
    venueName: "K hills resort",
    venueAddress: "Farook",
    mapEmbedUrl: "https://maps.google.com/maps?q=Klay+Hills+Resorts+%26+Spa,+Farook&t=&z=15&ie=UTF8&iwloc=&output=embed",
    icsFile: "/wedding.ics",
  },

  // ----------------------------------------------------------------------------
  // COVER / OPENING ENVELOPE GATE
  // ----------------------------------------------------------------------------
  cover: {
    defaultTitle: "For you, with love",
    personalizedTitle: (guestName) => `${guestName}, this evening is for you`,
    hint: "Untie the ribbon",
    skipButtonText: "Skip",
    replyButtonText: "Reply to the invitation",
  },

  // ----------------------------------------------------------------------------
  // VELVET CURTAINS & LETTER SECTION
  // ----------------------------------------------------------------------------
  curtain: {
    sectionLabel: "A letter",
    defaultSalutation: "Dear family & friends,",
    personalizedSalutation: (guestName) => `Dear ${guestName},`,
    letterBody: "May Allah bless our union with His Mercy. Together with our families, we joyfully invite you to celebrate our wedding with us.",
    signature: "Hazra & Thameem",
    scrollHint: "Scroll to open the curtain",
  },

  // ----------------------------------------------------------------------------
  // WAX SEAL INTERACTIVE DATE REVEAL
  // ----------------------------------------------------------------------------
  waxSeal: {
    sectionLabel: "Seal the date",
    pressHint: "Press and hold the seal",
    sealedSuccessText: "Sealed with love & prayers",
    metaText: "6 pm · K hills resort, Farook",
    calendarButtonText: "Add to calendar",
    // 9 words revealed progressively as the wax seal is held down:
    wordsLine1: ["Friday"],
    wordsLine2: ["4", "-", "1", "2", "-", "2", "0", "2", "6"],
  },

  // ----------------------------------------------------------------------------
  // THE EVENING ITINERARY / TIMELINE (Horizontal Scroll)
  // ----------------------------------------------------------------------------
  itinerary: {
    sectionLabel: "The evening",
    events: [
      {
        time: "4:30 pm",
        title: "Arrival",
        desc: "Welcome drinks & guest reception in the courtyard",
        bg: "bg-wine",
      },
      {
        time: "6:00 pm",
        title: "The Reception",
        desc: "Welcoming Hazra & Thameem beneath the chandelier",
        bg: "bg-car",
      },
      {
        time: "6:00 pm",
        title: "Portraits",
        desc: "Capturing memories with near & dear family and friends",
        bg: "bg-ox",
      },
      {
        time: "7:00 pm",
        title: "Grand Feast",
        desc: "A long table, candles, and traditional wedding dinner",
        bg: "bg-wine",
      },
      {
        time: "9:00 pm",
        title: "Celebration",
        desc: "Warm wishes, prayers, and laughter with our loved ones",
        bg: "bg-car",
      },
      {
        time: "10:30 pm",
        title: "Goodnight",
        desc: "With gratitude, blessings, and prayers as cars wait at the gate",
        bg: "bg-ox",
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // VENUE & SPOTLIGHT
  // ----------------------------------------------------------------------------
  venue: {
    sectionLabel: "The venue",
    title: "K hills resort",
    address: "Farook",
    spotlightHint: "Move your finger to light the venue",
    directionsButtonText: "Directions",
    calendarButtonText: "Add to calendar",
    parkingNote: "Wheelchair accessible.",
  },

  // ----------------------------------------------------------------------------
  // DRESS CODE
  // ----------------------------------------------------------------------------
  dressCode: {
    sectionLabel: "Dress code",
    title: "Festive Elegance\nin shades of red",
    shades: [
      { name: "Oxblood", color: "#3a0710", k: 0 },
      { name: "Garnet", color: "#6e0c1c", k: 1 },
      { name: "Carmine", color: "#9a1221", k: 2 },
      { name: "Rose", color: "#c9787a", k: 3 },
      { name: "Blush", color: "#e9c6bf", k: 4 },
      { name: "Ivory", color: "#f7ece8", k: 5 },
    ],
    looks: {
      herCaption: "Her · festive evening attire",
      herImage: "/media/dress-1-red.jpg",
      himCaption: "Him · dark tailoring or traditional formal",
      himImage: "/media/dress-2-red.jpg",
    },
    adviceNote: "Kindly wear celebratory festive attire. Modest and elegant.",
  },

  // ----------------------------------------------------------------------------
  // GOOD TO KNOW / NOTES DECK
  // ----------------------------------------------------------------------------
  notesDeck: {
    sectionLabel: "Good to know",
    swipeHint: "Swipe the card away",
    cards: [
      {
        id: 1,
        title: "Prayers",
        text: "Your presence and heartfelt prayers are the most precious gift to us as we begin our new life together.",
        num: "1 of 4",
      },
      {
        id: 2,
        title: "Our Families",
        text: "With best compliments from Mayin & Zuhara (Parents of the Groom) and Abdul Naseer & Shehana (Parents of the Bride).",
        num: "2 of 4",
      },
      {
        id: 3,
        title: "Photographs",
        text: "Our photographers will capture every moment. Relax, celebrate, and every picture will be shared with you.",
        num: "3 of 4",
      },
      {
        id: 4,
        title: "Assistance",
        text: "For any assistance or questions on the wedding day, call our family coordinator:",
        phoneNumber: "+91 98765 43210",
        phoneLink: "tel:+919876543210",
        num: "4 of 4",
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // RSVP SECTION & TICKET
  // ----------------------------------------------------------------------------
  rsvp: {
    deadlineLabel: "Kindly reply by 20 November",
    heading: "Will you be there?",
    subheading: "We are saving you a chair",
    nameLabel: "Your full name",
    nameError: "Please write your name so we know who replied",
    attendanceLegend: "Will you come?",
    attendanceError: "Please choose one option",
    attendanceOptions: [
      { val: "yes", label: "Yes, I will be there" },
      { val: "no", label: "Sadly, I can’t come" },
      { val: "later", label: "I’ll reply a bit later" },
    ],
    partsLegend: "Which parts will you join?",
    partsOptions: [
      { val: "Reception", label: "Reception, 6 pm" },
      { val: "Dinner", label: "Grand Feast" },
      { val: "Celebration", label: "Celebration & blessing" },
    ],
    plusLabel: "Coming with me",
    plusPlaceholder: "Partner’s full name",
    plusHelpText: "Leave empty if you are coming alone",
    childrenLabel: "Children",
    childPlaceholder: (num) => `Child ${num}: name and age`,
    menuLegend: "Your main course preference",
    menuOptions: ["Biryani & Meat", "Fish & Seafood", "Vegetarian", "Vegan"],
    dietaryLabel: "Allergies or dietary needs",
    dietaryPlaceholder: "For example, no nuts, gluten free",
    drinksLegend: "What would you like to drink?",
    drinksOptions: [
      "Fresh Juice",
      "Mocktails",
      "Tea & Coffee",
      "Soft Drinks",
      "Water",
    ],
    transportLegend: "How will you get there?",
    transportOptions: [
      { val: "By car, need parking", label: "By car, I need parking" },
      { val: "Own transportation", label: "Own transportation" },
    ],
    accommodationLegend: "Do you need help with a place to stay?",
    accommodationOptions: ["Yes, please", "No, thanks"],
    songLabel: "A song or wish for the couple",
    songPlaceholder: "Your favorite melody or prayer",
    phoneLabel: "Phone or WhatsApp for reminders",
    phonePlaceholder: "+91 00000 00000",
    phoneHelpText: "Only for the reminder before the wedding and sharing photographs",
    wishLabel: "A wish or prayer for the couple",
    submitButtonText: "Send my reply",

    // Confirmation screen
    confirmationHeadings: {
      yes: "Your chair is waiting",
      no: "Thank you for letting us know",
      later: "We will keep your chair",
    },
    confirmationMessages: {
      yes: "May Allah bless you. We will send you a reminder before the celebration.",
      no: "We will miss your presence. Please keep us in your prayers.",
      later: "We will send you a reminder a week before the wedding.",
    },
    ticketTitle: "Your place at our table",
    ticketMeta: "Friday, 4 December 2026 · 6 pm\nK hills resort, Farook",
    saveTicketButtonText: "Save the ticket to my phone",
    changeReplyButtonText: "Change my reply",
  },

  // ----------------------------------------------------------------------------
  // FAQ (FREQUENTLY ASKED QUESTIONS)
  // ----------------------------------------------------------------------------
  faq: {
    sectionLabel: "Questions",
    items: [
      {
        q: "What is the wedding date and time?",
        a: "The celebration takes place on Friday, 4 December 2026 starting at 6:00 PM.",
      },
      {
        q: "Where is K hills resort located?",
        a: "The nikkah is at K hills resort (Klay Hills Resorts & Spa) in Farook. Directions can be accessed via the Google Maps button above.",
      },
      {
        q: "Is there parking available at K hills resort?",
        a: "Yes, the resort has a dedicated parking area for guests.",
      },
      {
        q: "Is the venue wheelchair accessible?",
        a: "Yes, the venue has wheelchair accessible entrances and facilities.",
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // MEDIA ASSET PATHS
  // ----------------------------------------------------------------------------
  media: {
    audioTrack: "/media/wedding-song.mp3",
    audioTitle: "Barakallahu Lakuma - Islamic Wedding Music",
    introVideo: "/media/film.mp4",
    posterFirst: "/media/film-first.jpg",
    posterLast: "/media/film-last.jpg",
    velvetBg: "/media/velvet-bg.jpg",
    waxSealImg: "/media/seal-red.png",
    tablePhoto: "/media/khills-resort.jpeg",
    couplePhoto: "/media/engagement.jpeg",
    petalImg: "/media/petal-red.png",
  },

  // ----------------------------------------------------------------------------
  // FOOTER & CREDITS
  // ----------------------------------------------------------------------------
  footer: {
    madeWithText: "With blessings & prayers for",
    agencyName: "Hazra & Thameem",
    agencyUrl: "#",
    agencyPrompt: " · 04.12.2026",
  },
};

export default invitationData;
