import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface BusinessInfo {
  garageName: string;
  registrationNo: string;
  gstTaxId: string;
  businessEmail: string;
  businessPhone: string;
}

const validationSchema = Yup.object().shape({
  garageName: Yup.string().required("Garage / Company Name is required"),
});

const BusinessInfoTab = () => {
  const getBusinessInfoUrl =
    "https://mocki.io/v1/3b517869-4480-47eb-90ee-73bebc440da8";

  const [loading, setLoading] = useState(true);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchBusinessInfo = async () => {
      try {
        const { data } = await axios.get<BusinessInfo>(getBusinessInfoUrl);
        setBusinessInfo(data);
        timer = setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error("Failed to fetch business info", error);
      }
    };

    fetchBusinessInfo();
    return () => clearTimeout(timer);
  }, []);

  const initialValues = {
    garageName: businessInfo?.garageName || "",
    registrationNo: businessInfo?.registrationNo || "",
    gstTaxId: businessInfo?.gstTaxId || "",
    businessEmail: businessInfo?.businessEmail || "",
    businessPhone: businessInfo?.businessPhone || "",
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
