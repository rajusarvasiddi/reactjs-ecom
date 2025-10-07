// components/garage/create/validationSchema.ts
import * as Yup from "yup";
import {
  COUNTRY_PINCODE,
  VALIDATION_MESSAGES,
  VALIDATION_REGEX,
} from "../../../constants";
import { FormValues } from "./types";

export const garageValidationSchema = Yup.object<FormValues>({
  garageName: Yup.string()
    .required("Garage Name is required")
    .min(3, "Garage Name must be at least 3 characters")
    .max(30, "Garage Name cannot exceed 30 characters")
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Garage Name can only contain letters and numbers"
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email")
    .matches(VALIDATION_REGEX.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT),
  phone: Yup.string().required("Phone is required"),
  whatsapp: Yup.string(),
  owner: Yup.string().required("Mention owner's name"),
  description: Yup.string(),
  address: Yup.object({
    flatPlot: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    pinCode: Yup.string().test(
      "pincode-validation",
      "Invalid PIN/ZIP code",
      function (value) {
        const address = this.parent;
        const country = address.country;

        // Not required if no country is selected
        if (!country) return true;

        // Required if country is selected
        if (!value)
          return this.createError({
            message: "Code is required",
          });

        // Validate using regex from constants
        const regex = COUNTRY_PINCODE[country]?.regex;
        if (regex && !regex.test(value)) {
          return this.createError({
            message: `Invalid ${
              COUNTRY_PINCODE[country]?.label || "PIN/ZIP"
            } code`,
          });
        }

        return true;
      }
    ),
  }),
});
