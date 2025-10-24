import { Box, Typography, useMediaQuery } from "@mui/material";

const JobCardsList = () => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#fafafa" }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" mb={3}>
          Job Cards List
        </Typography>
      </Box>
    </>
  );
};

export default JobCardsList;
