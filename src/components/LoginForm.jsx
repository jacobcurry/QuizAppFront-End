import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Error from "../assets/Error.png";

const theme = createTheme();

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://lit-anchorage-15647.herokuapp.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
    }
  };

  const triggerLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
    props.updateUser(email);
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1em",
            borderRadius: "20px",
            backgroundColor: "white",
            boxShadow: "4px 4px 4px var(--primary)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1aac83" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={triggerLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#1aac83" }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: "#1aac83" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {error && (
              <div className="error-msg">
                <img className="error-img" src={Error} alt="error" />
                <p> {error}</p>
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// export default App;
