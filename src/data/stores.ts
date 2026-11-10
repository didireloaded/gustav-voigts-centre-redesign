// Source: official store directory, gustavvoigtscentre.com.na/page/store-directory/
export type Floor = "lower-ground" | "street-level" | "upper-level";

export const FLOORS: { id: Floor; name: string; short: string }[] = [
  { id: "upper-level", name: "Upper Level", short: "UL" },
  { id: "street-level", name: "Street Level", short: "SL" },
  { id: "lower-ground", name: "Lower Ground", short: "LG" },
];

export const floorName = (f: Floor) => FLOORS.find((x) => x.id === f)!.name;

export type Category =
  | "Fashion & Accessories"
  | "Food & Groceries"
  | "Beauty & Health"
  | "Home & Décor"
  | "Financial"
  | "Jewellers"
  | "Electronics"
  | "Books"
  | "Crafts & Curios"
  | "Flowers"
  | "Optometrist"
  | "Gaming"
  | "Accommodation"
  | "Miscellaneous";

export interface Store {
  slug: string;
  name: string;
  category: Category;
  /** Category exactly as written in the official directory */
  listedCategory: string;
  floor: Floor;
  phone: string;
}

const raw: [string, Category, string, Floor, string][] = [
  ["Ackermans", "Fashion & Accessories", "Fashion/ Accessories", "lower-ground", "061 222 072"],
  ["Al Amin", "Fashion & Accessories", "Fashion/Accessories", "street-level", "081 284 8100"],
  ["Arcade Games", "Gaming", "Gaming", "lower-ground", "081 552 6587"],
  ["Avani Hotel", "Accommodation", "Accomodation", "upper-level", "061 280 0000"],
  ["Blu-tique", "Crafts & Curios", "Crafts & Curios", "street-level", "061 235 941"],
  ["Cash Converters", "Miscellaneous", "Miscellaneous", "upper-level", "061 221 707"],
  ["Cellulink CC", "Electronics", "Electronics", "lower-ground", "081 499 7779"],
  ["Checkers Liquor Store", "Food & Groceries", "Food & Restaurant", "lower-ground", "061 237 410"],
  ["Checkers Supermarket", "Food & Groceries", "Food & Restaurant", "lower-ground", "061 237 410"],
  ["Christelike Mobiele Lektuur", "Books", "Books", "street-level", "061 234 466"],
  ["Clicks", "Beauty & Health", "Beauty & Health", "street-level", "061 401 233"],
  ["Fina's Detox Pearls", "Beauty & Health", "Health/ Beauty", "street-level", "085 715 3026"],
  ["Flower Love", "Flowers", "Flowers", "street-level", "081 126 9298"],
  ["Furn Mart (Pty) Ltd", "Home & Décor", "Home & Décor", "lower-ground", "061 244 297"],
  ["Glam Beauty", "Beauty & Health", "Beauty & Health", "street-level", "081 828 7171"],
  ["Holtz", "Fashion & Accessories", "Fashion/Accessories", "street-level", "061 235 751"],
  ["Kalahari Pharmacy", "Beauty & Health", "Beauty & Health", "street-level", "061 252 448"],
  ["Kwado Key Cutting", "Miscellaneous", "Miscellaneous", "lower-ground", "085 759 0006"],
  ["Mr Price", "Fashion & Accessories", "Fashion/Accessories", "street-level", "061 236 959"],
  ["Namri", "Fashion & Accessories", "Fashion / Accessories", "street-level", "081 245 0983"],
  ["Nova Cambios Bureau de Change", "Financial", "Financial", "street-level", "061 230 787"],
  ["OK Furniture", "Home & Décor", "Home & Décor", "upper-level", "061 259 531"],
  ["Oupa's Biltong Shop", "Food & Groceries", "Food & Restaurant", "street-level", "081 370 8323"],
  ["Patric Mavros", "Jewellers", "Jeweller", "street-level", "081 163 5055"],
  ["Pave Jewellers", "Jewellers", "Jeweller", "street-level", "061 235 788"],
  ["Pepstores", "Fashion & Accessories", "Fashion/ Accessories", "lower-ground", "061 256 569"],
  ["Standard Bank Namibia Limited", "Financial", "Financial", "upper-level", "061 294 9418"],
  ["T K Africa", "Fashion & Accessories", "Fashion/ Accessories", "lower-ground", "061 400 374"],
  ["Tisha's Attires", "Fashion & Accessories", "Fashion/ Accessories", "street-level", "085 122 2403"],
  ["Torga Optical", "Optometrist", "Optometrist", "lower-ground", "061 271 261"],
  ["Wellness Centre", "Beauty & Health", "Beauty & Health", "street-level", "081 422 3576"],
];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/['’()]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const STORES: Store[] = raw.map(([name, category, listedCategory, floor, phone]) => ({
  slug: slugify(name),
  name,
  category,
  listedCategory,
  floor,
  phone,
}));

export const CATEGORIES = Array.from(new Set(STORES.map((s) => s.category))).sort();

/** 061 222 072 -> +26461222072 */
export const telHref = (phone: string) => "tel:+264" + phone.replace(/\s/g, "").replace(/^0/, "");

export const getStore = (slug: string) => STORES.find((s) => s.slug === slug);
