import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const handleSubmit = () => {
  return;
};

const GarageCreate = () => {
  const [state, setState] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mt: 2, p: 2 }}
        gap={1}
        autoComplete="off"
      >
        <Typography variant="h4" fontWeight={"bold"} gutterBottom>
          Create Garage
        </Typography>
        <TextField fullWidth label="Garage Name" margin="dense" size="small" />
        <TextField fullWidth label="Email" margin="dense" size="small" />
        <TextField fullWidth label="Phone" margin="dense" size="small" />
        <TextField fullWidth label="WhatsApp" margin="dense" size="small" />
        <TextField fullWidth label="Owner" margin="dense" size="small" />
        <TextField fullWidth label="Description" margin="dense" size="small" />
        <Typography variant="body1" fontWeight={"bold"} gutterBottom>
          Address
        </Typography>
        <TextField fullWidth label="Flat/Plot" margin="dense" size="small" />
        <TextField fullWidth label="Street" margin="dense" size="small" />
        <TextField fullWidth label="City" margin="dense" size="small" />
        <FormControl fullWidth size="small" margin="dense">
          <InputLabel id="state-select-label">State</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={state}
            onChange={handleChange}
            label="State"
          >
            <MenuItem value="AP">Andhra Pradesh</MenuItem>
            <MenuItem value="TG">Telangana</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Country" margin="dense" size="small" />
        <TextField fullWidth label="PIN Code" margin="dense" size="small" />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default GarageCreate;
