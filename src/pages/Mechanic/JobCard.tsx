import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

const JobCard = () => {
  const steps = [
    "Create Job Card",
    "Customer Info",
    "Job Details",
    "Mechanic",
    "Status",
  ];
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
            Job Card Management
          </Typography>
          <div>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <ul>
            <li>
              <h3>Create Job Card</h3>
              <div>VIN/Registration Number</div>
              <div>Vehicle Make & Model</div>
              <div>
                Before creating a new job card, check if there's an existing job
                card with status Pending/In Progress for this vehicle. If yes →
                show warning: "A job card already exists for this vehicle. Do
                you want to update it instead?" "This vehicle already has an
                active job card (<strong>ID: JC-101</strong>). Do you want to
                view/update it or create a new one?" [View / Update] [Create
                New]
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
        </Box>
      </Box>
    </>
  );
};

export default JobCard;
