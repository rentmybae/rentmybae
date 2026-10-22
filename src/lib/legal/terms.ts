import { ADDR, CITIES, EFFECTIVE_DATE, ENT, GRV, MAIL, N, OFFICER, SITE, type LegalDoc } from "./common";

export const termsAndConditions: LegalDoc = {
  title: "Terms & Conditions",
  description: `The agreement between you and ${N}: eligibility, accounts, bookings, memberships, payments, safety rules, liability and disputes.`,
  intro: `These Terms & Conditions ("Terms") are a legally binding agreement between you and ${ENT} ("${N}", "we", "us", "our"), registered at ${ADDR}. They govern your use of ${SITE}, our dashboard and any ${N} mobile app (together, the "Platform"). By creating an account, ticking "I agree", or using the Platform, you confirm you have read, understood and accepted these Terms, our Privacy Policy, Refund Policy, Cancellation Policy, Community Guidelines and Code of Conduct. If you do not agree, do not use the Platform.`,
  summary: [
    "You must be 18 or older, and you must use your real identity.",
    `${N} offers non-sexual social companionship only. Paying for a booking never means anyone has agreed to physical or intimate contact.`,
    "Any request for, or offer of, sexual services leads to a permanent ban and may be reported to the police.",
    "Keep every payment and message on the Platform. Off-platform deals are not protected and are against these Terms.",
    "Companion membership pays for listing eligibility. It does not guarantee approval, bookings or earnings.",
    "Either person can end a meeting at any time if they feel unsafe. In an emergency, call 112."
  ],
  sections: [
    {
      heading: "1. Definitions",
      body: [
        { list: [
          "\"Platform\": the " + N + " website, dashboard, mobile apps and related services.",
          "\"User\" or \"you\": anyone who registers or uses the Platform.",
          "\"Customer\": a User who books a Companion's time.",
          "\"Companion\": a User who, after verification and approval, offers their time for social activities through a listed profile.",
          "\"Booking\": a confirmed, paid reservation of a Companion's time for a specific activity, date, start time and duration.",
          "\"Membership\": a paid plan that makes a verified Companion eligible to be listed.",
          "\"Content\": text, photos, video, reviews, messages and any other material uploaded to the Platform."
        ] }
      ]
    },
    {
      heading: "2. What " + N + " is and is not",
      body: [
        `${N} is an online marketplace that lets adults find and book other verified adults for social activities such as coffee, meals, films, shopping, events, weddings, city tours, networking events and hobbies, currently in ${CITIES}.`,
        `${N} acts as an intermediary under the Information Technology Act, 2000. We provide the technology to list profiles, manage bookings and process payments. We do not employ Companions, we do not supervise meetings, and we are not a party to what happens between Users at a meeting, except as described in these Terms.`,
        `${N} is not a dating service, escort service, matchmaking service or emergency service. It does not promise friendship, romance or any outcome.`
      ]
    },
    {
      heading: "3. Who can use the Platform",
      body: [
        "To use the Platform you must:",
        { list: [
          "Be at least 18 years old.",
          "Be legally able to enter a binding contract under the Indian Contract Act, 1872.",
          "Not have been banned from " + N + " before.",
          "Not be prohibited from using the service by any law that applies to you.",
          "Register only one account, in your own name, using your own mobile number and email."
        ] },
        "We may ask for proof of age and identity at any time. If you cannot provide it, or if we have reasonable grounds to believe you are under 18 or not who you say you are, we will suspend or close your account."
      ]
    },
    {
      heading: "4. Your account",
      body: [
        { list: [
          "Give accurate, current and complete information, and keep it up to date.",
          "Keep your password and OTPs secret. Our staff will never ask for them.",
          "You are responsible for everything done through your account until you tell us it has been compromised.",
          "Tell us immediately at " + MAIL + " if you suspect unauthorised use.",
          "You may not sell, transfer, lend or share your account."
        ] },
        "We verify your email at signup. We may also verify your mobile number by OTP. Companions must also complete identity verification before their profile is published."
      ]
    },
    {
      heading: "5. Consent and the companionship-only rule",
      body: [
        "This is the most important section of these Terms.",
        { list: [
          "All services on " + N + " are non-sexual social companionship only.",
          "Paying for a Booking buys a Companion's time and company for the activity booked. It does not buy, imply or create any right to physical contact, intimacy or any act the other person has not freely agreed to.",
          "Consent must be clear, freely given and can be withdrawn at any moment. \"No\" ends the matter.",
          "Requesting, offering, advertising or arranging sexual services, directly or with hints, code words or emojis, on or off the Platform, is strictly prohibited and may be an offence under the Immoral Traffic (Prevention) Act, 1956 and the Bharatiya Nyaya Sanhita, 2023.",
          "Either User may end a meeting immediately if they feel unsafe or uncomfortable. Ending a meeting for safety reasons will not be held against the person who leaves."
        ] },
        "Breaking this section leads to immediate and permanent removal, forfeiture of unpaid earnings connected to the breach, and reporting to law enforcement where appropriate."
      ]
    },
    {
      heading: "6. Rules for Customers",
      body: [
        { list: [
          "Book only activities shown on the Companion's profile, for the time and place in the Booking.",
          "Meet in public places, especially for a first Booking. Do not ask a Companion to come to a private residence or hotel room.",
          "Arrive on time and treat the Companion with the same respect you would show any professional.",
          "Do not ask for the Companion's personal phone number, social media or home address, or to meet outside the Platform.",
          "Pay only through the Platform. Tips, if you choose to give them, must also go through the Platform where that feature is available.",
          "Do not record, photograph or film a Companion without their clear permission.",
          "Do not be intoxicated to a degree that makes the Companion feel unsafe."
        ] }
      ]
    },
    {
      heading: "7. Rules for Companions",
      body: [
        { list: [
          "Your profile, photos and video must show you, be recent, and be truthful. No filters or edits that change how you look in a misleading way.",
          "List only activities you are willing to do, and only non-sexual activities.",
          "Keep your availability and rates accurate. Honour every Booking you accept.",
          "If you must cancel, do it as early as possible through the Platform. Repeated late cancellations or no-shows may lead to warnings, lower visibility or suspension.",
          "Do not ask Customers for money, gifts or contact details outside the Platform.",
          "Report any request for sexual services or any unsafe behaviour to us immediately.",
          "You are responsible for your own taxes on your earnings, including income tax and, where applicable, GST registration."
        ] },
        "Companions are independent individuals offering their own time. Nothing in these Terms makes a Companion an employee, agent or partner of " + N + ", and Companions decide for themselves whether to accept a Booking."
      ]
    },
    {
      heading: "8. Verification and profile approval",
      body: [
        "Before a Companion profile is listed, we check age and identity through our verification partner and review the profile, photos and video. We may approve, reject, request changes to, suspend or remove any profile, and we do not have to give detailed reasons where doing so would affect safety or our fraud controls.",
        "Verification confirms that a person is an adult and matches their ID at the time of checking. It is not a police or background check and does not guarantee anyone's behaviour. Always use your own judgement and follow our Safety Centre guidance."
      ]
    },
    {
      heading: "9. Companion membership",
      body: [
        "Companions may need an active Membership to be listed. Current plans (6 Months, 1 Year and Lifetime), prices and the GST included are shown on the Membership page before you pay.",
        { list: [
          "Membership makes you eligible to be listed. It does not guarantee verification approval, a number of Bookings, or any earnings.",
          "Membership starts when we receive confirmed payment from our payment partner, not when you are redirected back from the payment page.",
          "6-month and 1-year plans end on the expiry date shown in your dashboard. They do not renew automatically; we will remind you before expiry.",
          "\"Lifetime\" means for as long as your account remains active and in good standing, and as long as " + N + " operates the Membership programme. If we discontinue the programme within 3 years of your purchase, we will offer a pro-rata refund as described in the Refund Policy.",
          "Membership ends without refund if your account is suspended or closed for breaking these Terms.",
          "Refund rules for Membership are in the Refund Policy."
        ] }
      ]
    },
    {
      heading: "10. How Bookings work",
      body: [
        { sub: "10.1 Making a Booking" },
        "You choose a Companion, activity, date, start time and duration. Our server calculates the price, including any platform fee and GST, and shows the full amount before you pay. The price you see at checkout is the price you pay.",
        { sub: "10.2 Confirmation" },
        "A Booking is confirmed only when (a) we have received verified payment confirmation and (b) the Companion has accepted, where acceptance is required. Until then, the time slot is not guaranteed. Our system prevents two confirmed Bookings for the same Companion overlapping.",
        { sub: "10.3 Extensions" },
        "A meeting can be extended only if one User requests it on the Platform, the other User accepts, the Companion is available, and any extra amount is paid through the Platform. Nobody can be pressured into an extension.",
        { sub: "10.4 Cancellations and no-shows" },
        "Cancellations, rescheduling and no-shows are handled under the Cancellation Policy. The cancellation terms that applied when you booked are saved with your Booking.",
        { sub: "10.5 Completion" },
        "A Booking is completed when the booked time ends or both Users mark it complete. If either User raises a concern within 48 hours, we review it before releasing payment to the Companion."
      ]
    },
    {
      heading: "11. Prices, payments and taxes",
      body: [
        { list: [
          "All prices are in Indian Rupees (₹) and include GST unless stated otherwise.",
          "Payments are processed by [[payment gateway name]], an RBI-authorised payment aggregator. Your card, UPI or bank details are entered with them, not with us.",
          N + " collects Booking payments on behalf of Companions and deducts its platform fee or commission, which is shown before payment. [[Insert fee/commission structure.]]",
          "We issue tax invoices for amounts we charge, as required by GST law.",
          "If a payment fails or is reversed, the related Booking or Membership will not be activated, or will be cancelled.",
          "We may change prices for future purchases. A change never affects a Booking or Membership you have already paid for."
        ] }
      ]
    },
    {
      heading: "12. Companion earnings and payouts",
      body: [
        { list: [
          "Earnings for a completed Booking, minus the platform fee, become available after the 48-hour review window in section 10.5.",
          "Payouts are sent to the bank account or UPI ID verified in your name, on our payout schedule shown in your dashboard. [[Insert schedule and minimum payout.]]",
          "We may hold a payout while a dispute, chargeback, safety report or fraud check is open, and may recover amounts refunded to a Customer because of a Companion's cancellation, no-show or breach of these Terms.",
          "We may deduct tax at source where the law requires and issue the related certificates."
        ] }
      ]
    },
    {
      heading: "13. Refunds and disputes",
      body: [
        "Refunds for Bookings and Memberships follow our Refund Policy and Cancellation Policy. Refunds go back to the original payment method. To raise a dispute, use the \"Report a problem\" option on the Booking or contact support within 48 hours of the scheduled end time, with details and any evidence. We will review both sides and share our decision.",
        "If you raise a chargeback with your bank without first contacting us, we may suspend your account while the chargeback is resolved."
      ]
    },
    {
      heading: "14. Reviews and ratings",
      body: [
        "Only Users who took part in a completed Booking can review each other. Reviews must be honest, based on your own experience, and must not include personal information, threats, hate speech or sexual content. We may remove reviews that break these rules, but we do not remove a genuine review just because it is negative. Paying for, trading or faking reviews is prohibited."
      ]
    },
    {
      heading: "15. Your content",
      body: [
        "You keep ownership of the Content you upload. You give " + ENT + " a non-exclusive, royalty-free, worldwide licence to host, store, resize, display and distribute that Content only to operate and promote the Platform, for as long as it stays on the Platform. Promotional use of a Companion's photos outside the Platform will be done only with that Companion's separate consent.",
        "You confirm that you own or have permission to use your Content, that it shows only you (or people who have agreed), and that it does not break any law or anyone's rights. We may remove Content that breaks these Terms."
      ]
    },
    {
      heading: "16. Prohibited conduct",
      body: [
        "You must not:",
        { list: [
          "Request, offer or advertise sexual services, or use the Platform for any form of trafficking, exploitation or coercion.",
          "Create a fake account, impersonate anyone, or use someone else's photos or ID.",
          "Allow anyone under 18 to use your account or appear in your Content.",
          "Harass, threaten, stalk, blackmail, abuse or discriminate against anyone.",
          "Share another person's private information, messages or images without consent, including intimate images.",
          "Move payments or communication off the Platform to avoid fees or protections.",
          "Post content that is obscene, defamatory, hateful, misleading or illegal, or that infringes copyright or trademarks.",
          "Upload viruses, scrape data, use bots, probe for security weaknesses or interfere with the Platform.",
          "Use the Platform for money laundering, fraud or any other illegal purpose."
        ] },
        "This list follows the user-content rules in the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021."
      ]
    },
    {
      heading: "17. Reporting, investigations and enforcement",
      body: [
        "You can report a User, profile, message or review from the Platform or by contacting support. We review reports and may:",
        { list: [
          "Remove Content.",
          "Give a warning.",
          "Limit features or hide a profile.",
          "Suspend or permanently close an account.",
          "Withhold payouts linked to the breach.",
          "Share information with law enforcement as allowed by our Privacy Policy."
        ] },
        "Where the law requires, we will remove or disable access to unlawful content within the time limits set by the IT Rules, 2021, including within 24 hours for complaints about non-consensual intimate images."
      ]
    },
    {
      heading: "18. Suspension and closure",
      body: [
        "We may suspend or close your account, with or without notice, if you break these Terms, if we must do so by law, or if we reasonably believe your account poses a risk to other Users or to " + N + ". Where it is safe to do so we will tell you why and give you a chance to respond.",
        "You may close your account at any time from Account Settings. Open Bookings must be completed or cancelled first, and any amounts owed must be settled. Sections that by their nature should continue (such as payment obligations, liability limits and dispute resolution) continue after closure."
      ]
    },
    {
      heading: "19. Intellectual property",
      body: [
        "The " + N + " name, logo, design, software and Platform content (other than User Content) belong to " + ENT + " or its licensors and are protected by Indian and international law. You may not copy, modify, distribute or create derivative works from them without our written permission."
      ]
    },
    {
      heading: "20. Third-party services",
      body: [
        "The Platform relies on third parties such as payment gateways, verification providers, hosting providers and map or messaging services. Their services are governed by their own terms. We are not responsible for their independent acts, but we choose them carefully and will help you raise problems with them."
      ]
    },
    {
      heading: "21. Disclaimers",
      body: [
        "The Platform is provided \"as is\" and \"as available\". We work to keep it running and secure, but we do not promise it will always be available, error-free or uninterrupted. We do not guarantee the conduct, identity beyond our verification checks, or suitability of any User, or that you will find a Companion or receive Bookings. Nothing in these Terms excludes any right you have under the Consumer Protection Act, 2019 that cannot legally be excluded."
      ]
    },
    {
      heading: "22. Limitation of liability",
      body: [
        "To the extent the law allows:",
        { list: [
          N + " is not liable for indirect, incidental or consequential losses, or for loss of profit, goodwill or data.",
          N + " is not liable for the acts or omissions of Users during a meeting, which happens away from our control.",
          "Our total liability to you for any claim related to the Platform is limited to the higher of (a) the total amount you paid to us in the 6 months before the claim arose, or (b) ₹5,000."
        ] },
        "These limits do not apply to death or personal injury caused by our negligence, to fraud, or to any liability that cannot be limited under Indian law."
      ]
    },
    {
      heading: "23. Indemnity",
      body: [
        "You agree to compensate " + ENT + " and its officers and staff for reasonable losses, costs and legal fees arising from your breach of these Terms, your Content, or your violation of any law or anyone else's rights."
      ]
    },
    {
      heading: "24. Governing law and disputes",
      body: [
        { list: [
          "These Terms are governed by the laws of India.",
          "Please first contact our support or Grievance Officer. Most issues are solved this way.",
          "If a dispute is not resolved within 30 days, either side may refer it to arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996. The seat and venue will be New Delhi and the language English.",
          "Subject to arbitration, the courts at New Delhi have exclusive jurisdiction.",
          "Nothing here stops you from approaching a Consumer Commission under the Consumer Protection Act, 2019, or the Data Protection Board of India for data-protection matters."
        ] }
      ]
    },
    {
      heading: "25. Changes to these Terms",
      body: [
        "We may update these Terms when our services or the law change. We will post the new version here with a new date. For material changes, we will notify you by email or in your dashboard at least 7 days before they take effect, unless a change is needed sooner for legal or safety reasons. If you keep using the Platform after the change takes effect, you accept the new Terms. If you do not agree, you can close your account."
      ]
    },
    {
      heading: "26. General",
      body: [
        { list: [
          "If any part of these Terms is found invalid, the rest remains in force.",
          "If we do not enforce a right immediately, we have not given it up.",
          "You may not transfer your rights under these Terms. We may transfer ours to a successor business, with notice to you.",
          "These Terms, together with the policies they refer to, are the whole agreement between you and us about the Platform.",
          "Notices to you will be sent to your registered email or shown in your dashboard. Notices to us must be sent to " + MAIL + "."
        ] }
      ]
    },
    {
      heading: "27. Grievance Officer and contact",
      body: [
        "In line with the IT Rules, 2021, the Consumer Protection (E-Commerce) Rules, 2020 and the DPDP Act, 2023:",
        { list: [
          `Grievance Officer: ${OFFICER}`,
          `Email: ${GRV}`,
          `Company: ${ENT}`,
          `Address: ${ADDR}`,
          `Support: ${MAIL}`
        ] },
        "We acknowledge every complaint within 24 hours and aim to resolve it within 15 days. If you are not satisfied with the Grievance Officer's decision on a content matter, you may appeal to the Grievance Appellate Committee within 30 days.",
        `These Terms are effective from ${EFFECTIVE_DATE}.`
      ]
    }
  ]
};
