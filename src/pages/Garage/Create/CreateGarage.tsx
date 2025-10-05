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

// interface State {
//   code: string;
//   name: string;
// }

interface FormValues {
  garageName: string;
  email: string;
  phone: string;
  whatsapp: string;
  owner: string;
  description: string;
  address: {
    flatPlot: string;
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
        console.log("res", res);
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
              sx={{
                maxWidth: 400,
                display: "flex",
                flexDirection: "column",
              }}
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
                required
                error={touched.garageName && Boolean(errors.garageName)}
                helperText={touched.garageName && errors.garageName}
                size="small"
                margin="dense"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
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
                required
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="WhatsApp"
                margin="dense"
                size="small"
              />
              <TextField fullWidth label="Owner" margin="dense" size="small" />
              <TextField
                fullWidth
                label="Description"
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
                  label="Flat/Plot"
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Street"
                  margin="dense"
                  size="small"
                />
                <TextField fullWidth label="City" margin="dense" size="small" />
                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-select"
                    value={values.address.state}
                    onChange={handleChange}
                    label="State"
                  >
                    <MenuItem value="AP">Andhra Pradesh</MenuItem>
                    <MenuItem value="TG">Telangana</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel id="country-select-label">Country</InputLabel>
                  <Select
                    value={values.address.country}
                    onChange={handleChange}
                    label="country"
                    name="address.country"
                    displayEmpty
                  >
                    <MenuItem value="">-Select-</MenuItem>
                    {countries.map((c) => {
                      return (
                        <MenuItem key={c.code} value={c.code}>
                          {c.name}
                        </MenuItem>
                      );
                    })}
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
                    touched.address?.pinCode
                      ? // Use dynamic label in error message
                        errors.address?.pinCode?.replace(
                          "PIN/ZIP",
                          COUNTRY_PINCODE[values.address.country]?.label ||
                            "PIN/ZIP"
                        )
                      : ""
                  }
                  margin="dense"
                  size="small"
                />
              </Box>
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
          </Form>
        )}
      </Formik>

      {/* <Box
        sx={{ maxWidth: 400, pl: 2 }}
        gap={1}
      >
        <Typography variant="h4" fontWeight={"bold"} gutterBottom>
          Create Garage
        </Typography>
        <TextField
          fullWidth
          label="Garage Name"
          margin="dense"
          size="small"
          required
        />
        <TextField fullWidth label="Email" margin="dense" size="small" />
        <TextField fullWidth label="Phone" margin="dense" size="small" />
        <TextField fullWidth label="WhatsApp" margin="dense" size="small" />
        <TextField fullWidth label="Owner" margin="dense" size="small" />
        <TextField fullWidth label="Description" margin="dense" size="small" />

        <Box
          component="fieldset"
          sx={{ border: "1px solid #ccc", borderRadius: 2, px: 2, mt: 2 }}
        >
          <Typography component="legend" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>

          <TextField fullWidth label="Flat/Plot" margin="dense" size="small" />
          <TextField fullWidth label="Street" margin="dense" size="small" />
          <TextField fullWidth label="City" margin="dense" size="small" />
          <FormControl fullWidth size="small" margin="dense">
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              value={state}
              onChange={handleStateChange}
              label="State"
            >
              <MenuItem value="AP">Andhra Pradesh</MenuItem>
              <MenuItem value="TG">Telangana</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" margin="dense">
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={country}
              onChange={handleCountryChange}
              label="Country"
            >
              {countries.map((c) => {
                return (
                  <MenuItem key={c.code} value={c.code}>
                    {c.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField fullWidth label="PIN Code" margin="dense" size="small" />
        </Box>
      </Box>
      <Box sx={{ m: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mr: 1 }}
        >
          Submit
        </Button>
        <Button variant="outlined" color="secondary">
          Reset
        </Button>
      </Box> */}
    </>
  );
};

export default GarageCreate;
