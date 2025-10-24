import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
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

// lazy imports
const VehicleInfoStep = lazy(() => import("./steps/VehicleInfoStep"));
const CustomerInfoStep = lazy(() => import("./steps/CustomerInfoStep"));
const JobDetailsStep = lazy(() => import("./steps/JobDetailsStep"));
const TechnicialDetailsStep = lazy(
  () => import("./steps/TechnicialDetailsStep")
);
const InspectionApprovalStep = lazy(
  () => import("./steps/InspectionApprovalStep")
);
const WorkProgressStep = lazy(() => import("./steps/WorkProgressStep"));
const InvoicePaymentsStep = lazy(() => import("./steps/InvoicePaymentsStep"));
const DeliveryDetailsStep = lazy(() => import("./steps/DeliveryDetailsStep"));
const GrievanceStep = lazy(() => import("./steps/GrievanceStep"));

const JobCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStepFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const step = Number(params.get("step"));
    return isNaN(step) || step < 0 || step >= steps.length ? 0 : step;
  };

  const [activeStep, setActiveStep] = useState<number>(getStepFromUrl());
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("step", activeStep.toString());
    window.history.replaceState(null, "", "?" + params.toString());
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleVehicleMakeChange = (event: any) => {
    setVehicleMake(event.target.value);
  };
  const handleVehicleModelChange = (event: any) => {
    setVehicleModel(event.target.value);
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
        return <CustomerInfoStep />;
      case 2:
        return <JobDetailsStep />;
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
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: "#fafafa",
      }}
    >
      <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" mb={3}>
        Job Card
      </Typography>

      {/* Vertical Stepper (no scroll, no collapse) */}
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          ".MuiStepConnector-line": {
            minHeight: isMobile ? "30px" : "40px",
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              onClick={() => setActiveStep(index)}
              sx={{
                cursor: "pointer",
                "& .MuiStepLabel-label": {
                  fontWeight: index === activeStep ? "bold" : "normal",
                  color: index === activeStep ? "#000" : "#666",
                },
              }}
            >
              {label}
            </StepLabel>
            {index === activeStep && (
              <StepContent>
                <Box
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: 2,
                    p: { xs: 2, sm: 3 },
                    bgcolor: "#fff",
                    mt: 1,
                  }}
                >
                  <Suspense fallback={<Typography>Loading step...</Typography>}>
                    {getStepContent(activeStep)}
                  </Suspense>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: isMobile ? "space-between" : "flex-end",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={activeStep === 0}
                    onClick={handlePrevious}
                    sx={{
                      flex: isMobile ? 1 : "unset",
                    }}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{
                      flex: isMobile ? 1 : "unset",
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default JobCard;
