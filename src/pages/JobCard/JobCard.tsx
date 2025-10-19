import { BorderTop } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const JobCard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleMake, setVehicleMake] = useState("");

  const handleVehicleMakeChange = (event: SelectChangeEvent) => {
    const make = event.target.value;
    setVehicleMake(make);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const steps = [
    "Create Job Card",
    "Customer Info",
    "Inspection",
    "Job Details",
    "Mechanic",
    "Completed",
    "Delivered",
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ border: "1px solid #D3D3D3", mt: 2, pt: 2, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Information
            </Typography>
            <Grid container direction={"column"} spacing={2}>
              <Grid size={4}>
                <TextField
                  fullWidth
                  label="VIN / Registration Number"
                  size="small"
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  fullWidth
                  label="Vehicle Make & Model"
                  size="small"
                />
              </Grid>
              <Grid size={4}>
                <FormControl sx={{ m: 1 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small-label">Make</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={vehicleMake}
                    label="Age"
                    onChange={handleVehicleMakeChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Audi</MenuItem>
                    <MenuItem value={20}>BMW</MenuItem>
                    <MenuItem value={30}>Toyota</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={4}>
                <Button variant="outlined" sx={{ mr: 1 }} size="small">
                  Reset
                </Button>
                <Button variant="contained" size="small">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={8}>Grid size 8</Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Vehicle Inspection
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Job Details
            </Typography>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Assign Mechanic
            </Typography>
          </Box>
        );
      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Job Completion
            </Typography>
          </Box>
        );
      case 6:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Vehicle Delivered
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h4"
            sx={{ marginBottom: 4 }}
            fontWeight="bold"
            gutterBottom
          >
            Job Cards
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  onClick={() => setActiveStep(index)}
                  sx={{ cursor: "pointer" }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mb: 4 }}>{getStepContent(activeStep)}</Box>

          {/* <div>
            <ul>
              <li>
                <h3>Create Job Card</h3>
                <div>VIN/Registration Number</div>
                <div>Vehicle Make & Model</div>
                <div>
                  Before creating a new job card, check if there's an existing
                  job card with status Pending/In Progress for this vehicle. If
                  yes → show warning: "A job card already exists for this
                  vehicle. Do you want to update it instead?" "This vehicle
                  already has an active job card (<strong>ID: JC-101</strong>).
                  Do you want to view/update it or create a new one?" [View /
                  Update] [Create New]
                </div>
                <div>
                  <strong>Customer Information</strong>
                </div>
                <div>Name, Contact</div>
              </li>
              <li>
                <h3>Job Card Management</h3>
                <div>List (active, pending, completed)</div>
                <div>
                  <strong>Update Job Card</strong>
                </div>
                <ul>
                  <li>Add or modify services</li>
                  <li>Updated Parts Used</li>
                  <li>Add mechanic notes</li>
                  <li>
                    Track status (Pending, In Progress, Completed, Delivered)
                  </li>
                </ul>
                <li>Invoice</li>
              </li>
              <li>
                <h3>Job Card History</h3>
              </li>
              <li>History of past services</li>
              <li>Reports (service trends, frequent repairs)</li>
              <li>
                <h3>Notifications</h3>
              </li>
              <li>Notify customers about job status (SMS/Email)</li>
              <li>Notify mechanics about assigned jobs</li>
            </ul>
          </div> */}
          <Box
            sx={{
              flex: "1 1 auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                mr: 1,
                border: "1px solid #000",
                "&:disabled": {
                  border: "1px solid #D3D3D3",
                },
              }}
              disabled={activeStep === 0}
              onClick={handlePrevious}
            >
              Previous
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                sx={{ mr: 1, border: "1px solid #000" }}
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button sx={{ mr: 1, border: "1px solid #000" }}>Finish</Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default JobCard;
