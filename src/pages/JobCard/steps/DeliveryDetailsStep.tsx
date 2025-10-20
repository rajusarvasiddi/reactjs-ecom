import { Typography } from "@mui/material";

const DeliveryDetailsStep = () => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ marginBottom: 2 }}
        fontWeight="bold"
        gutterBottom
      >
        Delivery Details
      </Typography>
      <div>Delivery Date & Time</div>
      <div>Delivered By (Staff Name)</div>
      <div>Received By (Customer Name)</div>
      <div>Delivery Condition (Good / Damaged / Pending Parts)</div>
      <div>Delivery Remarks</div>
      <div>Signature Upload / Capture (Optional)</div>
    </>
  );
};

export default DeliveryDetailsStep;
