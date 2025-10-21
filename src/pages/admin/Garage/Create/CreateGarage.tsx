import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
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

  const handleSubmit = async (values: FormValues) => {
    console.log("Form submitted : ", values);
    try {
      const payload = {
        ...values,
        documents: {},
      };
      const response = await axios.post(
        "https://dummyjson.com/posts/add",
        payload
      );
      console.log("Server response:", response.data);
      alert("Garage created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create garage. Please try again.");
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
    </>
  );
};

export default GarageCreate;
