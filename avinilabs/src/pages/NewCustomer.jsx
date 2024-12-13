// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import "../NewCustomer.css"; // Import the CSS file

const NewCustomer = () => {
  const [formData, setFormData] = useState({
    customername: "",
    mobileno: "",
    dob: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data submitted:", formData);
    // Add your API call here to send `formData` to the database
    setFormData({
      customername: "",
      mobileno: "",
      dob: "",
      gender: "",
      address: "",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="form-container">
      <div className="form-box">
        <Typography variant="h5" className="form-title" color="primary" >
          Register For Life Time Discount
        </Typography>

        <Grid container spacing={2} className="grid-container">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Name"
              name="customername"
              value={formData.customername}
              onChange={handleChange}
              required
              fullWidth
              className="text-field"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              name="mobileno"
              type="tel"
              value={formData.mobileno}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
              required
              fullWidth
              className="text-field"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              className="text-field"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              fullWidth
              className="text-field"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
              required
              fullWidth
              className="text-field"
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" className="submit-button">
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default NewCustomer;
