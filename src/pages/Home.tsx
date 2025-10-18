import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to GMS
      </Typography>
      <Typography>
        Garage Management System — manage garages, mechanics, and services with
        ease.
      </Typography>
    </Box>
  );
};

export default Home;
