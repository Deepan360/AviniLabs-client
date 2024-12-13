// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import "../CustomerPage.css"


const CustomerPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // Replace this with your actual API call to fetch customer data
    setTimeout(() => {
      setData([
        {
          id: 1,
          customername: "John Doe",
          mobileno: "1234567890",
          dob: "1995-01-15",
          gender: "Male",
          address: "123 Main St, City, Country",
        },
        {
          id: 2,
          customername: "Jane Smith",
          mobileno: "9876543210",
          dob: "1990-07-20",
          gender: "Female",
          address: "456 Elm St, City, Country",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box p={3} className="form-container">
      <Typography variant="h4" align="center" gutterBottom>
        Customer Details
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customername}</TableCell>
                  <TableCell>{row.mobileno}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CustomerPage;
