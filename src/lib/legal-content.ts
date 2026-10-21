import { siteConfig } from "./config";
import type { LEGAL_SLUGS } from "./nav";

// Text in [[double brackets]] is rendered highlighted = needs business-owner / legal-counsel confirmation.
export type Section = { heading: string; body: string[] };
export type LegalDoc = { title: string; description: string; intro?: string; sections: Section[] };

const L = siteConfig.legal;
const N = siteConfig.name;
const ENT = L.entityName ?? "[[legal entity name]]";
const MAIL = L.contactEmail ?? "[[contact email]]";
const GRV = L.grievanceEmail ?? "[[grievance email]]";
const OFFICER = L.grievanceOfficer ?? "[[Grievance Officer name]]";
const ADDR = L.address ?? "[[registered address]]";

export const legalDocs: Record<(typeof LEGAL_SLUGS)[number], LegalDoc> = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: `How ${N} collects, uses, shares, protects and deletes personal information.`,
    intro: `${N} is operated by ${ENT} ("we", "us"), ${ADDR}. This policy explains how we handle personal information on this website and related services.`,
    sections: [
      { heading: "1. Introduction and platform identity", body: [`${N} is an adults-only marketplace connecting customers with verified companions for social activities. ${ENT} is the data fiduciary/controller for the data described here. Contact: ${MAIL}.`] },
      { heading: "2. Scope", body: ["This policy covers visitors, customers, companions and anyone who contacts us. It applies to our website, dashboards and any mobile app we publish. [[Confirm the exact list of services once launched.]]"] },
      { heading: "3. Information we collect", body: ["Account data, identity-verification data, profile content, booking and availability data, payment records, city/location data, support and safety communications, and technical data such as device, IP address and log data."] },
      { heading: "4. Registration and account information", body: ["Full legal name, email, mobile number, date of birth, city, PIN code, optional gender, account type, and a password (stored only as a salted hash by our authentication provider — we never see or store plaintext passwords)."] },
      { heading: "5. Identity-verification information", body: ["Companions (and, where required, customers) may be asked to submit government ID details, a selfie or liveness video and age evidence to a third-party identity-verification provider. [[Confirm provider, exact data collected and whether customers are also verified.]]", "Verification evidence is kept in private storage, never shown publicly, accessed only by authorised staff or the provider, and every access is logged."] },
      { heading: "6. Profile photos and introduction videos", body: ["Companions may upload photos and an optional short introduction video. Media is reviewed before publication. Only approved public media appears on public profiles; private verification media is stored separately."] },
      { heading: "7. Booking and availability information", body: ["Service, date, time, duration, price, status, cancellations, extensions and messages needed to run a booking. Exact home addresses and live locations are not shown on public profiles."] },
      { heading: "8. Payment and transaction records", body: ["Amounts, taxes, fees, commission, refunds, payout details and gateway references. Card numbers and CVVs are handled by the payment gateway and are never stored by us. [[Confirm payout bank-detail handling.]]"] },
      { heading: "9. Location and city information", body: ["We use your chosen city and PIN code to show relevant companions and comply with service-area rules. We do not collect continuous background location. [[Confirm if any live-location safety feature is added.]]"] },
      { heading: "10. Customer support and safety reports", body: ["Tickets, reports, blocks and related evidence are retained to investigate misuse, protect users and meet legal obligations."] },
      { heading: "11. Purposes and lawful basis", body: ["We process data to provide the service, verify eligibility, process payments, prevent fraud and abuse, keep users safe, comply with law, and — where you opt in — send updates. Processing is based on your consent, performance of our service and legitimate/legal uses permitted under applicable Indian law, including the Digital Personal Data Protection Act, 2023. [[Counsel to confirm legal bases and notice format.]]"] },
      { heading: "12. Sharing with service providers", body: ["We share only what is needed with hosting and database providers, authentication and SMS/email providers, payment gateways, identity-verification providers, analytics (non-sensitive events only) and professional advisers, under contractual confidentiality and security obligations. We may disclose data to authorities where legally required. We do not sell personal information."] },
      { heading: "13. Payment processor integrations", body: ["Payments are handled by [[payment gateway name]]. It processes card/UPI/bank data under its own privacy policy and security standards."] },
      { heading: "14. Identity-verification providers", body: ["Verification is performed by [[identity provider name]], which processes ID and biometric-type data under its own terms. We receive the verification outcome and limited reference data. Verification reduces but cannot eliminate risk."] },
      { heading: "15. Cookies and analytics", body: ["We use essential cookies for sign-in and security, and optional analytics only if you consent. See the Cookie Policy. We never send identity documents or sensitive personal data to analytics."] },
      { heading: "16. Data security", body: ["We use encryption in transit, access controls, private storage with short-lived signed links, audit logs and rate limiting. No system is perfectly secure, so we cannot guarantee absolute security."] },
      { heading: "17. Retention and deletion", body: ["We keep data only as long as needed for the purposes above and legal/accounting requirements. [[Define retention periods: identity evidence, transaction records, support/safety records, deleted-account data.]]"] },
      { heading: "18. Your rights", body: ["Subject to law, you may request access, correction, erasure, withdrawal of consent, grievance redressal and nomination. Contact us via the details below."] },
      { heading: "19. Account deletion", body: ["You can request deletion from Account Settings. We will delete or anonymise data except what we must retain for legal, tax, fraud-prevention or open-dispute purposes."] },
      { heading: "20. Data breach response", body: ["If a breach affects your personal data we will investigate, contain it, and notify affected users and authorities as required by law. [[Confirm internal incident-response owner and notification timelines.]]"] },
      { heading: "21. Children and adult-only eligibility", body: [`${N} is for people aged 18 and over. We do not knowingly collect data from minors and will delete it and close the account if we learn of it.`] },
      { heading: "22. International transfers", body: ["Some providers may process data outside India. We use contractual safeguards where required. [[Confirm hosting regions and transfer position.]]"] },
      { heading: "23. Policy updates", body: ["We will post updated versions here with a new effective date and notify you of material changes."] },
      { heading: "24. Contact and grievance", body: [`${ENT}, ${ADDR}. Email: ${MAIL}. Grievance Officer: ${OFFICER}, ${GRV}. See the Grievance Redressal page.`] }
    ]
  },

  "terms-and-conditions": {
    title: "Terms & Conditions",
    description: `The rules for using ${N}: eligibility, bookings, payments, conduct, and disputes.`,
    intro: `These Terms govern your use of ${N}, operated by ${ENT}. By creating an account or using the service you agree to them.`,
    sections: [
      { heading: "1. Acceptance of terms", body: ["If you do not agree, do not use the service."] },
      { heading: "2. Eligibility and minimum age", body: ["You must be at least 18 and legally able to contract in India. We may require proof of age and identity and may refuse or end access if you do not meet eligibility."] },
      { heading: "3. Accounts and security", body: ["Provide accurate information, keep credentials confidential, and tell us promptly of unauthorised use. One person, one account."] },
      { heading: "4. Customer responsibilities", body: ["Book honestly, pay as agreed, respect the companion's stated boundaries and services, meet in appropriate public settings where advised, and follow the Community Guidelines."] },
      { heading: "5. Companion responsibilities", body: ["Provide truthful profile information and only your own media, keep availability accurate, honour confirmed bookings, and follow the Code of Conduct. Companions are independent and not our employees. [[Counsel to confirm characterisation.]]"] },
      { heading: "6. Identity verification and approval", body: ["Listing requires completed verification and moderator approval. We may reject, suspend or remove profiles at our discretion. Verification does not guarantee a person's character or conduct."] },
      { heading: "7. Membership and subscriptions", body: ["Companions may need a paid membership to be listed. Price, duration, taxes and renewal terms are shown before payment. Membership does not guarantee identity verification or profile approval. [[Confirm lifetime-plan meaning and renewal terms.]]"] },
      { heading: "8. Hourly booking rules", body: ["Bookings are for the selected service, date, start time and duration. Prices are calculated by our servers and shown before payment. Services are social companionship only."] },
      { heading: "9. Availability and confirmation", body: ["A booking is confirmed only when payment is verified and, where required, the companion accepts. We prevent overlapping bookings but cannot guarantee availability."] },
      { heading: "10. Booking extensions", body: ["Extensions need a request from one party, approval from the other, availability and any additional payment. Neither party can extend unilaterally."] },
      { heading: "11. Payment processing", body: ["Payments are processed by a third-party gateway. A booking or membership is active only after we receive verified payment confirmation, not merely a redirect."] },
      { heading: "12. Platform fees and commission", body: ["We charge platform fees and/or commission as disclosed before payment. [[Insert fee and commission structure and GST treatment.]]"] },
      { heading: "13. Companion earnings and payouts", body: ["Eligible earnings are payable after completion and any dispute window, subject to verified payout details and our payout schedule. [[Insert schedule, minimums and holds.]]"] },
      { heading: "14. Cancellation and no-shows", body: ["See the Cancellation Policy. No-show handling follows that policy."] },
      { heading: "15. Refunds and disputes", body: ["See the Refund Policy. Raise disputes through support within the stated period."] },
      { heading: "16. Ratings and reviews", body: ["Only participants in completed bookings may review. Reviews must be honest and lawful; we may remove reviews that breach our rules."] },
      { heading: "17. User-generated content", body: ["You keep ownership of your content and grant us a licence to host and display it to operate the service. You confirm you own or have rights to it and consent of anyone shown."] },
      { heading: "18. Privacy", body: ["Our Privacy Policy explains how we handle your data."] },
      { heading: "19. Prohibited conduct", body: ["No fraud, fake profiles, impersonation, off-platform payment to avoid fees, scraping, harassment, hate speech, sharing others' private information, or attempts to breach security."] },
      { heading: "20. Harassment, coercion, exploitation and illegal activity", body: ["A paid booking never implies consent to any sexual or intimate activity, and consent can be withdrawn at any time. We prohibit sexual services, trafficking, coercion, exploitation, blackmail, and any illegal activity, and will suspend accounts and cooperate with authorities."] },
      { heading: "21. Suspension and termination", body: ["We may suspend or terminate accounts for breach, risk or legal reasons. You may close your account at any time, subject to open bookings and payments."] },
      { heading: "22. Intellectual property", body: [`The ${N} name, logo and site content belong to ${ENT} or its licensors. You may not use them without permission.`] },
      { heading: "23. Third-party services", body: ["We rely on third-party providers and are not responsible for their independent acts or outages beyond what law requires."] },
      { heading: "24. Availability and limitations", body: ["The service is provided \"as available\". We do not guarantee uninterrupted operation, specific outcomes, romantic results or the conduct of users."] },
      { heading: "25. Limitation of liability", body: ["To the extent permitted by law we are not liable for indirect or consequential loss, and our aggregate liability is limited to [[amount/formula — counsel to confirm enforceability]]."] },
      { heading: "26. Governing law and disputes", body: ["Indian law governs these Terms. [[Counsel to confirm jurisdiction, courts and any arbitration clause.]]"] },
      { heading: "27. Amendments", body: ["We may update these Terms. Continued use after notice means acceptance; material changes will be notified."] },
      { heading: "28. Contact and grievances", body: [`${ENT}, ${ADDR}. ${MAIL}. Grievance Officer: ${OFFICER}, ${GRV}.`] }
    ]
  },

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
