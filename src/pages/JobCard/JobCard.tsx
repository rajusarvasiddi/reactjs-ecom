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
import { useEffect, useState } from "react";
import CustomerInfoStep from "./steps/CustomerInfoStep";
import DeliveryDetailsStep from "./steps/DeliveryDetailsStep";
import GrievanceStep from "./steps/GrievanceStep";
import InspectionApprovalStep from "./steps/InspectionApprovalStep";
import InvoicePaymentsStep from "./steps/InvoicePaymentsStep";
import JobDetailsStep from "./steps/JobDetailsStep";
import TechnicialDetailsStep from "./steps/TechnicialDetailsStep";
import VehicleInfoStep from "./steps/VehicleInfoStep";
import WorkProgressStep from "./steps/WorkProgressStep";

const JobCard = () => {
  const getStepFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const step = Number(params.get("step"));
    return step;
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

  const steps = [
    "Create Job Card",
    "Customer Info",
    "Job Details",
    "Technician",
    "Inspection & Approval",
    "Work Progress",
    "Invoice/Payment",
    "Delivered",
    "Re-work/Grievance",
  ];

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
              {getStepContent(activeStep)}
            </Box>
          </Box>

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
