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
  Link,
  Container,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";
import "../NewCustomer.css"
import { useNavigate } from "react-router-dom";





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
const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is small

  useEffect(() => {
    setIsLoading(true);
    fetch("http://136.185.14.8:8776/auth/company/getcity")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setCities(data.data);
          setErrorMessage("");
        } else {
          setErrorMessage("Error fetching city data. Please try again later.");
        }
      })
      .catch(() => {
        setErrorMessage("Failed to load cities. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (event, value) => {
    const selectedCity = cities.find((city) => city.city === value);
    setFormData((prev) => ({
      ...prev,
      city: value || "",
      state: selectedCity ? selectedCity.state : "",
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.customername || !formData.mobileno || !formData.city) {
    setSnackbarMessage("Please fill all required fields.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
    return;
  }

  try {
    setIsSubmitting(true);
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
      setSnackbarMessage(result.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Clear form data
      setFormData({
        customername: "",
        mobileno: "",
        dob: "",
        gender: "",
        address: "",
        city: "",
        state: "",
      });

   
        navigate("/LifetimemembershipPage"); // Replace with your actual route path

    } else {
      setSnackbarMessage(result.error || "Failed to add customer.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  } catch {
    setSnackbarMessage("Failed to add customer. Please try again.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  } finally {
    setIsSubmitting(false);
  }
};

  const inputStyles = {
    "& .MuiInputBase-root": {
      backgroundColor: "white", // Input background
      color: "black", // Text color
    },
    "& .MuiInputLabel-root": {
      color: "black", // Label color
    },
    "& .MuiInputLabel-shrink": {
      backgroundColor: "white", // Label background when shrunk
      padding: "0 4px", // Adds padding to avoid overlapping with border
    },
  };

  return (
    <>
      <Container
        sx={{
          padding: isMobile ? 2 : 5,
          boxShadow: 3,
          borderRadius: 5,
          borderColor: grey,
          backgroundColor: theme.palette.primary.light, // Use the lighter shade
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              style={{
                width: isMobile ? "100px" : "400px",
                height: "auto",
              }}
            />
          </Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="white"
            mb={2}
          >
            Register For Life Time Discount
          </Typography>

          {errorMessage && (
            <Typography variant="body1" color="error" mb={2}>
              {errorMessage}
            </Typography>
          )}

          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="customername"
                label="Customer Name *"
                placeholder="Customer Name"
                value={formData.customername}
                onChange={handleChange}
                fullWidth
                sx={inputStyles}
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
                sx={inputStyles}
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
                sx={inputStyles}
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
                sx={inputStyles}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

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
                    sx={inputStyles}
                  />
                )}
                loading={isLoading}
                noOptionsText={isLoading ? "Loading..." : "No cities found"}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State Name"
                name="state"
                value={formData.state}
                disabled
                fullWidth
                sx={inputStyles}
              />
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
                sx={inputStyles}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 2,color:"white" }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
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

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
      </Container>
      <Typography
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "center",
          alignItems: "center",
          mt: 2,
          color: "grey",
        }}
      >
        Powered by{" "}
        <Link
          href="https://akilamtechnology.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            ml: 0.5,
            "&:hover": { color: "primary.main" },
          }}
        >
          Akilam Technology
        </Link>
        <FavoriteIcon
          sx={{
            color: "primary.main",
            ml: 0.5,
          }}
        />
      </Typography>
    </>
  );
};

export default NewCustomer;
