import React from 'react';
import { Modal, Box, Button, TextField, createTheme, ThemeProvider, Alert, Stack, CircularProgress } from '@mui/material';

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

const ReferralModal = ({ open, onClose, sendReferral }) => {
  const [alerts, setAlerts] = React.useState([]);
  const [state, setState] = React.useState({
    yourName: "",
    refereeEmail: "",
    refereeName: "",
    courseName: ""
  });
  const [loader, setLoader] = React.useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    const referralData = {
      yourName: state.yourName, 
      refereeName: state.refereeName, 
      refereeEmail: state.refereeEmail, 
      courseName: state.courseName, 
    };
    
    const result = await sendReferral(referralData);
    setLoader(false);
    
    if (result.success) {
      setAlerts([{ severity: 'success', message: 'Referral created successfully!' }]);
      
      
      setState({
        yourName: "",
        refereeEmail: "",
        refereeName: "",
        courseName: ""
      });
    } else {
      setAlerts([{ severity: 'error', message: `Errors: ${result.errors}` }]);
    }
    
    setTimeout(() => {
      setAlerts([]);
    }, 5000);
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="referral-modal-title"
        aria-describedby="referral-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
            position: 'relative',
          }}
        >
          {loader && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <h2 id="referral-modal-title">Refer a Course</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="Your Name"
              name="yourName"
              margin="normal"
              variant="outlined"
              value={state.yourName}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label="Referee's Name"
              name="refereeName"
              margin="normal"
              variant="outlined"
              value={state.refereeName}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label="Referee's Email"
              name="refereeEmail"
              margin="normal"
              variant="outlined"
              value={state.refereeEmail}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label="Course Name"
              margin="normal"
              name="courseName"
              variant="outlined"
              value={state.courseName}
              onChange={handleChange}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ px: 4, py: 1.5, mx: 1, borderRadius: 5 }}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={onClose}
                sx={{ px: 4, py: 1.5, mx: 1, borderRadius: 5 }}
              >
                Close
              </Button>
            </Box>
          </form>
          <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
            {alerts.map((alert, index) => (
              <Alert key={index} severity={alert.severity}>
                {alert.message}
              </Alert>
            ))}
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ReferralModal;
