import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import { COUNTRY_PINCODE } from "../../../constants";

interface GarageAddressProps {
  countries: {
    code: string;
    name: string;
  }[];
}

const GarageAddress = ({ countries }: GarageAddressProps) => {
  const { values, errors, touched, handleChange } =
    useFormikContext<FormValues>();

  return (
    <>
      {/* <Box
        component="fieldset"
        sx={{ border: "1px solid #ccc", borderRadius: 2, px: 2, mt: 2 }}
      > */}
      <Typography component="legend" sx={{ fontWeight: "bold" }}>
        Address
      </Typography>

      <TextField
        fullWidth
        label="Flat/Plot #"
        name="address.flatPlot"
        value={values.address.flatPlot}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      <TextField
        fullWidth
        label="Building Name"
        name="address.buildingName"
        value={values.address.buildingName}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      <TextField
        fullWidth
        label="Street"
        name="address.street"
        value={values.address.street}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      <TextField
        fullWidth
        label="City"
        name="address.city"
        value={values.address.city}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      <FormControl fullWidth size="small" margin="dense">
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          name="address.country"
          value={values.address.country}
          onChange={handleChange}
          displayEmpty
          label="Country"
          renderValue={(selected) => {
            if (!selected) return "-Select-";
            const country = countries.find((c) => c.code === selected);
            return country ? country.name : "";
          }}
        >
          <MenuItem value="">
            <em>-Select-</em>
          </MenuItem>
          {countries.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" margin="dense">
        <InputLabel id="state-select-label">State</InputLabel>
        <Select
          labelId="state-select-label"
          name="address.state"
          value={values.address.state}
          onChange={handleChange}
          displayEmpty
          label="State"
          renderValue={(selected) => {
            if (!selected) return "-Select-";
            const states = [
              { code: "AP", name: "Andhra Pradesh" },
              { code: "TG", name: "Telangana" },
            ];
            const state = states.find((s) => s.code === selected);
            return state ? state.name : "";
          }}
        >
          <MenuItem value="">
            <em>-Select-</em>
          </MenuItem>
          <MenuItem value="AP">Andhra Pradesh</MenuItem>
          <MenuItem value="TG">Telangana</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label={COUNTRY_PINCODE[values.address.country]?.label || "PIN/ZIP"}
        name="address.pinCode"
        value={values.address.pinCode}
        onChange={handleChange}
        error={touched.address?.pinCode && Boolean(errors.address?.pinCode)}
        helperText={touched.address?.pinCode && errors.address?.pinCode}
        margin="dense"
        size="small"
      />
      {/* </Box> */}
    </>
  );
};

export default GarageAddress;
