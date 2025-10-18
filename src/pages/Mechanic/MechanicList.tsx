import { Box, Typography } from "@mui/material";

const MechanicList = () => {
  return (
    <>
      <Box sx={{ maxWidth: 400, display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Mechanic List
        </Typography>
      </Box>
    </>
  );
};

export default MechanicList;
