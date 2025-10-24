import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useState } from "react";

const DeliveryDetailsStep = () => {
  const [deliveryCondition, setDeliveryCondition] = useState("");
  const [signature, setSignature] = useState<File | null>(null);

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSignature(e.target.files[0]);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }} gutterBottom>
        Delivery Details
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 2 }}>
          <TextField
            fullWidth
            label="Delivery Date & Time"
            type="datetime-local"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 2 }}>
          <TextField
            fullWidth
            label="Delivered By (Staff Name)"
            size="small"
            autoComplete="off"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 2 }}>
          <TextField
            fullWidth
            label="Received By (Customer Name)"
            size="small"
            autoComplete="off"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Delivery Condition</InputLabel>
            <Select
              value={deliveryCondition}
              label="Delivery Condition"
              onChange={(e) => setDeliveryCondition(e.target.value)}
            >
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Pending Parts">Pending Parts</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 2 }}>
          <TextField
            fullWidth
            label="Delivery Remarks"
            size="small"
            multiline
            rows={2}
            autoComplete="off"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 2 }}>
          <Button variant="outlined" component="label" fullWidth size="small">
            Upload / Capture Signature
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleSignatureChange}
            />
          </Button>
          {signature && (
            <Typography variant="caption">{signature.name}</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DeliveryDetailsStep;
