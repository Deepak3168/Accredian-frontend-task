import React, { useState } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import ReferalModal from './components/ReferalModal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';




const theme = createTheme({
  palette: {
    primary: {
      main: '#5DBA40', 
    },
    secondary: {
      main: '#5fb4e8', 
    },
  },
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

      

  const apiUrl = 'https://accredian-backend-task-d0ah.onrender.com/api/referrals'; 

  const sendReferral = async (referralData) => {
    console.log(referralData)
    try {
      const response = await axios.post(apiUrl, referralData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      if (response.status === 201) {
        return { success: true };
      } else {
        return { success: false, errors: 'Unexpected response status' };
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map((err) => err.msg).join(', ');
        return { success: false, errors: errorMessages };
      }
      return { success: false, errors: 'An unexpected error occurred.' };
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='hero'>
        <HeroSection openModal={openModal} />
      </div>
      <ReferalModal open={isModalOpen} onClose={closeModal} sendReferral={sendReferral} />
    </ThemeProvider>
  );
}

export default App;
