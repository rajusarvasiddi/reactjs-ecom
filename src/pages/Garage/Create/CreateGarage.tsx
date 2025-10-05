import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import GarageAddress from "./GarageAddress";
import { useCountries } from "./hooks/useCountries";
import { garageInitialValues } from "./initialValues";
import { FormValues } from "./types";
import { garageValidationSchema } from "./validationSchema";

const GarageCreate = () => {
  const { countries, loading, error } = useCountries();
  const handleSubmit = (values: FormValues) => {
    console.log("Form submitted : ", values);
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
              sx={{ maxWidth: 400, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create Garage
              </Typography>

              {loading ? (
                <Typography>Loading countries...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
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

                  <GarageAddress countries={countries} />

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
