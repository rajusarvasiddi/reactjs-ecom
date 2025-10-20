import { Typography } from "@mui/material";

const GrievanceStep = () => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ marginBottom: 2 }}
        fontWeight="bold"
        gutterBottom
      >
        Re-work / Grievance
      </Typography>
      <div>Rework Required? (Yes / No)</div>
      <div>
        Grievance Type (Dropdown: Delay / Quality Issue / Parts Issue / Other)
      </div>
      <div>Description of Issue</div>
      <div>Action Taken</div>
      <div>Responsible Staff / Technician</div>
      <div>Resolution Date</div>
      <div>Status (Open / Closed / Pending)</div>
    </>
  );
};

export default GrievanceStep;
