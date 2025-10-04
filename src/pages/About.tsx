import { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";

const steps = ["Garage Details", "Upload Image"];

const About = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [garageData, setGarageData] = useState({
    name: "",
    location: "",
    capacity: "",
    type: "",
    owner: "",
    contact: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (activeStep === 0) {
      const isValid = validateAllFields();
      if (!isValid) return; // Stop if validation fails
    }
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const validateAllFields = () => {
    const fields = ["name", "location", "capacity", "type", "owner", "contact"];
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = garageData[field as keyof typeof garageData];
      validateField(field, value); // still updates errors state
      // Run validation logic again to collect errors
      let error = "";
      switch (field) {
        case "name":
          if (!value.trim()) error = "Garage name is required";
          break;
        case "location":
          if (value.length < 3)
            error = "Location must be at least 3 characters";
          break;
        case "capacity":
          if (!/^\d+$/.test(value)) error = "Capacity must be a number";
          break;
        case "type":
          if (!["Residential", "Commercial"].includes(value))
            error = "Invalid type";
          break;
        case "owner":
          if (!value.trim()) error = "Owner name is required";
          break;
        case "contact":
          if (!/^\d{10}$/.test(value))
            error = "Contact must be a 10-digit number";
          break;
      }
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGarageData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Garage name is required";
        break;
      case "location":
        if (value.length < 3) error = "Location must be at least 3 characters";
        break;
      case "capacity":
        if (!/^\d+$/.test(value)) error = "Capacity must be a number";
        break;
      case "type":
        if (!["Residential", "Commercial"].includes(value))
          error = "Invalid type";
        break;
      case "owner":
        if (!value.trim()) error = "Owner name is required";
        break;
      case "contact":
        if (!/^\d{10}$/.test(value))
          error = "Contact must be a 10-digit number";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    console.log("Garage Data:", garageData);
    console.log("Uploaded Image:", imageFile);
    // Send to backend or handle as needed
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 600, mx: "auto", mt: 2, p: 2 }}
      >
        {activeStep === 0 && (
          <>
            {["name", "location", "capacity", "type", "owner", "contact"].map(
              (field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={garageData[field as keyof typeof garageData]}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  error={Boolean(errors[field])}
                  helperText={errors[field] || ""}
                />
              )
            )}

            <TextField
              name="description"
              label="Description"
              multiline
              rows={3}
              value={garageData.description}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
          </>
        )}

        {activeStep === 1 && (
          <>
            <Typography variant="body1" gutterBottom>
              Upload a garage image:
            </Typography>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imageFile && (
              <Typography mt={2}>Selected: {imageFile.name}</Typography>
            )}
          </>
        )}

        <Box sx={{ mt: 4 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default About;
