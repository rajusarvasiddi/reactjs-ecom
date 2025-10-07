export const SITE_URL = "https://www.ecom.com";
export const SITE_TITLE = "eCom";
export const TOTAL_NO_OF_PAGES = 14;
export const PRODUCTS_LIST = "https://dummyjson.com/products"; // Mock data from DUMMYJSON.COM
export const COUNTRIES_LIST =
  "https://mocki.io/v1/072c98ae-6ebd-4fb4-912d-b00ae7b45a13"; // Created mock response using mocki.io
export const BUSINESS_DOCUMENTS_LIST =
  "https://mocki.io/v1/a3219e5d-8b6f-4fe2-a890-6aa5b43ed7e3";
export const VALIDATION_REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};
export const VALIDATION_MESSAGES = {
  INVALID_EMAIL_FORMAT: "Invalid email format",
};

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
    label: "Postal Code",
    regex: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // Canada: A1A 1A1
  },
};
