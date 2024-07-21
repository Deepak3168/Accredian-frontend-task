import React from 'react';
import { Button } from '@mui/material';

const HeroSection = ({ openModal }) => {
  return (
    <div className="hero-section">
      <h1>Refer &  Earn</h1>
      <Button variant="contained" color="primary" onClick={openModal}>
        Refer Now
      </Button>
    </div>
  );
};

export default HeroSection;
