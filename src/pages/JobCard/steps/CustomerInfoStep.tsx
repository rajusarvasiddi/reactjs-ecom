import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const CustomerInfoStep = () => {
  return (
    <Box sx={{ border: "1px solid #D3D3D3", mt: 2, pt: 2, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={6}>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField fullWidth label="First Name" size="small" />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField fullWidth label="Middle Name" size="small" />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField fullWidth label="Last Name" size="small" />
          </Grid>
          <Grid size={12}>
            <TextField fullWidth label="Phone" size="small" />
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid size={6}>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField fullWidth label="Email" size="small" />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField fullWidth label="WhatsApp" size="small" />
          </Grid>
          <Grid size={12}>
            <TextField fullWidth label="Preferred Communication" size="small" />
          </Grid>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="outlined" sx={{ mr: 1 }} size="small">
            Reset
          </Button>
          <Button variant="contained" size="small">
            Save
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default CustomerInfoStep;
