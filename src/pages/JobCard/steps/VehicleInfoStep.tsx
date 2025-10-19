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
    <>
      <Typography variant="h6" gutterBottom>
        Vehicle Information
      </Typography>
      <Grid container direction={"column"} spacing={2}>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Rego Number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="VIN Number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4}>
          <FormControl size="small" fullWidth>
            <InputLabel id="vehicle-make-label">Make</InputLabel>
            <Select
              labelId="vehicle-make-label"
              id="vehicle-make"
              value={vehicleMake}
              label="Make"
              onChange={handleVehicleMakeChange}
            >
              {/* Placeholder */}
              <MenuItem value="">
                <em>-Select-</em>
              </MenuItem>

              {/* Actual options */}
              <MenuItem value={1}>Audi</MenuItem>
              <MenuItem value={2}>BMW</MenuItem>
              <MenuItem value={3}>Toyota</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <FormControl size="small" fullWidth>
            <InputLabel id="vehicle-model-label">Model</InputLabel>
            <Select
              labelId="vehicle-model-label"
              id="vehicle-model"
              value={vehicleModel}
              label="Model"
              onChange={handleVehicleModelChange}
            >
              {/* Placeholder */}
              <MenuItem value="">
                <em>-Select-</em>
              </MenuItem>

              {/* Actual options */}
              <MenuItem value="camry">Camry</MenuItem>
              <MenuItem value="rav4">RAV4</MenuItem>
              <MenuItem value="corolla">Corolla</MenuItem>
              <MenuItem value="supra">Supra</MenuItem>
              <MenuItem value="landCruiser">Land Cruiser</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Mileage"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid size={4}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" sx={{ mr: 1 }} size="small">
              Reset
            </Button>
            <Button variant="contained" size="small">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default VehicleInfoStep;
