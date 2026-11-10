export const CENTRE = {
  name: "Gustav Voigts Centre",
  address: "Independence Avenue, Windhoek, Namibia",
  phone: "+264 61 423 220",
  phoneHref: "tel:+26461423220",
  email: "reception@oryxprop.com.na",
  facebook: "https://www.facebook.com/713498252116359",
  officialSite: "https://gustavvoigtscentre.com.na/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gustav+Voigts+Centre+Independence+Avenue+Windhoek",
  hoursNote: "General centre trading hours; tenants may vary. Pending verification with centre management.",
  hours: [
    { days: "Monday – Friday", time: "08:30 – 17:30" },
    { days: "Saturday", time: "08:30 – 13:00" },
    { days: "Sunday & public holidays", time: "09:00 – 13:00" },
  ],
};

const img = (id: string) =>
  `https://gustavvoigtscentre.com.na/assets/images/timthumb.php?w=990&h=752&src=http://cms.my.na//assets/images/${id}.jpg`;

// Photographs published on the centre's official website. Rights to be confirmed by management.
export const PHOTOS = {
  mainCourt: img("de88c81d947dc692d1fad53dcd09893e"),
  mainCourt2: img("d5145bdd9625245d165ffe590a79b149"),
  mainCourt3: img("d2238baa2bd3f35ca1ac26a6ff270ae5"),
  entrance: img("a4e32a796018cd40d0ad383d1b9c9e52"),
  entrance2: img("238accbadc80c1975b9280aeb3b95d80"),
  avani: img("3101ceea067378fa4931cfd74a62f462"),
  avani2: img("e8ec7911de3a2be1d60e1bb36b0aa81e"),
  wellness: img("080d8682975403b0ff133b37fc0a3228"),
  torga: img("ba4db81adcb4131c246305b9e2f8f003"),
  flowers: img("da466c0360d0d11a2baafa9277eb4fab"),
  clicks: img("c335a12cce09a53e076ea2ed6b385c1b"),
};
