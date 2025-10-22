import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Avatar,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const genders = ["Male", "Female", "Other"];
const notifications = ["Email", "SMS", "Push"];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "user@example.com", // read-only
  phone: "",
  dob: "",
  gender: "",
  profilePic: null,
  notification: "",
};

const ProfileTab = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
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
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              required
              size="small"
              autoComplete="off"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              required
              size="small"
              autoComplete="off"
            />
            <TextField
              label="Email"
              name="email"
              value={values.email}
              slotProps={{ input: { readOnly: true } }}
              size="small"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="+91 9999999999"
              size="small"
              autoComplete="off"
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.dob}
              onChange={handleChange}
              size="small"
              autoComplete="off"
            />
            <FormControl>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                label="Gender"
                size="small"
              >
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={
                  values.profilePic
                    ? URL.createObjectURL(values.profilePic)
                    : ""
                }
                sx={{ width: 56, height: 56 }}
              />
              <Button variant="contained" component="label">
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue(
                      "profilePic",
                      e.currentTarget.files?.[0] || null
                    )
                  }
                />
              </Button>
            </Box>
            <FormControl>
              <InputLabel id="notification-label">
                Notification Preference
              </InputLabel>
              <Select
                labelId="notification-label"
                name="notification"
                value={values.notification}
                onChange={handleChange}
                size="small"
                label="Notification Preference"
              >
                {notifications.map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileTab;
