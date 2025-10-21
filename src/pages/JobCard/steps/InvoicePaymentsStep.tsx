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

const InvoicePaymentsStep = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold" gutterBottom>
        Invoice and Payment
      </Typography>

      <Grid container spacing={2}>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Invoice Number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Invoice Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Billing To (Customer / Company)"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Billing Address"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Job Cost"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Additional Charges"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Labor Charges"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Parts Charges"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Tax Amount"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Total Cost"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Discount (if any)"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Tax / GST"
            type="number"
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={paymentMode}
              label="Payment Mode"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Wallet">Wallet</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Payment Status</InputLabel>
            <Select
              value={paymentStatus}
              label="Payment Status"
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Payment Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid sx={{ width: "33.33%", mb: 2 }}>
          <TextField
            fullWidth
            label="Receipt Number"
            size="small"
            autoComplete="off"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InvoicePaymentsStep;
