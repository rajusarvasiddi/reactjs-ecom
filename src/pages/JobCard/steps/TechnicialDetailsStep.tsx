import { Typography } from "@mui/material";

const TechnicialDetailsStep = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Technician
      </Typography>
      <div>Technician Name (Dropdown / Autocomplete)</div>
      <div>Technician Role / Skill Set</div>
      <div>Scheduled Start Date & Time</div>
      <div>Scheduled End Date & Time</div>
      <div>Estimated Labor Hours</div>
      <div>Remarks / Instructions</div>
    </>
  );
};

export default TechnicialDetailsStep;
