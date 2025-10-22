import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  garageName: Yup.string().required("Garage / Company Name is required"),
});

const initialValues = {
  garageName: "",
  registrationNo: "",
  gstTaxId: "",
  businessEmail: "",
  businessPhone: "",
};

const BusinessInfoTab = () => {
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
              label="Garage / Company Name"
              name="garageName"
              size="small"
              value={values.garageName}
              onChange={handleChange}
              error={touched.garageName && Boolean(errors.garageName)}
              helperText={touched.garageName && errors.garageName}
              required
              autoComplete="off"
            />
            <TextField
              label="Business Registration No"
              name="registrationNo"
              size="small"
              value={values.registrationNo}
              onChange={handleChange}
              autoComplete="off"
            />
            <TextField
              label="GST / Tax ID"
              name="gstTaxId"
              size="small"
              value={values.gstTaxId}
              onChange={handleChange}
              autoComplete="off"
            />
            <TextField
              label="Business Email"
              name="businessEmail"
              type="email"
              size="small"
              value={values.businessEmail}
              onChange={handleChange}
              autoComplete="off"
            />
            <TextField
              label="Business Phone"
              name="businessPhone"
              size="small"
              value={values.businessPhone}
              onChange={handleChange}
              autoComplete="off"
            />
            <Button type="submit" variant="contained" size="small">
              Save Business Info
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BusinessInfoTab;
