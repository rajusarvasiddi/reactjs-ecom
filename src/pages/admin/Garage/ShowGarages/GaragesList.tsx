import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useCompanies } from "../../../../shared/hooks/useCompanies";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Company {
  id: number;
  name: string;
  country: string;
}

const GarageList = () => {
  const [age, setAge] = useState("");
  // const dispatch = useDispatch();
  const currentRole = useSelector((state: any) => state.role.role);
  const { companies, error, retry } = useCompanies() as {
    companies: Company[];
    error: string | null;
    retry: () => void;
  };
  const handleChange = (event: any) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Left sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: "grey.100",
          borderRight: "1px solid #FCFAFA",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, borderBottom: "1px solid #FCFAFA" }}>
          <Typography variant="h6" fontWeight="bold">
            Garages {currentRole || "admin"}
          </Typography>
        </Box>

        {/* Search bar */}
        <Box sx={{ p: 1, borderBottom: "1px solid #FCFAFA" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search companies..."
            sx={{ background: "#FFFFFF" }}
            variant="outlined"
          />
        </Box>

        {/* Fixed height scrollable company list */}
        <Box
          sx={{
            height: 400,
            overflowY: "auto",
            p: 1,
          }}
        >
          {error ? (
            <Button variant="outlined" onClick={retry} fullWidth>
              Retry
            </Button>
          ) : (
            companies.map((c) => (
              <Box
                key={c.id}
                sx={{
                  p: 1,
                  borderBottom: "1px solid #FCFAFA",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {c.name}
                </Typography>
                <Typography color="text.secondary">{c.country}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* Right content area with fixed height */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: 600, // fixed height for the right panel
          borderLeft: "1px solid #FCFAFA",
        }}
      >
        {/* Sticky header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #FCFAFA",
            bgcolor: "white",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Details / Content Area
          </Typography>
        </Box>

        {/* Scrollable content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value="">
                    <em>-- Select --</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          {Array.from({ length: 50 }).map((_, index) => (
            <Typography key={index} paragraph>
              Paragraph {index + 1}: Selecting a company from the left sidebar
              allows you to view detailed information about that company in this
              content area. This feature is designed to streamline your workflow
              and make it easier to manage multiple companies within your garage
              management system. By presenting a list of companies in a
              scrollable sidebar, you can quickly navigate between different
              organizations without losing context. The right panel is reserved
              for displaying comprehensive details, such as company profiles,
              contact information, and associated garages.
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GarageList;
