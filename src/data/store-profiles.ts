import { floorName, type Store } from "@/data/stores";
import { PHOTOS } from "@/data/centre";

/**
 * Each directory listing has a factual introduction and a visual treatment.
 * Only tenant-attributed photographs are displayed. Other businesses use
 * a typography-first layout instead of unrelated or mock storefront imagery.
 *
 * Source / rights register: docs/content/store-profile-image-register.md
 */
export type StoreProfile = {
  introduction: string;
  imageUrl: string | null;
  imageAlt: string | null;
  imageCaption: string;
  specificImage: boolean;
  sourceUrl?: string;
  officialUrl?: string;
  unit?: string;
  /** Verified current business number where it differs from the old directory. */
  phoneOverride?: string;
};

/**
 * Only facts explicitly confirmed by an identifiable official source.
 * Everyone else receives a description compiled from the published directory,
 * rather than invented products, services, or descriptions.
 */
const verifiedIntroductions: Readonly<Record<string, string>> = {
  "Torga Optical":
    "Torga Optical's Gustav Voigts Centre branch provides eye examinations, prescription eyewear and contact lenses. Its official branch page identifies Shop 6A on Lower Ground.",
  "Avani Hotel":
    "Avani Windhoek Hotel & Casino is a hotel in the heart of Windhoek. The centre's published directory lists Avani on Upper Level.",
  "Clicks":
    "Clicks is listed in the centre's published directory under Beauty & Health on Street Level.",
};

type PhotoSelection = {
  imageUrl: string;
  imageAlt: string;
  sourceUrl: string;
  specificImage: boolean;
  caption?: string;
};

/** Photos published by the centre or the named business. */
const verifiedStorePhotos: Record<string, PhotoSelection> = {
  "Avani Hotel": {
    imageUrl: PHOTOS.avani2,
    imageAlt: "Avani imagery published in Gustav Voigts Centre's gallery",
    sourceUrl: "https://gustavvoigtscentre.com.na/",
    specificImage: true,
  },
  "Clicks": {
    imageUrl: PHOTOS.clicks,
    imageAlt: "Clicks photograph published in Gustav Voigts Centre's gallery",
    sourceUrl: "https://gustavvoigtscentre.com.na/",
    specificImage: true,
  },
  "Torga Optical": {
    imageUrl: "https://torgaoptical.co.za/images/thumbs/1384057_20220524_085328%20cropped.jpeg",
    imageAlt: "Torga Optical business photograph from its official store presentation",
    sourceUrl: "https://torga.com.na/stores/gustav-voigts-centre",
    specificImage: true,
  },
};

const officialPages: Record<string, string> = {
  "Ackermans": "https://www.ackermans.co.za/",
  "Avani Hotel": "https://www.avanihotels.com/en/windhoek",
  "Clicks": "https://clicks.co.za/",
  "Checkers Supermarket": "https://www.checkers.co.za/",
  "Furn Mart (Pty) Ltd": "https://www.furnmart.com.na/",
  "Mr Price": "https://www.mrp.com/",
  "OK Furniture": "https://www.okfurniture.co.za/",
  "Patric Mavros": "https://www.patrickmavros.com/",
  "Pepstores": "https://www.pepstores.com/",
  "Standard Bank Namibia Limited": "https://www.standardbank.com.na/",
  "Torga Optical": "https://torga.com.na/stores/gustav-voigts-centre",
};

/** No rotating filler photos. A banner appears only for a confirmed store image. */
export function getStoreProfile(store: Store): StoreProfile {
  const photo = verifiedStorePhotos[store.name];
  return {
    introduction: verifiedIntroductions[store.name] ??
      `According to the centre's published directory, ${store.name} is listed under ${store.listedCategory} on ${floorName(store.floor)}. Contact the business to confirm current services and availability.`,
    imageUrl: photo?.imageUrl ?? null,
    imageAlt: photo?.imageAlt ?? null,
    imageCaption: photo ? "Image from the centre or business's public gallery" : "",
    specificImage: Boolean(photo?.specificImage),
    sourceUrl: photo?.sourceUrl,
    officialUrl: officialPages[store.name],
    unit: store.name === "Torga Optical" ? "Shop 6A" : undefined,
    phoneOverride: store.name === "Torga Optical" ? "083 377 5540" : undefined,
  };
}

/** Entries with researched, business-specific editorial copy. */
export const PROFILED_STORE_NAMES = Object.keys(verifiedIntroductions);

