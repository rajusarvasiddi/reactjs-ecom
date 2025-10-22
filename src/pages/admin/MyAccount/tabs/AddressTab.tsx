import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Example countries list
const countries = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
];

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Address Line 1 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State / Province is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal / ZIP Code is required"),
});

const initialValues = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

const AddressTab = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 500,
            }}
          >
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={values.addressLine1}
              onChange={handleChange}
              error={touched.addressLine1 && Boolean(errors.addressLine1)}
              helperText={touched.addressLine1 && errors.addressLine1}
              required
              size="small"
              autoComplete="off"
            />
            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={values.addressLine2}
              onChange={handleChange}
              size="small"
              autoComplete="off"
            />
            <TextField
              label="City"
              name="city"
              value={values.city}
              onChange={handleChange}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              required
              size="small"
            />
            <TextField
              label="State / Province"
              name="state"
              value={values.state}
              onChange={handleChange}
              error={touched.state && Boolean(errors.state)}
              helperText={touched.state && errors.state}
              required
              size="small"
              autoComplete="off"
            />
            <FormControl>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                name="country"
                value={values.country}
                onChange={handleChange}
                required
                label="Country"
                size="small"
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Postal / ZIP Code"
              name="postalCode"
              value={values.postalCode}
              onChange={handleChange}
              error={touched.postalCode && Boolean(errors.postalCode)}
              helperText={touched.postalCode && errors.postalCode}
              required
              size="small"
              autoComplete="off"
            />
            <Button type="submit" variant="contained">
              Save Address
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddressTab;
