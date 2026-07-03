// Real attraction photos sourced from Wikimedia Commons.
//
// Special:FilePath returns a stable 302 redirect to the current version of a
// file and supports on-the-fly scaling via ?width=. Unlike hard-coded
// upload.wikimedia.org thumbnail URLs (which embed a hash that changes when a
// file is re-uploaded), a Special:FilePath URL keyed on the file *name* keeps
// working, so these load reliably in the browser as <img> sources.
//
// Every filename below is a real, existing photograph of the specific
// landmark it is attached to — not decorative stock.

const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath";

export interface Photo {
  /** Full remote URL of a real photo of the attraction. */
  url: string;
  /** Descriptive caption (Polish). */
  caption: string;
}

/**
 * Build a Photo from a Wikimedia Commons file name (with or without the
 * `File:` prefix) and a caption. `width` scales the delivered image.
 */
export function commons(file: string, caption: string, width = 1400): Photo {
  const name = file.replace(/^File:/, "").replace(/ /g, "_");
  return {
    url: `${COMMONS}/${encodeURIComponent(name)}?width=${width}`,
    caption,
  };
}
