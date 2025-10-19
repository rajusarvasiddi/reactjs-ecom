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

interface VehicleInfoStepProps {
  vehicleMake: string;
  vehicleModel: string;
  handleVehicleMakeChange: (event: SelectChangeEvent) => void;
  handleVehicleModelChange: (event: SelectChangeEvent) => void;
}

const VehicleInfoStep: React.FC<VehicleInfoStepProps> = ({
  vehicleMake,
  vehicleModel,
  handleVehicleMakeChange,
  handleVehicleModelChange,
}) => {
  return (
    <Box sx={{ border: "1px solid #D3D3D3", mt: 2, pt: 2, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Vehicle Information
      </Typography>
      <Grid container direction={"column"} spacing={2}>
        <Grid size={4}>
          <TextField fullWidth label="VIN / Rego Number" size="small" />
        </Grid>
        <Grid size={4}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-select-small-label">Make</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={vehicleMake}
              label="Age"
              displayEmpty
              onChange={handleVehicleMakeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Audi</MenuItem>
              <MenuItem value={20}>BMW</MenuItem>
              <MenuItem value={30}>Toyota</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-select-small-label">Model</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={vehicleModel}
              label="Model"
              displayEmpty
              onChange={handleVehicleModelChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"camry"}>Camry</MenuItem>
              <MenuItem value={"rav4"}>RAV4</MenuItem>
              <MenuItem value={"corolla"}>Corolla</MenuItem>
              <MenuItem value={"supra"}>Supra</MenuItem>
              <MenuItem value={"landCruiser"}>Land Cruiser</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Mileage" size="small" />
        </Grid>
        <Grid size={4}>
          <Button variant="outlined" sx={{ mr: 1 }} size="small">
            Reset
          </Button>
          <Button variant="contained" size="small">
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehicleInfoStep;
