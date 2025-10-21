import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const GrievanceStep = () => {
  const [reworkRequired, setReworkRequired] = useState("");
  const [grievanceType, setGrievanceType] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }} gutterBottom>
        Grievance Details
      </Typography>

      <Grid container spacing={2}>
        {/* Rework Required */}
        <Grid size={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Rework Required?</InputLabel>
            <Select
              value={reworkRequired}
              label="Rework Required?"
              onChange={(e) => setReworkRequired(e.target.value)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Grievance Type */}
        <Grid size={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Grievance Type</InputLabel>
            <Select
              value={grievanceType}
              label="Grievance Type"
              onChange={(e) => setGrievanceType(e.target.value)}
            >
              <MenuItem value="Delay">Delay</MenuItem>
              <MenuItem value="Quality Issue">Quality Issue</MenuItem>
              <MenuItem value="Parts Issue">Parts Issue</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Description of Issue */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Description of Issue"
            size="small"
            multiline
            rows={4}
            autoComplete="off"
          />
        </Grid>

        {/* Action Taken */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Action Taken"
            size="small"
            multiline
            rows={4}
            autoComplete="off"
          />
        </Grid>

        {/* Responsible Staff / Technician */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Responsible Staff / Technician"
            size="small"
            autoComplete="off"
          />
        </Grid>

        {/* Resolution Date */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Resolution Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Status */}
        <Grid size={6} sx={{ pb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default GrievanceStep;
