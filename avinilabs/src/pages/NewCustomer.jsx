// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Autocomplete,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
 

const NewCustomer = () => {
  const [formData, setFormData] = useState({
    customername: "",
    mobileno: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
  });

  const [cities, setCities] = useState([]); // Holds city & state data
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const [openSnackbar, setOpenSnackbar] = useState(false); // To control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message content
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // To define severity for Snackbar
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submission state

  // Fetch city-state data
  useEffect(() => {
    setIsLoading(true); // Set loading to true when starting the fetch
    fetch("http://136.185.14.8:8776/auth/company/getcity")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setCities(data.data);
          setErrorMessage(""); // Clear any previous error messages
        } else {
          setErrorMessage("Error fetching city data. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error fetching city data:", error); // Optional logging
        setErrorMessage("Failed to load cities. Please try again later.");
      })
      .finally(() => setIsLoading(false)); // Set loading to false when fetch is complete
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle city selection
  const handleCityChange = (event, value) => {
    const selectedCity = cities.find((city) => city.city === value);
    setFormData((prev) => ({
      ...prev,
      city: value || "",
      state: selectedCity ? selectedCity.state : "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are missing
    if (!formData.customername || !formData.mobileno || !formData.city) {
      setSnackbarMessage("Please fill all required fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Proceed with form submission
    try {
      setIsSubmitting(true); // Set submitting state to true while sending request
      const response = await fetch(
        "http://136.185.14.8:8776/auth/addCustomeravini",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        // Show success message if the response is successful
        setSnackbarMessage(result.message);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setFormData({
          customername: "",
          mobileno: "",
          dob: "",
          gender: "",
          address: "",
          city: "",
          state: "",
        }); // Clear the form data after submission
      } else {
        // Show error message if the backend sends an error
        setSnackbarMessage(result.error || "Failed to add customer.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      setSnackbarMessage("Failed to add customer. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false); // Reset submitting state after the request
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        padding: 5,
        boxShadow: 3,
        borderRadius: 5,
        borderColor: grey,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <img
          src="/images/logo.jpeg" // Correct path to the logo in the public directory
          alt="Logo"
          style={{ width: "400px", height: "auto" }} // Adjust the size as needed
        />
      </Box>
      <Typography variant="h5" color="primary" mb={2}>
        Register For Life Time Discount
      </Typography>

      {/* Display error message */}
      {errorMessage && (
        <Typography variant="body1" color="error" mb={2}>
          {errorMessage}
        </Typography>
      )}

      <Grid container spacing={2}>
        {/* Customer Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Customer Name"
            name="customername"
            value={formData.customername}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>

        {/* Mobile Number */}
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
          />
        </Grid>

        {/* Date of Birth */}
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
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        {/* Autocomplete for City */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={cities.map((city) => city.city) || []}
            value={formData.city}
            onChange={handleCityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City Name"
                required
                fullWidth
                disabled={isLoading}
              />
            )}
            loading={isLoading}
            noOptionsText={isLoading ? "Loading..." : "No cities found"}
          />
        </Grid>

        {/* State Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="State Name"
            name="state"
            value={formData.state}
            disabled
            fullWidth
          />
        </Grid>

        {/* Address */}
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
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            !formData.customername ||
            !formData.mobileno ||
            !formData.city ||
            formData.mobileno.length !== 10 ||
            isSubmitting
          }
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>

      {/* Snackbar for success or error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center the Snackbar at the top
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewCustomer;
