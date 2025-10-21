import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";

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
      <Grid container spacing={2}>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Work Started On (DateTime)"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Work Completed On (DateTime)"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="work-status-label">Work Status</InputLabel>
            <Select labelId="work-status-label" label="Work Status">
              <option value="">-Select-</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Parts Used"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Labor Hours Spent"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={12} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Remarks / Issues Encountered"
            size="small"
            autoComplete="off"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default WorkProgressStep;
