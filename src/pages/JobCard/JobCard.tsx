import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";

const steps = [
  "Create Job Card",
  "Customer Info",
  "Job Details",
  "Technician",
  "Inspection & Approval",
  "Work Log",
  "Invoice/Payment",
  "Delivered",
  "Re-work/Grievance",
];
const CustomerInfoStep = lazy(() => import("./steps/CustomerInfoStep"));
const DeliveryDetailsStep = lazy(() => import("./steps/DeliveryDetailsStep"));
const GrievanceStep = lazy(() => import("./steps/GrievanceStep"));
const InspectionApprovalStep = lazy(
  () => import("./steps/InspectionApprovalStep")
);
const InvoicePaymentsStep = lazy(() => import("./steps/InvoicePaymentsStep"));
const JobDetailsStep = lazy(() => import("./steps/JobDetailsStep"));
const TechnicialDetailsStep = lazy(
  () => import("./steps/TechnicialDetailsStep")
);
const VehicleInfoStep = lazy(() => import("./steps/VehicleInfoStep"));
const WorkProgressStep = lazy(() => import("./steps/WorkProgressStep"));

const JobCard = () => {
  const getStepFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const step = Number(params.get("step"));
    return isNaN(step) || step < 0 || step >= steps.length ? 0 : step;
  };

  const [activeStep, setActiveStep] = useState<number>(getStepFromUrl());
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  // Update URL whenever activeStep changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("step", activeStep.toString());
    window.history.replaceState(null, "", "?" + params.toString());
  }, [activeStep]);

  const handleVehicleMakeChange = (event: SelectChangeEvent) => {
    const make = event.target.value;
    setVehicleMake(make);
  };

  const handleVehicleModelChange = (event: SelectChangeEvent) => {
    const model = event.target.value;
    setVehicleModel(model);
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

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <VehicleInfoStep
            vehicleMake={vehicleMake}
            vehicleModel={vehicleModel}
            handleVehicleMakeChange={handleVehicleMakeChange}
            handleVehicleModelChange={handleVehicleModelChange}
          />
        );
      case 1:
        return (
          <>
            <Grid container>
              <Grid size={8}>
                <CustomerInfoStep />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid container>
              <Grid size={12}>
                <JobDetailsStep />
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return <TechnicialDetailsStep />;
      case 4:
        return <InspectionApprovalStep />;
      case 5:
        return <WorkProgressStep />;
      case 6:
        return <InvoicePaymentsStep />;
      case 7:
        return <DeliveryDetailsStep />;
      case 8:
        return <GrievanceStep />;
      default:
        return "Unknown/Invalid step";
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
            sx={{ marginBottom: 2 }}
            fontWeight="bold"
            gutterBottom
          >
            Job Card
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
          <Box sx={{ mb: 4 }}>
            <Box sx={{ border: "1px solid #D3D3D3", mt: 2, pt: 2, p: 3 }}>
              <Suspense fallback={<Typography>Loading step...</Typography>}>
                {getStepContent(activeStep)}
              </Suspense>
            </Box>
          </Box>

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
              variant="outlined"
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
