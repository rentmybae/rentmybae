import type { LEGAL_SLUGS } from "./nav";
import { ADDR, ENT, GRV, MAIL, N, OFFICER, type LegalDoc } from "./legal/common";
import { privacyPolicy } from "./legal/privacy";
import { termsAndConditions } from "./legal/terms";

export type { Block, LegalDoc, Section } from "./legal/common";
export { EFFECTIVE_DATE, LEGAL_VERSION, legalDetailsComplete } from "./legal/common";

export const legalDocs: Record<(typeof LEGAL_SLUGS)[number], LegalDoc> = {
  "privacy-policy": privacyPolicy,
  "terms-and-conditions": termsAndConditions,

  "refund-policy": {
    title: "Refund Policy",
    description: `When refunds are available for ${N} bookings and memberships, and how they are processed.`,
    sections: [
      { heading: "Booking refunds", body: ["Refund eligibility depends on when a booking is cancelled and by whom, as set out in the Cancellation Policy. Typical cases: companion cancels or does not attend (full refund); we cancel for safety or policy reasons (full refund); customer cancels within the free window (full refund); later customer cancellations [[partial/none — confirm]]."] },
      { heading: "Membership refunds", body: ["Memberships are [[refundable/non-refundable — confirm; consumer-law review needed]]. Membership fees are not refunded because a profile is rejected unless [[confirm]]. Membership never guarantees approval, and we show this before payment."] },
      { heading: "How refunds are paid", body: ["Refunds go to the original payment method through the gateway. Timelines depend on banks and gateways, typically [[X–Y business days — confirm]]."] },
      { heading: "Platform fees and taxes", body: ["[[State whether platform fees and GST are refunded.]]"] },
      { heading: "Disputes", body: ["Raise a dispute from your booking or via Support with details and evidence. Refunds above a threshold require a second administrator's approval. Chargebacks are tracked and may suspend payouts."] }
    ]
  },

  "cancellation-policy": {
    title: "Cancellation Policy",
    description: `How cancellations and no-shows work for ${N} bookings.`,
    sections: [
      { heading: "Customer cancellations", body: ["Free cancellation up to [[N hours]] before start; after that [[fee/percentage]]. The applicable terms are shown on the booking page and saved with your booking."] },
      { heading: "Companion cancellations", body: ["Companions should cancel as early as possible. Repeated late cancellations may lead to warnings, reduced visibility or suspension. The customer receives a full refund."] },
      { heading: "No-shows", body: ["If a party does not attend within [[N minutes]] of the start time and the other party reports it, the booking is marked a no-show and handled per this policy after review. Timer expiry alone is never proof a service was completed."] },
      { heading: "Safety cancellations", body: ["You may leave or cancel at any time if you feel unsafe. Report it through the Safety Centre; we will review and may refund."] },
      { heading: "Rescheduling", body: ["Reschedule requests need both parties' agreement and confirmed availability."] }
    ]
  },

  "community-guidelines": {
    title: "Community Guidelines",
    description: `Respect, consent and honesty standards for everyone on ${N}.`,
    sections: [
      { heading: "Consent first", body: ["Respect boundaries at all times. Payment for a booking never implies consent to physical or intimate contact. Anyone can say no or end a meeting at any time."] },
      { heading: "Be honest", body: ["Use your real identity and your own photos. No impersonation, fake reviews or misleading profiles."] },
      { heading: "Be respectful", body: ["No harassment, stalking, threats, discrimination, hate speech or unwanted sexual messages or images."] },
      { heading: "Keep it legal and non-exploitative", body: ["No sexual services, trafficking, coercion, blackmail or other illegal activity. Adults only."] },
      { heading: "Protect privacy", body: ["Don't share, record or publish others' personal information, messages or images without consent."] },
      { heading: "Enforcement", body: ["We may warn, restrict, suspend or remove accounts, and may report serious cases to authorities."] }
    ]
  },

  safety: {
    title: "Safety Centre",
    description: `Safety tools and guidance on ${N}: reporting, blocking, safe meetings and emergencies.`,
    intro: `${N} is not an emergency service. In an emergency in India, call 112 immediately.`,
    sections: [
      { heading: "Reporting a user", body: ["Report profiles, messages or behaviour from the profile or booking page, or through Support. Include what happened and any evidence. Reports are reviewed by our safety team; urgent threats to life must go to 112 first."] },
      { heading: "Blocking a user", body: ["Blocking prevents the other person from finding or booking you and from contacting you through the platform."] },
      { heading: "What verification does — and doesn't", body: ["We check identity and age with a verification provider and moderate profiles. This reduces risk but is not a background or criminal check and cannot guarantee anyone's conduct. Use your own judgement."] },
      { heading: "Safe meeting practices", body: ["Meet in public, well-lit places for first bookings; tell a friend where you are; arrange your own transport; keep payments on the platform; do not share your home address; trust your instincts and leave if you feel uncomfortable."] },
      { heading: "Consent", body: ["A paid booking never implies consent to intimacy. Boundaries can change at any moment and must be respected."] },
      { heading: "Booking assistance and complaints", body: ["Contact Support from your booking for help with cancellations, disputes or concerns. We acknowledge complaints and share outcomes where we can. See Grievance Redressal for escalation."] },
      { heading: "Emergency guidance", body: ["Call 112 (India's emergency number) for immediate danger. Other national helplines include 1091 (women's helpline) and 181 (women in distress) [[confirm current numbers before launch]]."] }
    ]
  },

  "code-of-conduct": {
    title: "Code of Conduct",
    description: `Professional conduct expected from companions and customers using ${N}.`,
    sections: [
      { heading: "For companions", body: ["Arrive on time, represent yourself accurately, stay within the services you listed, keep communication on-platform, and respect customer privacy."] },
      { heading: "For customers", body: ["Be punctual, pay on-platform, respect the listed service and boundaries, and treat companions as you would any professional."] },
      { heading: "Both", body: ["No intoxicated driving, drug use presented as part of the booking, weapons, recording without consent, or pressure to extend or escalate."] },
      { heading: "Consequences", body: ["Breaches may lead to warnings, withheld payouts, suspension or removal, and referral to authorities where required."] }
    ]
  },

  "cookie-policy": {
    title: "Cookie Policy",
    description: `The cookies and similar technologies ${N} uses and how to control them.`,
    sections: [
      { heading: "What cookies are", body: ["Small files stored on your device that help sites remember sessions and preferences."] },
      { heading: "Essential cookies", body: ["Used for sign-in, session security and fraud prevention. They cannot be disabled without breaking the service."] },
      { heading: "Analytics cookies", body: ["Optional. [[Confirm: analytics (e.g. Google Analytics 4) is only loaded after consent.]] We never send identity documents or sensitive personal data to analytics."] },
      { heading: "Managing cookies", body: ["You can block or delete cookies in your browser settings. Essential cookies will still be needed to log in."] },
      { heading: "Changes", body: ["We will update this page if our cookie use changes."] }
    ]
  },

  "grievance-redressal": {
    title: "Grievance Redressal",
    description: `How to raise a complaint with ${N} and how we handle it.`,
    sections: [
      { heading: "Grievance Officer", body: [`Name: ${OFFICER}. Email: ${GRV}. Address: ${ADDR}. [[Business owner to appoint and publish officer details as required under applicable Indian IT/consumer rules.]]`] },
      { heading: "How to complain", body: ["Email the Grievance Officer with your registered email/mobile, booking reference (if any), a description and any evidence."] },
      { heading: "What to expect", body: ["We will acknowledge your complaint within [[24 hours — confirm]] and aim to resolve it within [[15 days — confirm]]."] },
      { heading: "Data-protection requests", body: ["Requests to access, correct or erase data, or withdraw consent, can be sent to the same address."] },
      { heading: "Emergencies", body: ["This channel is not monitored for emergencies. Call 112."] }
    ]
  },

  accessibility: {
    title: "Accessibility",
    description: `${N}'s commitment to an accessible website and how to report barriers.`,
    sections: [
      { heading: "Our commitment", body: ["We aim to make the site usable with keyboards and assistive technology, with clear labels, visible focus, sufficient contrast and responsive layouts, working toward WCAG 2.1 AA. [[Confirm after an accessibility audit.]]"] },
      { heading: "Known limitations", body: ["Some third-party components (payment and identity-verification screens) are outside our control."] },
      { heading: "Feedback", body: [`If you hit a barrier, email ${MAIL} with the page and the problem. We will respond and try to fix it.`] }
    ]
  }
};
