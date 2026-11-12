/**
 * Wording of the inquiry form, shared by every form on the site: inline on
 * each product page (ProductDetail.astro), inside the pop-up quote dialog
 * (InquiryDialog.tsx), and on the full page /contact/. One field set,
 * declared once, so the forms cannot drift.
 */

/** Fields and small print of the inquiry form */
export const inquiryForm = {
  title: "Request pricing for this display",
  note: "Send your requirements and our export team replies within one business day.",
  /** Optional field hints (the labels themselves live in the markup) */
  qtyHint: "e.g. 100 sets",
  countryHint: "e.g. United States / Los Angeles",
  requirementsHint: "Size, shelf count, print, packaging, target market…",
  uploadLabel: "Upload drawings / reference images",
  uploadNote: "Optional, up to 20 MB",
  uploadHint:
    "The file itself is not attached to the email draft — add it in your email app after submitting, or send it via WhatsApp.",
  submit: "Send Inquiry",
  /** Shown above the fields when a product card opened the dialog */
  productLabel: "Quoting:",
  privacy:
    "By submitting you agree that we may process these details to answer your inquiry. We do not share contact data with third parties.",
  directLabel: "Prefer to write directly?",
};

/**
 * Quantity picker of the pop-up dialog: a dropdown mirroring the home-page
 * quantity tiers, plus a custom option that has to clear the MOQ of 100 sets.
 */
export const quantitySelect = {
  placeholder: "Select a quantity tier",
  options: [
    "100–299 sets",
    "300–999 sets",
    "1,000–9,999 sets",
    "10,000+ sets",
  ],
  customLabel: "Custom quantity",
  customPlaceholder: "e.g. 250 sets",
  customMin: 100,
  customError:
    "Custom quantity starts at 100 sets — the MOQ per design.",
};

/**
 * Chrome copy of the pop-up dialog. The fields themselves come from
 * `inquiryForm` above; this is the panel around them and the confirmation
 * that replaces the form once it is handed to the email app.
 */
export const quoteDialog = {
  eyebrow: "Request a quote",
  title: "Need Jack's Team to Review Your Display Build?",
  subtitle:
    "Send the details below and Jack's team replies within one business day with a free 3D render, pricing and lead time.",
  points: [
    "Free 3D render in 24 hours",
    "Sample built in 48 hours, fee refunded at 100 sets",
    "Factory-direct price from 100 sets",
  ],
  closeLabel: "Close the quote form",
  mailSubject: "Quote request from the website",
  sentTitle: "Your Request Is Ready to Send",
  sentBody:
    "Your email app should have opened with the details filled in. If it did not, message us on WhatsApp or email the factory directly: the team answers within one business day.",
  sentWhatsapp: "Message us on WhatsApp",
  sentAgain: "Send another request",
};
