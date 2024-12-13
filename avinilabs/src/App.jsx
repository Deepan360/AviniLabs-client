// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LandingPage from "./pages/LandingPage";
import CustomerPage from "./pages/CustomerPage";
import NewCustomer from "./pages/NewCustomer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e30083",
    },
    secondary: {
      main: "#9e9e9f",
      contrastText: "#e30083",
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CustomerPage" element={<CustomerPage />} />
          <Route path="/NewCustomer" element={<NewCustomer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
