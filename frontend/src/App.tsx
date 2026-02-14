import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessage = async () => {
    setLoading(true);
    setError("");
    try {
      // In dev with Vite proxy, use relative URL. Otherwise use VITE_API_URL (e.g. http://localhost:3001).
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/hello`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (e: unknown) {
      setError(`Failed to fetch message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React + Node.js Template
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            React Frontend
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            Click the button below to fetch a message from the Node.js backend.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchMessage}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Fetch Message"}
          </Button>

          {message && (
            <Paper elevation={3} sx={{ mt: 4, p: 2, width: "100%" }}>
              <Typography variant="h6" component="p" align="center">
                Backend Response:
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary">
                {message}
              </Typography>
            </Paper>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 4, width: "100%" }}>
              {error}
            </Alert>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
