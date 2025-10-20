import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
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
  const partsRequired = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const [serviceType, setServiceType] = useState("");
  const [partName, setPartName] = useState<string[]>([]);
  const handleServiceTypeChange = (event: SelectChangeEvent) => {
    const serviceType = event.target.value;
    setServiceType(serviceType);
  };

  const handlePartNameChange =
    () => (event: SelectChangeEvent<typeof partName>) => {
      const {
        target: { value },
      } = event;
      setPartName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Job Details
      </Typography>
      <Grid container spacing={2}>
        <Grid size={5}>
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

        <Grid size={3}>
          <Grid size={12} sx={{ mb: 1 }}>
            <FormControl
              sx={{ my: 1, mx: 0 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Service Type</FormLabel>
              <FormGroup>
                {serviceTypes.map((service: any) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={service?.isChecked}
                        name={service.name}
                      />
                    }
                    label={service?.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid size={3}>
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
                    control={
                      <Checkbox checked={part?.isChecked} name={part.name} />
                    }
                    label={part?.name}
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
