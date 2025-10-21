import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
const JobDetailsStep = () => {
  const serviceTypes = [
    { id: 1, name: "General", isChecked: true },
    { id: 2, name: "Electrical" },
    { id: 3, name: "Mechanical", isChecked: true },
    { id: 4, name: "Body Work" },
    { id: 5, name: "Painting" },
    { id: 6, name: "Tire Service" },
    { id: 7, name: "Oil Change" },
    { id: 8, name: "Brake Service" },
    { id: 9, name: "Transmission Repair" },
    { id: 10, name: "Engine Repair" },
  ];
  const parts = [
    { id: 1, name: "Engine Oil" },
    { id: 2, name: "Brake Pads" },
    { id: 3, name: "Air Filter" },
    { id: 4, name: "Spark Plugs" },
    { id: 5, name: "Battery" },
    { id: 6, name: "Tires" },
    { id: 7, name: "Alternator" },
    { id: 8, name: "Radiator" },
    { id: 9, name: "Clutch" },
    { id: 10, name: "Fuel Pump" },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Job Details
      </Typography>
      <Grid container spacing={2}>
        {/* Main column: spans full width on xs, 7/12 on md and up */}
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              id="outlined-multiline-static"
              label="Problem Reported"
              multiline
              rows={14}
              fullWidth
              defaultValue=""
            />
          </Grid>

          <Grid size={12} sx={{ mb: 1 }}>
            <TextField fullWidth label="Estimated Cost" size="small" />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Expected Completion Date"
              size="small"
            />
          </Grid>

          <Grid size={12} sx={{ mb: 1 }}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="Warranty applicable?"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* Service column: stacks under main on small screens, becomes its own column on lg */}
        <Grid size={{ xs: 12, md: 5, lg: 3 }}>
          <Grid size={12} sx={{ mb: 1 }}>
            <FormControl
              sx={{ mb: 1, mt: 0, mx: 0 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Service Type</FormLabel>
              <FormGroup>
                {serviceTypes.map((service: any) => (
                  <FormControlLabel
                    key={service.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={service?.isChecked}
                        name={service.name}
                      />
                    }
                    label={service?.name}
                    sx={{ my: -0.5 }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* Parts column: stacks under main on small screens, becomes its own column on lg */}
        <Grid size={{ xs: 12, md: 12, lg: 3 }}>
          <Grid size={12} sx={{ mb: 1 }}>
            <FormControl
              sx={{ my: 1, mx: 0 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Parts Required</FormLabel>
              <FormGroup>
                {parts.map((part: any) => (
                  <FormControlLabel
                    key={part.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={part?.isChecked}
                        name={part.name}
                      />
                    }
                    label={part?.name}
                    sx={{ my: -0.5 }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default JobDetailsStep;
