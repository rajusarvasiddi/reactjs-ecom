import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const TechnicialDetailsStep = () => {
  const [technicianSkillSet, setTechnicianSkillSet] = useState("");
  const handleTechnicianSkillSetChange = (event: any) => {
    const skillSet = event.target.value;
    setTechnicianSkillSet(skillSet);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Technician
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Technician ID"
            size="small"
            autoComplete="off"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="technician-status-label">
              Technician Skill set
            </InputLabel>
            <Select
              labelId="technician-status-label"
              id="technician-status"
              label="Technician Skill set"
              value={technicianSkillSet}
              onChange={handleTechnicianSkillSetChange}
            >
              <MenuItem value="">-Select-</MenuItem>
              <MenuItem value={1}>Skill 1</MenuItem>
              <MenuItem value={2}>Skill 2</MenuItem>
              <MenuItem value={3}>Skill 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Scheduled End Date & Time"
            size="small"
            autoComplete="off"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Estimated Labor Hours"
            size="small"
            autoComplete="off"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Remarks / Instructions"
            size="small"
            autoComplete="off"
          />
        </Grid>
      </Grid>
      {/* <div>Technician Name (Dropdown / Autocomplete)</div>
      <div>Technician Role / Skill Set</div>
      <div>Scheduled Start Date & Time</div>
      <div>Scheduled End Date & Time</div>
      <div>Estimated Labor Hours</div>
      <div>Remarks / Instructions</div> */}
    </>
  );
};

export default TechnicialDetailsStep;
