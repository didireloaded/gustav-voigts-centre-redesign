# Store logo sourcing and review

**Status:** Review branch only. The directory grid and store detail layouts have NOT been updated.

This register follows `references/09-content-and-assets.md` and `03-website-foundations.md`. A brand's official domain is evidence of its identity, **not** independent confirmation that a Gustav Voigts Centre tenancy remains current. Store occupancy is inherited from the centre's published directory and still needs centre-management approval.

## Candidate brand domains

| Published directory name | Domain used | Evidence / official source |
|---|---|---|
| Ackermans | ackermans.co.za | https://www.ackermans.co.za/pages/terms-conditions |
| Avani Hotel | avanihotels.com | https://www.avanihotels.com/en/windhoek |
| Cash Converters | cashconverters.co.za | https://www.cashconverters.co.za/shop/stores/gauteng |
| Checkers Supermarket | checkers.co.za | https://brandfetch.com/checkers.co.za (brand domain), plus official Shoprite/Checkers group association |
| Clicks | clicks.co.za | https://www.clicks.co.za/ |
| Furn Mart (Pty) Ltd | furnmart.com.na | https://www.furnmart.com.na/stores (explicit Gustav Voigts Centre store record) |
| Mr Price | mrp.com | https://www.mrp.com/en_na/ladies |
| OK Furniture | okfurniture.co.za | https://www.okfurniture.co.za/ |
| Patric Mavros | patrickmavros.com | https://uk.patrickmavros.com/pages/stores (Windhoek at Gustav Voigts Centre; published directory spelling differs from official brand) |
| Pepstores | pepstores.com | https://www.pepstores.com/ |
| Standard Bank Namibia Limited | standardbank.com.na | https://www.standardbank.com.na/namibia |
| Torga Optical | torga.com.na | https://torga.com.na/ (lists Gustav Voigts Centre) |

**19 remaining directory entries:** `domain: null`, `logoUrl: null`. Their logos are not guessed. Checkers Liquor Store deliberately remains without a candidate image to avoid treating the main Checkers supermarket mark as a verified LiquorShop-specific identity.

## Logo.dev policy

- Client-side requests use the **publishable token only**. No private/secret API key is read or committed.
- `format=webp&size=200&fallback=404` requests a logo and signals a missing image as HTTP 404, so the branded typography fallback renders instead of a vendor-generated monogram.
- The image endpoint is hosted by Logo.dev and brand image availability/correctness cannot be guaranteed by domain verification alone. **Visually inspect each returned logo before enabling it on the main grid**.
- Logo.dev states commercial use of its free plan requires visible Logo.dev attribution: https://www.logo.dev/products/logo-api . Include this link in a suitable real footer/location when connecting the component to public directory pages, unless the plan terms have changed or a paid plan removes that requirement.
- Verify tenant or owner permissions for public reproduction of logos when finalising launch assets.
- The current review branch DOES NOT change `src/components/site/StoreTile.tsx`, does not publish a site and does not configure the project's live CDN.

## Visual review checklist

- [ ] Verified domain represents the correct store brand and geographic brand variant.
- [ ] Image is the real mark, not an unrelated logo, Logo.dev's monogram, or a different company.
- [ ] Image preserves aspect ratio and is legible in a 120×64 surface.
- [ ] Failed logo shows the project monogram, not a broken icon or generic placeholder.
- [ ] Fallback warm neutral + terracotta looks consistent within Gustav Voigts' charcoal/white/yellow identity; colour is subject to design approval.
- [ ] Keyboard and screen readers identify the store name; no layout shift during failure.
- [ ] Licence and any Logo.dev attribution requirements satisfied before public deployment.

After user approval, the follow-up change will import `StoreLogo` in `src/components/site/StoreTile.tsx` and optionally the individual store page, then verify the full rendered directory and mobile widths.
