// eslint-disable-next-line no-unused-vars
import React from "react";
import { Typography, Container } from "@mui/material";

const LifetimemembershipPage = () => {
  return (
    <Container
      maxWidth="xs" // Use 'xs' for a smaller container on mobile
      sx={{
        paddingLeft: { xs: 2, sm: 3 },
        paddingRight: { xs: 2, sm: 3 },
        textAlign: "center", // Center text for smaller screens
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          color: "primary.main",
          fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" }, // Adjust font size to fit smaller screen
        }}
      >
        Welcome to Lifetime Membership!
      </Typography>
      <Typography
        variant="h5"
        component="p"
        sx={{
          marginBottom: 3,
          color: "secondary.main",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // Smaller font size on mobile
        }}
      >
        You are a subscribed member.
      </Typography>
    </Container>
  );
};

export default LifetimemembershipPage;
