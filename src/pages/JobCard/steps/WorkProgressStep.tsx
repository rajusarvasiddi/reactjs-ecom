import { Typography } from "@mui/material";

const WorkProgressStep = () => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ marginBottom: 2 }}
        fontWeight="bold"
        gutterBottom
      >
        Work Progress
      </Typography>
      <div>Work Started On (DateTime)</div>
      <div>Work Completed On (DateTime)</div>
      <div>
        Work Status (Dropdown: Pending / In Progress / Completed / On Hold)
      </div>
      <div>Parts Used (Multiselect)</div>
      <div>Labor Hours Spent</div>
      <div>Remarks / Issues Encountered</div>
    </>
  );
};

export default WorkProgressStep;
