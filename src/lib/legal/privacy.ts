import { ADDR, CITIES, EFFECTIVE_DATE, ENT, GRV, MAIL, N, OFFICER, SITE, type LegalDoc } from "./common";

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  description: `How ${N} collects, uses, shares, protects and deletes your personal data, and the rights you have under Indian law.`,
  intro: `This Privacy Policy explains how ${ENT} ("${N}", "we", "us", "our") handles personal data when you visit ${SITE}, create an account, book or offer companionship services, make payments, or contact us. It is written to meet the Digital Personal Data Protection Act, 2023 ("DPDP Act"), the Digital Personal Data Protection Rules, 2025, the Information Technology Act, 2000 and the rules made under it. Please read it together with our Terms & Conditions and Cookie Policy.`,
  summary: [
    `${N} is for adults aged 18 and over only. We do not knowingly collect data from anyone under 18.`,
    "We collect only what we need to run accounts, verify age and identity, process bookings and payments, and keep people safe.",
    "We never sell your personal data, and we never show your ID documents, home address, phone number or email on public profiles.",
    "Passwords are stored only as secure hashes. Card and UPI details are handled by our payment partner, not by us.",
    "You can access, correct or delete your data, withdraw consent, and complain to our Grievance Officer at any time.",
    "If a data breach affects you, we will tell you and the authorities as the law requires."
  ],
  sections: [
    {
      heading: "1. Who we are",
      body: [
        `${N} is an online marketplace operated by ${ENT}, registered at ${ADDR}. We connect adults who want company for social activities (customers) with verified adults who offer that company (companions). Services on ${N} are strictly non-sexual social companionship, such as going to a café, a film, an event or a city walk.`,
        `Under the DPDP Act, ${ENT} is the "Data Fiduciary" for the personal data described here: we decide why and how it is processed. You are the "Data Principal". For any question about this policy, write to ${MAIL}.`
      ]
    },
    {
      heading: "2. Who this policy covers",
      body: [
        "This policy applies to everyone whose personal data we process, including:",
        { list: [
          "Visitors who browse our website without an account.",
          "Customers who register to find and book companions.",
          "Companions who register to offer their time, including applicants whose profile is not yet approved.",
          "Users who hold both roles.",
          "Anyone who contacts our support, safety or grievance teams, including people who are not users."
        ] },
        `It covers our website, account dashboard and any mobile app published under the ${N} name. Third-party websites linked from ${N} have their own privacy policies.`
      ]
    },
    {
      heading: "3. What personal data we collect",
      body: [
        { sub: "3.1 Data you give us when you register" },
        { list: [
          "Full name (as on your government ID).",
          "Mobile number with country code, and email address.",
          "Date of birth, used to confirm you are 18 or older.",
          "City and 6-digit PIN code.",
          "Gender (optional; you can choose not to say).",
          "Account type: find a companion, become a companion, or both.",
          "Password. Our authentication provider stores only a salted, one-way hash. Nobody at " + N + " can see your password.",
          "Your acceptance of these policies and your marketing choice, with the date, time and version accepted."
        ] },
        { sub: "3.2 Identity and age verification data" },
        "Before a companion profile can go live, and whenever we have reason to doubt someone's age or identity, we ask for:",
        { list: [
          "A government-issued photo ID (for example Aadhaar with the number masked, PAN, passport, driving licence or voter ID). We ask you to mask the first 8 digits of an Aadhaar number, and we do not collect or store full Aadhaar numbers.",
          "A live selfie or short liveness video to match you with the ID.",
          "The result of the check (pass, fail, needs review) and a reference ID from our verification provider."
        ] },
        "This data is used only to confirm that you are a real adult and that you are who you say you are.",
        { sub: "3.3 Profile content (companions)" },
        { list: [
          "Display name, short bio, languages, interests and the activity types you offer.",
          "Profile photos and an optional introduction video.",
          "Your hourly rate, service area and availability calendar."
        ] },
        "Your public profile shows only what you choose to publish after moderation. Your legal name, date of birth, contact details and ID documents are never shown publicly.",
        { sub: "3.4 Booking data" },
        { list: [
          "Who booked whom, the activity, date, start time, duration, meeting area and price.",
          "Booking status: requested, accepted, paid, in progress, completed, cancelled, no-show or disputed.",
          "Extension requests, cancellation reasons and ratings or reviews you give or receive.",
          "Messages sent through the platform about a booking."
        ] },
        { sub: "3.5 Payment and payout data" },
        { list: [
          "Amount, taxes, platform fees, membership plan, payment status and the payment gateway's transaction reference.",
          "Refund and chargeback records.",
          "For companions: bank account or UPI ID for payouts, and PAN where required by tax law."
        ] },
        `We do not receive or store your full card number, CVV, UPI PIN or net-banking password. These are entered directly with our payment partner, [[payment gateway name]], which is regulated by the Reserve Bank of India.`,
        { sub: "3.6 Support, safety and grievance data" },
        "Messages to support, safety reports, blocks, evidence you upload (such as screenshots), call notes and the outcome of investigations.",
        { sub: "3.7 Data collected automatically" },
        { list: [
          "Device and browser type, operating system, language and screen size.",
          "IP address and approximate location derived from it (city level).",
          "Pages visited, time and date of visits, referring page and actions such as log-ins and failed log-in attempts.",
          "Security logs used to detect fraud, account takeovers and abuse.",
          "Cookies and similar technologies, as described in our Cookie Policy."
        ] },
        "We do not track your precise or continuous GPS location. If we later add an optional safety feature such as live location sharing during a booking, we will ask for your separate consent first and you can switch it off at any time.",
        { sub: "3.8 Data from other people" },
        "Another user may report you, review you or mention you in a support request. A companion's review of a customer, or a customer's review of a companion, becomes part of that person's booking history."
      ]
    },
    {
      heading: "4. Data we do not collect",
      body: [
        { list: [
          "We do not collect data about your sexual life, religion, caste, political views, health or biometric data other than the face match used during identity verification.",
          "We do not ask for or accept intimate images. Uploading them breaches our Terms and they will be deleted.",
          "We do not knowingly collect any data about anyone under 18."
        ] }
      ]
    },
    {
      heading: "5. Why we use your data",
      body: [
        "We use personal data only for clear, specific purposes. For each purpose we rely either on your consent or on a \"legitimate use\" allowed by Section 7 of the DPDP Act (for example, complying with a law or a court order, or responding to a medical emergency).",
        { sub: "5.1 To create and run your account" },
        "Registering you, logging you in, keeping your session secure, resetting passwords and showing your dashboard.",
        { sub: "5.2 To check eligibility, age and identity" },
        "Confirming you are 18 or older, preventing duplicate or fake accounts, and verifying companions before their profiles go live.",
        { sub: "5.3 To run bookings" },
        "Showing companion profiles in your city, checking availability, preventing double-bookings, sending booking updates, handling extensions, cancellations and no-shows, and letting both sides leave reviews.",
        { sub: "5.4 To take payments and pay companions" },
        "Charging memberships and bookings, calculating GST and platform fees, issuing invoices, processing refunds and chargebacks, and paying companion earnings.",
        { sub: "5.5 To keep people safe" },
        "Investigating reports, blocking abusive users, detecting fraud, scams and off-platform payment requests, enforcing our Community Guidelines, and preventing illegal activity including any attempt to arrange sexual services or to exploit anyone.",
        { sub: "5.6 To provide support" },
        "Answering questions, resolving disputes and handling grievances.",
        { sub: "5.7 To meet legal duties" },
        "Keeping tax and accounting records, responding to lawful requests from police, courts and regulators, and following CERT-In directions on security logs and incident reporting.",
        { sub: "5.8 To improve the service" },
        "Understanding which features are used, fixing bugs and measuring performance, using aggregated or de-identified data wherever possible. Optional analytics run only if you accept them in the cookie banner.",
        { sub: "5.9 To send you updates (only with consent)" },
        "Offers, new features and newsletters, only if you ticked the optional box at signup or turned it on later. You can switch this off any time from Account Settings or the unsubscribe link. Service messages about your account, bookings, payments or security are not marketing and will still be sent."
      ]
    },
    {
      heading: "6. Consent and how to withdraw it",
      body: [
        "When you register, we show you this policy and ask you to agree to it. We record what you agreed to, which version, and when.",
        "You can withdraw consent at any time, as easily as you gave it, from Account Settings or by emailing " + MAIL + ". After withdrawal we will stop the processing that relied on that consent within a reasonable time, and ask our service providers to do the same.",
        "Withdrawing consent does not affect processing that already happened. Some processing is needed to run the service: if you withdraw consent for it, we may have to close your account. We will still keep data that the law requires us to keep (see section 10)."
      ]
    },
    {
      heading: "7. Who we share data with",
      body: [
        "We do not sell, rent or trade personal data. We share it only in these situations, and only as much as is needed:",
        { sub: "7.1 With other users" },
        { list: [
          "Customers see a companion's approved public profile (display name, photos, bio, activities, rate, city, rating).",
          "Once a booking is confirmed, both people see the other's display name, profile photo, the booking details and the meeting area agreed in the booking.",
          "We never share your phone number, email, legal name, date of birth or ID with another user. Communication stays on the platform."
        ] },
        { sub: "7.2 With service providers (Data Processors)" },
        "We use trusted companies that process data on our instructions under written contracts requiring confidentiality and security:",
        { list: [
          "Cloud hosting and database: [[hosting provider, e.g. Vercel]] and Supabase.",
          "Authentication and email delivery: Supabase Auth and [[email provider]].",
          "SMS and OTP delivery: [[SMS provider]].",
          "Identity verification: [[identity-verification provider]].",
          "Payments and payouts: [[payment gateway name]].",
          "Customer support tools: [[support tool, if any]].",
          "Analytics (only with consent): [[analytics provider, e.g. Google Analytics 4]]."
        ] },
        { sub: "7.3 With professional advisers" },
        "Lawyers, chartered accountants and auditors, under a duty of confidentiality.",
        { sub: "7.4 With authorities" },
        "With police, courts, tax authorities, CERT-In, the Data Protection Board of India or other government bodies when the law requires it, when we receive a valid legal order, or when we believe in good faith that disclosure is necessary to prevent serious harm to someone's life or safety. Where the law allows, we will tell you about the request.",
        { sub: "7.5 Business changes" },
        "If " + ENT + " is involved in a merger, acquisition or sale of assets, personal data may transfer to the new owner. The new owner must respect this policy, and we will tell you before your data becomes subject to a different policy."
      ]
    },
    {
      heading: "8. Payments",
      body: [
        "Payments are made through [[payment gateway name]], an RBI-authorised payment aggregator. When you pay, you enter your card, UPI or bank details directly on the gateway's secure page. The gateway tells us whether the payment succeeded, the amount and a transaction reference. We confirm every payment server-to-server before activating a booking or membership.",
        "The gateway processes your payment data under its own privacy policy and the PCI-DSS security standard."
      ]
    },
    {
      heading: "9. How we protect your data",
      body: [
        "We use reasonable security practices consistent with the IT Act, 2000 and the DPDP Rules, 2025, including:",
        { list: [
          "Encryption of data in transit (HTTPS/TLS) and encryption at rest by our hosting providers.",
          "Passwords stored only as salted hashes; strong password rules and rate-limited log-in attempts.",
          "Row-level access rules in our database, so each user can read only their own private data.",
          "ID documents and verification media kept in private storage, opened only through short-lived signed links by authorised staff, with every access logged.",
          "Role-based staff access on a need-to-know basis, with confidentiality obligations.",
          "Security logs kept for at least one year to detect and investigate misuse, as required by the DPDP Rules and CERT-In directions.",
          "Regular backups and an incident response plan."
        ] },
        "No online system is completely secure. Please use a strong, unique password, never share your OTP or password with anyone (our staff will never ask for it), and tell us immediately if you suspect misuse of your account."
      ]
    },
    {
      heading: "10. How long we keep data",
      body: [
        "We keep personal data only for as long as it is needed for the purpose it was collected for, or as the law requires. Our standard periods are:",
        { list: [
          "Account and profile data: while your account is active. If you do not log in for 3 years, we will warn you at least 48 hours before deleting an inactive account.",
          "Identity documents and selfies: deleted within 180 days after a verification decision; we keep only the result, the date and the provider's reference.",
          "Booking records and reviews: for the life of the account and up to 3 years after closure, to handle disputes and safety concerns.",
          "Payment, invoice and tax records: up to 8 years, as required by the GST, income tax and company laws.",
          "Security, access and traffic logs: at least 1 year, as required by the DPDP Rules, 2025 and CERT-In directions.",
          "Safety reports and records of bans: for as long as needed to stop banned users from returning and to assist law enforcement, reviewed at least every 3 years.",
          "Support tickets and grievances: 3 years from closure.",
          "Marketing preferences: until you withdraw consent, plus a record of the withdrawal."
        ] },
        "When a period ends, we delete the data or anonymise it so it can no longer identify you."
      ]
    },
    {
      heading: "11. Your rights",
      body: [
        "Under the DPDP Act you have the right to:",
        { list: [
          "Access: get a summary of the personal data we hold about you and how we use it, and the names of others we have shared it with.",
          "Correction and update: fix inaccurate or incomplete data. Most details can be edited in Account Settings; some (such as your legal name or date of birth) need re-verification.",
          "Erasure: ask us to delete your data, subject to the legal retention periods in section 10.",
          "Withdraw consent: at any time, as described in section 6.",
          "Grievance redressal: complain to our Grievance Officer and get a response.",
          "Nominate: name another person to exercise your rights if you die or become unable to act."
        ] },
        "To use any right, email " + GRV + " from your registered email, or use Account Settings. We may ask you to confirm your identity first so that nobody else can get your data. We will respond within 30 days, and in any case within the 90-day maximum allowed by the DPDP Rules. We do not charge for this.",
        "If you are not satisfied with our response, you can complain to the Data Protection Board of India."
      ]
    },
    {
      heading: "12. Deleting your account",
      body: [
        "You can request deletion from Account Settings → Delete account. Before deletion, open bookings must be completed or cancelled and any pending payout or refund settled.",
        "After deletion, your public profile is removed immediately and your personal data is deleted or anonymised within 30 days, except for records we must keep under section 10 (for example invoices, or details needed to stop a banned user from re-registering). Reviews you wrote may stay visible with your name removed."
      ]
    },
    {
      heading: "13. Cookies and analytics",
      body: [
        "We use essential cookies to keep you logged in and to protect against fraud. These cannot be switched off. Optional analytics cookies load only if you accept them. We never send ID documents, messages or other sensitive data to analytics tools. Full details are in our Cookie Policy."
      ]
    },
    {
      heading: "14. Adults only",
      body: [
        `${N} is only for people aged 18 and over. We check age at signup and again during identity verification. If we learn that a person under 18 has created an account or that someone has shared a minor's data, we will close the account, delete the data (keeping only what is needed to prevent re-registration and to report to authorities), and where required report the matter to the police or the National Commission for Protection of Child Rights.`,
        `If you believe a minor is using ${N}, report it immediately to ${GRV}.`
      ]
    },
    {
      heading: "15. Data breaches",
      body: [
        "If a personal data breach happens, we will act quickly to contain it and investigate. Where it affects you, we will tell you without delay, in plain language, through your registered email or phone: what happened, when, what data was involved, the likely impact, what we are doing about it and what you can do to protect yourself.",
        "We will also report the breach to the Data Protection Board of India and to CERT-In within the time limits set by law (including a detailed report to the Board within 72 hours of becoming aware of it)."
      ]
    },
    {
      heading: "16. Where your data is stored",
      body: [
        "Our main database is hosted in [[hosting region, e.g. Mumbai (ap-south-1)]]. Some service providers may process data outside India. When this happens, we transfer data only to countries not restricted by the Government of India under Section 16 of the DPDP Act, and under contracts that require the same level of protection as this policy."
      ]
    },
    {
      heading: "17. Changes to this policy",
      body: [
        "We may update this policy when our services or the law change. The \"Last updated\" date at the top shows the latest version. If a change is material, we will notify you by email or in your dashboard before it takes effect and, where the law requires, ask for your consent again."
      ]
    },
    {
      heading: "18. Contact and Grievance Officer",
      body: [
        "For questions, requests or complaints about your personal data:",
        { list: [
          `Grievance Officer: ${OFFICER}`,
          `Email: ${GRV}`,
          `Company: ${ENT}`,
          `Address: ${ADDR}`,
          `General contact: ${MAIL}`
        ] },
        "We acknowledge complaints within 24 hours and aim to resolve them within 15 days. If you are not satisfied, you may escalate to the Data Protection Board of India.",
        `Service area: ${CITIES}. This policy is effective from ${EFFECTIVE_DATE}.`
      ]
    }
  ]
};
