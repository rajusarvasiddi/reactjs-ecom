import { Typography } from "@mui/material";

const InspectionApprovalStep = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Inspection and Approval
      </Typography>
      <div>Inspection Date</div>
      <div>Inspector Name</div>
      <div>Condition Report / Checklist (Textarea or Checklist)</div>
      <div>Estimated Cost Approval (Yes / No)</div>
      <div>Approved By (Manager / Customer)</div>
      <div>Approval Date</div>
    </>
  );
};

export default InspectionApprovalStep;
