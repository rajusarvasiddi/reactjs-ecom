import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import api from "../../../../services/api";
import { Form, Formik } from "formik";
import { useCountries } from "../../../../shared/hooks/useCountries";
import { useBusinessDocumentTypes } from "../../../../shared/hooks/useDocumentTypes";
import BusinessDocuments from "./BusinessDocumentsSection";
import GarageAddress from "./GarageAddress";
import { garageInitialValues } from "./initialValues";
import { FormValues } from "./types";
import { garageValidationSchema } from "./validationSchema";

const GarageCreate = () => {
  const {
    countries,
    loading: countriesLoading,
    error: countriesError,
    retry: retryCountries,
  } = useCountries();

  const { documentTypes, loading, error, retry } = useBusinessDocumentTypes();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    console.log("Form submitted : ", values);
    try {
      const payload = {
        ...values,
        documents: {},
      };
      const response = await api.post(
        "/garages",
        payload
      );
      console.log("Server response:", response.data);
      setSnackbar({
        open: true,
        message: "Garage created successfully!",
        severity: "success",
      });
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message: "Failed to create garage. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={garageInitialValues}
        validationSchema={garageValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleReset }) => (
          <Form autoComplete="off" noValidate>
            <Box
              sx={{
                maxWidth: 400,
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create Garage
              </Typography>

              {countriesLoading ? (
                <Typography>Loading countries...</Typography>
              ) : countriesError ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography color="error">{countriesError}</Typography>
                  <Button variant="outlined" onClick={retryCountries}>
                    Retry
                  </Button>
                </Box>
              ) : (
                <>
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
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      px: 2,
                      mt: 2,
                    }}
                  >
                    <GarageAddress countries={countries} />
                  </Box>

                  <Box
                    component="fieldset"
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      px: 2,
                      mt: 2,
                    }}
                  >
                    <BusinessDocuments
                      legendTitle="Business Registration Document(s)"
                      documentTypes={documentTypes}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ py: 0.5, height: 32, minWidth: 88 }}
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={handleReset}
                      size="small"
                      sx={{ py: 0.5, height: 32, minWidth: 88 }}
                    >
                      Reset
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GarageCreate;
