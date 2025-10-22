import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string(),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), undefined],
    "Passwords must match"
  ),
});

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const SecurityTab = () => {
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
            <TextField
              label="Current Password"
              name="currentPassword"
              type="password"
              size="small"
              value={values.currentPassword}
              onChange={handleChange}
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              helperText={touched.currentPassword && errors.currentPassword}
              required
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              size="small"
              value={values.newPassword}
              onChange={handleChange}
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />
            <TextField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              size="small"
              value={values.confirmNewPassword}
              onChange={handleChange}
              error={
                touched.confirmNewPassword && Boolean(errors.confirmNewPassword)
              }
              helperText={
                touched.confirmNewPassword && errors.confirmNewPassword
              }
            />
            <Button type="submit" variant="contained" size="small">
              Update Password
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SecurityTab;
