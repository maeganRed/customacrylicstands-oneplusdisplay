import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Check, MessageCircle, X } from "lucide-react";
import { inquiryForm, quantitySelect, quoteDialog } from "../data/inquiry";
import { jackLi } from "../data/jackLi";
import { site } from "../data/site";
import { initTelInput } from "../scripts/tel-input";

/**
 * Pop-up quote form. Mounted once in BaseLayout, so every page gets the same
 * dialog and the same five fields as the inline form on a product page.
 *
 * Two ways in:
 *  - any element carrying `data-inquiry-open` — the header CTA, the FinalCTA
 *    primary button and the product-card quote prompt all do; their `href`
 *    still points at /contact/, so the link keeps working when JavaScript
 *    is off,
 *  - the Escape key or a click on the overlay closes it again.
 */
const OPEN_ATTR = "data-inquiry-open";
/** Optional attribute naming the model the trigger belongs to, e.g. a product card */
const PRODUCT_ATTR = "data-inquiry-product";
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

export default function InquiryDialog() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  /** Model named by the trigger, so the email says which display is meant */
  const [product, setProduct] = useState("");
  /** Quantity dropdown; "custom" reveals a number input with MOQ validation */
  const [qtyTier, setQtyTier] = useState("");
  /** Custom quantity below the MOQ blocks the submit */
  const [qtyError, setQtyError] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  /** Element that opened the dialog, so focus can go back to it on close */
  const triggerRef = useRef<Element | null>(null);

  const close = () => {
    setOpen(false);
    setSent(false);
    setProduct("");
    const trigger = triggerRef.current;
    if (trigger instanceof HTMLElement) trigger.focus();
  };

  /* Any [data-inquiry-open] element opens the dialog, wherever it sits on the page */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest(`[${OPEN_ATTR}]`);
      if (!trigger) return;

      /* The anchor still owns its href for crawlers and for no-JS visitors */
      event.preventDefault();
      triggerRef.current = trigger;
      setProduct(trigger.getAttribute(PRODUCT_ATTR) ?? "");
      setSent(false);
      setOpen(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* Fresh quantity picker every time the dialog opens */
  useEffect(() => {
    if (open) {
      setQtyTier("");
      setQtyError(false);
    }
  }, [open]);

  /* Flag + dial-code selector on the phone field, rebuilt on every open.
     initTelInput overwrites the value with the full international number at
     submit, so `FormData.get("phone")` below already carries the dial code. */
  useEffect(() => {
    if (!open) return;
    const phoneInput = panelRef.current?.querySelector<HTMLInputElement>(
      'input[name="phone"]',
    );
    if (!phoneInput) return;
    return initTelInput(phoneInput);
  }, [open]);

  /* While open: lock the page, move focus into the panel, trap Tab, close on Escape */
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const panel = panelRef.current;
    const focusable = (): HTMLElement[] =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (element) => element.offsetParent !== null,
          )
        : [];

    /* Land in the first field: the close button is earlier in the DOM but the
       form is what the visitor came for */
    const firstField = panel?.querySelector<HTMLElement>("input, textarea");
    (firstField ?? focusable()[0])?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = focusable();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  /* The form is replaced by the confirmation, so move focus to the panel
     itself; otherwise it would fall back to the page behind the dialog */
  useEffect(() => {
    if (sent) panelRef.current?.focus();
  }, [sent]);

  /**
   * Static site, no backend: the form is handed to the visitor's email app with
   * every field already written out, the same hand-off the product page form
   * uses. The panel then confirms the draft instead of reloading the page.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const value = (field: string): string => String(form.get(field) ?? "").trim();

    /* Quantity: either a tier label from the dropdown, or the custom number,
       which has to clear the 100-set MOQ before the draft is opened */
    const tier = value("quantity");
    let quantity = tier;
    if (tier === quantitySelect.customLabel) {
      const custom = Number.parseInt(value("quantity-custom"), 10);
      if (!Number.isFinite(custom) || custom < quantitySelect.customMin) {
        setQtyError(true);
        return;
      }
      quantity = `${custom} sets`;
    }

    /** Drawing names are listed in the email; the files themselves are attached later */
    const filesInput = event.currentTarget.elements.namedItem("files");
    const files =
      filesInput instanceof HTMLInputElement && filesInput.files
        ? Array.from(filesInput.files)
            .map((file) => file.name)
            .join(", ")
        : "";

    const body = [
      `Name: ${value("name")}`,
      value("company") && `Company: ${value("company")}`,
      `Email: ${value("email")}`,
      value("phone") && `Phone & WhatsApp: ${value("phone")}`,
      quantity && `QTY (sets): ${quantity}`,
      `Destination country / port: ${value("country")}`,
      ...(product ? [`Product: ${product}`] : []),
      files && `Drawings / references to follow: ${files}`,
      "",
      "Requirements:",
      value("requirements"),
    ]
      .filter(Boolean)
      .join("\r\n");

    const subject = quoteDialog.mailSubject;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <>
      {open && (
        <div
          className="animate-overlay-in fixed inset-0 z-[70] overflow-y-auto bg-navy-950/75"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="flex min-h-full items-start justify-center sm:items-center sm:p-6">
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="quote-dialog-title"
              tabIndex={-1}
              className="animate-dialog-in relative w-full max-w-[980px] bg-white shadow-2xl focus:outline-none"
            >
              <button
                type="button"
                onClick={close}
                aria-label={quoteDialog.closeLabel}
                className="absolute top-2 right-2 z-20 rounded-xs p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                {/* Left rail: the offer, on the same blueprint ground as the CTA band */}
                <aside className="relative overflow-hidden bg-linear-to-br from-primary-700 via-navy-900 to-navy-950 px-6 py-7 text-white sm:px-8">
                  <div className="texture-grid" aria-hidden="true" />

                  <div className="relative z-10">
                    <p className="eyebrow text-primary-200">{quoteDialog.eyebrow}</p>
                    <h2
                      id="quote-dialog-title"
                      className="mt-3 text-xl leading-tight font-bold sm:text-2xl"
                    >
                      {quoteDialog.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-primary-100">
                      {quoteDialog.subtitle}
                    </p>

                    {/* Portrait: the person who signs the sample and the batch
                        record, so the form has a face behind it */}
                    <img
                      src={jackLi.hero.image}
                      alt={jackLi.hero.imageAlt}
                      className="mx-auto mt-6 aspect-square w-full max-w-[15rem] rounded-card object-cover shadow-lg ring-1 ring-white/20"
                    />
                    <p className="mt-3 text-center text-sm font-semibold text-white">
                      {site.persona.name}
                    </p>
                    <p className="text-center text-xs text-primary-200">
                      {site.persona.title}
                    </p>

                    <ul className="mt-6 hidden space-y-3 border-t border-white/15 pt-6 text-sm text-primary-100 lg:block">
                      {quoteDialog.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary-300"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                {/* Right side: the five fields, identical to the product page form */}
                <div className="px-5 py-6 sm:px-8 sm:py-8">
                  {sent ? (
                    <div className="flex h-full flex-col justify-center text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xs bg-primary-50">
                        <Check className="h-6 w-6 text-primary-600" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        {quoteDialog.sentTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {quoteDialog.sentBody}
                      </p>

                      <div className="mt-6 space-y-2">
                        <a
                          href={site.contact.whatsappHref}
                          target="_blank"
                          rel="noopener"
                          className="btn-primary w-full"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          {quoteDialog.sentWhatsapp}
                        </a>
                        <button
                          type="button"
                          onClick={() => setSent(false)}
                          className="btn-outline w-full"
                        >
                          {quoteDialog.sentAgain}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-3.5" onSubmit={handleSubmit}>
                      {product && (
                        <p className="border-l-2 border-primary-600 bg-primary-50 px-3 py-2 text-sm leading-snug text-gray-700">
                          {inquiryForm.productLabel}{" "}
                          <span className="font-semibold text-gray-900">
                            {product}
                          </span>
                        </p>
                      )}
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        <div>
                          <label className="form-label" htmlFor="qd-name">
                            Name <span className="text-primary-600">*</span>
                          </label>
                          <input
                            className="form-input"
                            id="qd-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="qd-company">
                            Company
                          </label>
                          <input
                            className="form-input"
                            id="qd-company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="qd-email">
                            Email <span className="text-primary-600">*</span>
                          </label>
                          <input
                            className="form-input"
                            id="qd-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="qd-phone">
                            Phone &amp; WhatsApp
                          </label>
                          <input
                            className="form-input"
                            id="qd-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="qd-quantity">
                            Estimated quantity
                          </label>
                          <select
                            className="form-select"
                            id="qd-quantity"
                            name="quantity"
                            value={qtyTier}
                            onChange={(event) => {
                              setQtyTier(event.target.value);
                              setQtyError(false);
                            }}
                          >
                            <option value="">{quantitySelect.placeholder}</option>
                            {quantitySelect.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                            <option value={quantitySelect.customLabel}>
                              {quantitySelect.customLabel}
                            </option>
                          </select>
                          {qtyTier === quantitySelect.customLabel && (
                            <input
                              className="form-input mt-2"
                              id="qd-quantity-custom"
                              name="quantity-custom"
                              type="number"
                              min={quantitySelect.customMin}
                              placeholder={quantitySelect.customPlaceholder}
                            />
                          )}
                          {qtyTier === quantitySelect.customLabel && qtyError && (
                            <p className="mt-1.5 text-xs text-red-600">
                              {quantitySelect.customError}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="form-label" htmlFor="qd-country">
                            Destination country / port{" "}
                            <span className="text-primary-600">*</span>
                          </label>
                          <input
                            className="form-input"
                            id="qd-country"
                            name="country"
                            type="text"
                            placeholder={inquiryForm.countryHint}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label" htmlFor="qd-requirements">
                          Requirements <span className="text-primary-600">*</span>
                        </label>
                        <textarea
                          className="form-textarea"
                          id="qd-requirements"
                          name="requirements"
                          rows={4}
                          placeholder={inquiryForm.requirementsHint}
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="form-label" htmlFor="qd-files">
                          {inquiryForm.uploadLabel}{" "}
                          <span className="font-normal text-gray-400">
                            ({inquiryForm.uploadNote})
                          </span>
                        </label>
                        <input
                          className="form-input file:mr-3 file:rounded-xs file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
                          id="qd-files"
                          name="files"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.ai,.psd,.dwg,.dxf,.step,.stp"
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full">
                        {inquiryForm.submit}
                      </button>

                      <p className="text-[11px] leading-snug text-gray-500">
                        {inquiryForm.privacy}
                      </p>
                      <p className="text-[11px] leading-snug text-gray-500">
                        {inquiryForm.directLabel}{" "}
                        <a
                          className="font-medium underline hover:text-primary-600"
                          href={`mailto:${site.contact.email}`}
                        >
                          {site.contact.email}
                        </a>
                        {" · "}
                        <a
                          className="font-medium underline hover:text-primary-600"
                          href={site.contact.whatsappHref}
                          target="_blank"
                          rel="noopener"
                        >
                          WhatsApp
                        </a>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
