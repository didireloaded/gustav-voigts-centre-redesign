import type { Store } from "@/data/stores";
import { PHOTOS } from "@/data/centre";

/**
 * Each directory listing has a factual introduction and a visual treatment.
 * Only five listings currently have photographs attributed to the particular
 * tenant. All other banners use REAL CENTRE photography and are clearly
 * captioned as such; they do not pretend to show that store's premises.
 *
 * Source / rights register: docs/content/store-profile-image-register.md
 */
export type StoreProfile = {
  introduction: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  specificImage: boolean;
  sourceUrl?: string;
  officialUrl?: string;
  unit?: string;
};

const introductions: Record<string, string> = {
  "Ackermans": "Clothing and everyday fashion retail on the Lower Ground level. The centre directory lists Ackermans among its fashion and accessories businesses.",
  "Al Amin": "A fashion and accessories business listed on Street Level. For current collections, sizing and availability, please contact the store directly.",
  "Arcade Games": "An arcade and gaming listing on Lower Ground. Contact the business to confirm the games and facilities currently offered.",
  "Avani Hotel": "Accommodation in the centre of Windhoek, with Gustav Voigts Centre's shops and services in the same city-centre location.",
  "Blu-tique": "A crafts and curios business on Street Level. Contact the shop to explore its current range and visiting details.",
  "Cash Converters": "A retail business listed on Upper Level. Contact the branch for the pre-owned goods and services currently available.",
  "Cellulink CC": "An electronics business on Lower Ground. Please check with the store about specific devices, accessories and services.",
  "Checkers Liquor Store": "The centre's liquor retail listing on Lower Ground. Contact the branch to confirm its trading details and current selection.",
  "Checkers Supermarket": "A supermarket on Lower Ground for grocery shopping and everyday essentials in central Windhoek.",
  "Christelike Mobiele Lektuur": "A books and reading-material listing on Street Level. Contact the business to ask about its current range.",
  "Clicks": "A health and beauty retailer on Street Level. Visitors can contact this branch to enquire about current personal-care products and services.",
  "Fina's Detox Pearls": "Listed in the centre directory under beauty and health, on Street Level. Product and service details should be confirmed directly with the business.",
  "Flower Love": "A flowers business listed on Street Level. Contact the shop to enquire about arrangements, seasonal availability and orders.",
  "Furn Mart (Pty) Ltd": "Furniture and home retail on Lower Ground. Contact the branch to learn about the current showroom selection.",
  "Glam Beauty": "A beauty and health listing on Street Level. Ask the business directly about its current products or appointment-based services.",
  "Holtz": "Listed under fashion and accessories on Street Level. Contact the store for its current clothing and accessory selection.",
  "Kalahari Pharmacy": "A pharmacy listed on Street Level. Call ahead for dispensary enquiries, opening hours and product availability.",
  "Kwado Key Cutting": "A key-cutting listing on Lower Ground. Contact the business to confirm the types of keys and services handled.",
  "Mr Price": "A fashion retailer on Street Level, listed as part of the centre's clothing and accessories offering.",
  "Namri": "A fashion and accessories business on Street Level. Its current collection and opening hours should be checked directly.",
  "Nova Cambios Bureau de Change": "A financial-services listing on Street Level. Contact the branch to confirm its currency exchange facilities and rates.",
  "OK Furniture": "A furniture and home retail listing on Upper Level. Contact the store to enquire about products and availability.",
  "Oupa's Biltong Shop": "A food retail listing on Street Level. Contact the business about the biltong and food items currently available.",
  "Patric Mavros": "A jewellery brand listed on Street Level. The brand is known for fine jewellery and handcrafted design.",
  "Pave Jewellers": "A jewellery business on Street Level. Contact the shop directly for its current collections and services.",
  "Pepstores": "A clothing and everyday essentials retailer listed on Lower Ground at Gustav Voigts Centre.",
  "Standard Bank Namibia Limited": "A banking and financial-services listing on Upper Level. Confirm current branch services and hours with the bank.",
  "T K Africa": "A fashion and accessories listing on Lower Ground. Contact the business to confirm the current selection.",
  "Tisha's Attires": "A fashion and accessories listing on Street Level. Contact the store directly for current clothing and availability.",
  "Torga Optical": "An optometry and eyewear practice at Shop 6A on Lower Ground. Its official branch information describes professional eye tests, prescription glasses, lenses and a selection of frames.",
  "Wellness Centre": "A beauty and health business on Street Level. Contact the centre directly to learn which treatments and appointments are available.",
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
    imageAlt: "Avani Hotel featured at Gustav Voigts Centre",
    sourceUrl: "https://gustavvoigtscentre.com.na/",
    specificImage: true,
  },
  "Clicks": {
    imageUrl: PHOTOS.clicks,
    imageAlt: "Clicks imagery published by Gustav Voigts Centre",
    sourceUrl: "https://gustavvoigtscentre.com.na/",
    specificImage: true,
  },
  "Flower Love": {
    imageUrl: PHOTOS.flowers,
    imageAlt: "Floral business imagery from the centre's older gallery; exact tenant identification is unconfirmed",
    sourceUrl: "https://gustavvoigtscentre.com.na/",
    specificImage: false,
    caption: "Floral imagery from the centre archive · Tenant attribution to confirm",
  },
  "Torga Optical": {
    imageUrl: "https://torgaoptical.co.za/images/thumbs/1384057_20220524_085328%20cropped.jpeg",
    imageAlt: "Eyewear display and staff at Torga Optical's Gustav Voigts Centre branch",
    sourceUrl: "https://torga.com.na/gustav-voigts-centre",
    specificImage: true,
  },
  "Wellness Centre": {
    imageUrl: PHOTOS.wellness,
    imageAlt: "Wellness imagery published in the centre's older gallery; exact tenant identity is unconfirmed",
    sourceUrl: "https://gustavvoigtscentre.com.na/",
    specificImage: false,
    caption: "Wellness imagery from the centre archive · Tenant attribution to confirm",
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
  "Torga Optical": "https://torga.com.na/gustav-voigts-centre",
};

const centrePhotoCycle = [
  PHOTOS.mainCourt3,
  PHOTOS.atriumWide,
  PHOTOS.mainCourt,
  PHOTOS.entrance2,
  PHOTOS.atriumLevels,
] as const;

/** Never claim a generic centre image is the named shop. */
export function getStoreProfile(store: Store): StoreProfile {
  const specific = verifiedStorePhotos[store.name];
  const centreImage = centrePhotoCycle[Array.from(store.slug).reduce((v, c) => v + c.charCodeAt(0), 0) % centrePhotoCycle.length];
  return {
    introduction: introductions[store.name] ??
      `${store.name} is listed by Gustav Voigts Centre under ${store.listedCategory} on ${store.floor.replace(/-/g, " ")}. Contact the business to learn more.`,
    imageUrl: specific?.imageUrl ?? centreImage,
    imageAlt: specific?.imageAlt ?? "An interior view of Gustav Voigts Centre, not the individual shop",
    imageCaption: specific?.caption ?? (specific ? "Business imagery" : "Inside Gustav Voigts Centre · Centre photograph, not this store"),
    specificImage: Boolean(specific?.specificImage),
    sourceUrl: specific?.sourceUrl,
    officialUrl: officialPages[store.name],
    unit: store.name === "Torga Optical" ? "Shop 6A" : undefined,
  };
}

/** Used by QA to ensure all currently published listings are described. */
export const PROFILED_STORE_NAMES = Object.keys(introductions);
