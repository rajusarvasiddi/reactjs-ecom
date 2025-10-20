import { Typography } from "@mui/material";

const InvoicePaymentsStep = () => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ marginBottom: 2 }}
        fontWeight="bold"
        gutterBottom
      >
        Invoice and Payment
      </Typography>
      <div>Total Cost</div>
      <div>Discount (if any)</div>
      <div>Tax / GST</div>
      <div>Payment Mode (Cash / Card / Online / Wallet)</div>
      <div>Payment Status (Paid / Pending)</div>
      <div>Payment Date</div>
      <div>Receipt Number</div>
    </>
  );
};

export default InvoicePaymentsStep;
