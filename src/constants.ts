export const SITE_URL = "https://www.ecom.com";
export const API_BASE_URL = "https://gms-serverless.vercel.app/api";
export const SITE_TITLE = "eCom";
export const TOTAL_NO_OF_PAGES = 14;
export const PRODUCTS_LIST = "https://dummyjson.com/products";
export const COUNTRIES_LIST = `${API_BASE_URL}/countries`;
export const BUSINESS_DOCUMENTS_LIST = `${API_BASE_URL}/documents`;
export const COMPANIES_LIST = `${API_BASE_URL}/companies`;

export const VALIDATION_REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};
export const VALIDATION_MESSAGES = {
  INVALID_EMAIL_FORMAT: "Invalid email format",
};

export const WORDS = {
  pages: { companies: "Companies", garages: "Garage" },
};

export const CURRENCY_VALUE = "https://frankfurter.dev/";

export interface CountryValidation {
  label: string;
  regex: RegExp;
}
export const COUNTRY_PINCODE: Record<string, CountryValidation> = {
  IN: {
    label: "PIN Code",
    regex: /^[1-9][0-9]{5}$/, // India: 6-digit PIN starting with 1-9
  },
  USA: {
    label: "ZIP Code",
    regex: /^\d{5}(-\d{4})?$/, // USA: 5-digit ZIP or ZIP+4
  },
  CAN: {
    label: "Postal Code",
    regex: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // Canada: A1A 1A1
  },
  AUS: {
    label: "Postcode",
    regex: /^\d{4}$/, // Australia: 4 digits, e.g. 2000, 3001, 4007
  },
};
