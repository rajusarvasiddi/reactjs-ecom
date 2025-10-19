import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const CustomerInfoStep = () => {
  const [preferredComm, setPreferredComm] = useState("");
  const handlePreferredComm = (event: SelectChangeEvent) => {
    const preference = event.target.value;
    setPreferredComm(preference);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={6}>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="First Name"
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Middle Name"
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Last Name"
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Phone"
              size="small"
              autoComplete="off"
            />
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid size={6}>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="WhatsApp"
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small-label">
                Preferred Communication Channel
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={preferredComm}
                label="Preferred Communication Channel"
                onChange={handlePreferredComm}
              >
                <MenuItem value="">
                  <em>-Select-</em>
                </MenuItem>
                <MenuItem value={1}>Mobile</MenuItem>
                <MenuItem value={2}>Email</MenuItem>
                <MenuItem value={3}>WhatsApp</MenuItem>
              </Select>
            </FormControl>
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
    </>
  );
};

export default CustomerInfoStep;
