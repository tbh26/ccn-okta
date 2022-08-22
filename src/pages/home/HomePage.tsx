// src/pages/home/HomePage.tsx
import React from "react";

import { Typography, Container } from "@mui/material";

export default function HomePage() {
  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      <p>Welcome!</p>
    </Container>
  );
}
