import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { MechanicsList } from "pages/mockData/mechanicsList";
import { useState } from "react";

interface Mechanic {
  id: number;
  name: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  location: string;
}
const mechanicData = MechanicsList;
const MechanicList = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Mechanic>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleSort = (property: keyof Mechanic) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedMechanics = [...mechanicData].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  const filteredMechanics = sortedMechanics.filter((m) => {
    const query = search.toLowerCase().trim();
    return Object.values(m).some((value) =>
      value?.toString().toLowerCase().includes(query)
    );
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedMechanicsData = filteredMechanics.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Mechanic List
        </Typography>
        {/* 🔹 Search Bar (no new handlers or state) */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name, specialization, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2, maxWidth: 400 }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {[
                  { id: "name", label: "Name" },
                  { id: "specialization", label: "Specialization" },
                  { id: "experienceYears", label: "Experience (yrs)" },
                  { id: "rating", label: "Rating" },
                  { id: "location", label: "Location" },
                ].map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sx={{ fontWeight: "bold" }}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleSort(headCell.id as keyof Mechanic)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMechanicsData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.specialization}</TableCell>
                  <TableCell>{row.experienceYears}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mechanicData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default MechanicList;
