import { Grid, TextField, Typography } from "@mui/material";

const InspectionApprovalStep = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Inspection and Approval
      </Typography>
      <Grid container spacing={2}>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Inspection Date"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Inspector Name"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Approval Date"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={12} sx={{ mb: 2 }}>
          <TextField
            id="outlined-multiline-static"
            label="Condition Report / Checklist"
            multiline
            rows={6}
            fullWidth
            defaultValue=""
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Estimated Cost Approval (Yes / No)"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Approved By (Manager / Customer)"
            size="small"
            autoComplete="off"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InspectionApprovalStep;
