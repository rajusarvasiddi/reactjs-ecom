import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  COUNTRIES_LIST,
  VALIDATION_MESSAGES,
  VALIDATION_REGEX,
  COUNTRY_PINCODE,
} from "../../../constants";

interface Country {
  code: string;
  name: string;
}

interface FormValues {
  garageName: string;
  email: string;
  phone: string;
  whatsapp: string;
  owner: string;
  description: string;
  address: {
    flatPlot: string;
    buildingName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
}

const GarageCreate = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  // const [states, setStates] = useState<State[]>([]);

  // Fetch countries from data API
  useEffect(() => {
    axios
      .get(COUNTRIES_LIST)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log("Unable to fetch data from API :: ", err));
  }, []);

  const initialValues: FormValues = {
    garageName: "",
    email: "",
    phone: "",
    whatsapp: "",
    owner: "",
    description: "",
    address: {
      flatPlot: "",
      buildingName: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  };

  const validationSchema = Yup.object({
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
      .matches(
        VALIDATION_REGEX.EMAIL,
        VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT
      ),
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
      // pinCode: Yup.string()
      //   .required("PIN/ZIP Code is required")
      //   .test("pincode-validation", "Invalid PIN/ZIP code", function (value) {
      //     const { country } = this.parent;
      //     if (!country || !value) return true; // skip if country not selected
      //     const regex = COUNTRY_PINCODE[country]?.regex;
      //     return regex ? regex.test(value) : true;
      //   }),
      pinCode: Yup.string().test(
        "pincode-validation",
        "Invalid PIN/ZIP code",
        function (value) {
          const address = this.parent; // this.parent is the address object
          const country = address.country;

          // Not required if no country is selected
          if (!country) return true;

          // Required if country is selected
          if (!value)
            return this.createError({
              message: "PIN/ZIP Code is required",
            });

          // Validate using regex from your constants
          const regex = COUNTRY_PINCODE[country]?.regex;
          if (regex && !regex.test(value)) {
            return this.createError({
              message: `Invalid ${
                COUNTRY_PINCODE[country]?.label || "PIN/ZIP"
              } code`,
            });
          }

          return true; // valid
        }
      ),
    }),
  });

  const handleSubmit = (values: FormValues) => {
    console.log("Form submitted : ", values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleReset }) => (
          <Form autoComplete="off" noValidate>
            <Box
              sx={{ maxWidth: 400, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create Garage
              </Typography>

              <TextField
                fullWidth
                label="Garage Name"
                name="garageName"
                value={values.garageName}
                onChange={handleChange}
                error={touched.garageName && Boolean(errors.garageName)}
                helperText={touched.garageName && errors.garageName}
                margin="dense"
                size="small"
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="dense"
                size="small"
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                margin="dense"
                size="small"
              />

              <TextField
                fullWidth
                label="WhatsApp"
                name="whatsapp"
                value={values.whatsapp}
                onChange={handleChange}
                margin="dense"
                size="small"
              />

              <TextField
                fullWidth
                label="Owner"
                name="owner"
                value={values.owner}
                onChange={handleChange}
                error={touched.owner && Boolean(errors.owner)}
                helperText={touched.owner && errors.owner}
                margin="dense"
                size="small"
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                margin="dense"
                size="small"
              />

              <Box
                component="fieldset"
                sx={{ border: "1px solid #ccc", borderRadius: 2, px: 2, mt: 2 }}
              >
                <Typography component="legend" sx={{ fontWeight: "bold" }}>
                  Address
                </Typography>

                <TextField
                  fullWidth
                  label="Flat/Plot #"
                  name="address.flatPlot"
                  value={values.address.flatPlot}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Building Name"
                  name="address.buildingName"
                  value={values.address.buildingName}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Street"
                  name="address.street"
                  value={values.address.street}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />

                <TextField
                  fullWidth
                  label="City"
                  name="address.city"
                  value={values.address.city}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />

                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    name="address.state"
                    value={values.address.state}
                    onChange={handleChange}
                    displayEmpty
                    label="State"
                    renderValue={(selected) => {
                      if (!selected) return "-Select-";
                      const states = [
                        { code: "AP", name: "Andhra Pradesh" },
                        { code: "TG", name: "Telangana" },
                      ];
                      const state = states.find((s) => s.code === selected);
                      return state ? state.name : "";
                    }}
                  >
                    <MenuItem value="">
                      <em>-Select-</em>
                    </MenuItem>
                    <MenuItem value="AP">Andhra Pradesh</MenuItem>
                    <MenuItem value="TG">Telangana</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel id="country-select-label">Country</InputLabel>
                  <Select
                    labelId="country-select-label"
                    name="address.country"
                    value={values.address.country}
                    onChange={handleChange}
                    displayEmpty
                    label="Country" // important for floating label
                    renderValue={(selected) => {
                      if (!selected) return "-Select-"; // placeholder text
                      const country = countries.find(
                        (c) => c.code === selected
                      );
                      return country ? country.name : "";
                    }}
                  >
                    <MenuItem value="">
                      <em>-Select-</em>
                    </MenuItem>
                    {countries.map((c) => (
                      <MenuItem key={c.code} value={c.code}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label={
                    COUNTRY_PINCODE[values.address.country]?.label || "PIN/ZIP"
                  }
                  name="address.pinCode"
                  value={values.address.pinCode}
                  onChange={handleChange}
                  error={
                    touched.address?.pinCode && Boolean(errors.address?.pinCode)
                  }
                  helperText={
                    touched.address?.pinCode && errors.address?.pinCode
                  }
                  margin="dense"
                  size="small"
                />
              </Box>

              <Box sx={{ mt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GarageCreate;
