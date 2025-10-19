import { Box, Typography } from "@mui/material";

const JobDetailsStep = () => {
  return (
    <>
      <Box sx={{ border: "1px solid #D3D3D3", mt: 2, pt: 2, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Job Details
        </Typography>
        {/* <div>General Service, Brake fluid pop-up</div> */}
      </Box>
    </>
  );
};

export default JobDetailsStep;
