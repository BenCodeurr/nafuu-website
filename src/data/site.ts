/** Shared constants for the marketing site. No secrets belong here: this repo is public. */

export const SITE_URL = "https://nafuudelivery.com";

/** Dashboards and onboarding live in a separate (private) app. */
export const APP_URL = "https://app.nafuudelivery.com";
export const LINKS = {
  restaurantLogin: `${APP_URL}/login`,
  restaurantSignup: `${APP_URL}/restaurant-onboarding`,
  riderSignup: `${APP_URL}/rider-onboarding`,
} as const;

export const STORES = {
  appStore: "https://apps.apple.com/app/nafuu-livraison-des-repas/id6781988366",
  googlePlay: "https://play.google.com/store/apps/details?id=com.nafuu.nafuu",
} as const;

export const SOCIAL = {
  facebook: "https://web.facebook.com/nafuudelivery/",
  tiktok: "https://www.tiktok.com/@nafuudelivery",
  linkedin: "https://www.linkedin.com/company/nafuudelivery/",
} as const;

export const CONTACT = {
  email: "contact@gsworld.cd",
  whatsapp: {
    phone: "243817713939",
    display: "+243 817 713 939",
    message: "Bonjour Nafuu, j'aimerais vous contacter.",
  },
  address: {
    company: "GSWORLD Africa",
    city: "Bunia, Ituri",
    country: "République Démocratique du Congo",
  },
  hours: "Lun – Sam : 08h00 – 17h00",
} as const;
