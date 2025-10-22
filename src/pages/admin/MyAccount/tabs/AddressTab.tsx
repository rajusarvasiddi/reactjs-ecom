import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface AddressInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
// Example countries list
const countries = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AUS", name: "Australia" },
];

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Address Line 1 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State / Province is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal / ZIP Code is required"),
});

const AddressTab = () => {
  const getAddressUrl =
    "https://mocki.io/v1/d67b1b3f-d0e8-4f17-92b5-3aa3d609f0d2";

  const [loading, setLoading] = useState(true);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchAddressInfo = async () => {
      try {
        const { data } = await axios.get<AddressInfo>(getAddressUrl);
        setAddressInfo(data);
        timer = setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error("Failed to fetch address info", error);
      }
    };

    fetchAddressInfo();
    return () => clearTimeout(timer);
  }, []);

  const initialValues = {
    addressLine1: addressInfo?.addressLine1 || "",
    addressLine2: addressInfo?.addressLine2 || "",
    city: addressInfo?.city || "",
    state: addressInfo?.state || "",
    country: addressInfo?.country || "",
    postalCode: addressInfo?.postalCode || "",
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "left", py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form noValidate>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 500,
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 9 }}>
                <Grid size={12} sx={{ mb: 1 }}>
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
                    fullWidth
                  />
                </Grid>
                <Grid size={12} sx={{ mb: 1 }}>
                  <TextField
                    label="Address Line 2"
                    name="addressLine2"
                    value={values.addressLine2}
                    onChange={handleChange}
                    size="small"
                    autoComplete="off"
                    fullWidth
                  />
                </Grid>
                <Grid size={12} sx={{ mb: 1 }}>
                  <TextField
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    required
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid size={12} sx={{ mb: 1 }}>
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
                    fullWidth
                  />
                </Grid>
                <Grid size={12} sx={{ mb: 1 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      labelId="country-label"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      required
                      label="Country"
                    >
                      {countries.map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12} sx={{ mb: 1 }}>
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
                    fullWidth
                  />
                </Grid>
                <Grid size={12} sx={{ mb: 1 }}>
                  <Button type="submit" variant="contained">
                    Save Address
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddressTab;
