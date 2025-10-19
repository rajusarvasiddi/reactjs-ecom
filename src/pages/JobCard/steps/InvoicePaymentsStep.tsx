import { Box, Typography } from "@mui/material";

const InvoicePaymentsStep = () => {
  return (
    <>
      <Box sx={{ border: "1px solid #D3D3D3", mt: 2, pt: 2, p: 3 }}>
        <Typography
          variant="h6"
          sx={{ marginBottom: 2 }}
          fontWeight="bold"
          gutterBottom
        >
          Invoice and Payment
        </Typography>
      </Box>
    </>
  );
};

export default InvoicePaymentsStep;
