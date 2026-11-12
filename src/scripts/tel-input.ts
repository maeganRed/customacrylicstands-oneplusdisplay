import intlTelInput from "intl-tel-input/intlTelInputWithUtils";

/**
 * Shared config for every phone field on the site (contact page,
 * product page form and the inquiry dialog). `intlTelInputWithUtils` bundles
 * the formatting utils, so nothing is fetched from a CDN at runtime.
 *
 * `hiddenInputs` reuses the visible `name="phone"` input: on submit the plugin
 * overwrites its value with the full international number (E.164, e.g.
 * +8613012345678), so both the static mailto forms and the dialog's FormData
 * read a dial-coded number without any other changes. If this script fails to
 * load, the input keeps its name and the form still submits the raw digits.
 *
 * The preferred countries are the export markets this site writes for; the
 * selector itself offers every country, searchable by name or dial code.
 */
const PREFERRED_COUNTRIES = ["us", "gb", "de", "ae", "au"] as const;

export function initTelInput(input: HTMLInputElement): () => void {
  /* Already wired (e.g. script re-run): leave the existing instance alone */
  if (intlTelInput.getInstance(input)) return () => {};

  const instance = intlTelInput(input, {
    initialCountry: "us",
    countryOrder: [...PREFERRED_COUNTRIES],
    /* Show +44 next to the flag so visitors see the dial code before typing */
    separateDialCode: true,
    hiddenInputs: (telInputName) => ({ phone: telInputName }),
  });

  return () => instance.destroy();
}

/**
 * Wire every phone input under `root` (defaults to the whole document).
 * Returns a destroy function that undoes all instances it created, so the
 * React dialog can tear its field down on close.
 */
export function initTelInputs(root: ParentNode = document): () => void {
  const inputs = root.querySelectorAll<HTMLInputElement>(
    'input[type="tel"][name="phone"]',
  );
  const destroys = Array.from(inputs, initTelInput);

  return () => destroys.forEach((destroy) => destroy());
}
