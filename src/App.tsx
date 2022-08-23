import React, { useEffect } from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { HomePage, HomePage2, HomePage3 } from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

const defaultHome = "/home";

const FakeHome = () => <section>-</section>

export default function App() {
  const loc = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if (loc.pathname === "/") {
      navigate(defaultHome);
    }
  },[loc])
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={RouterLink}
            to="/"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon/>
          </IconButton>
          <div style={{flexGrow: 1}}/>
          <Button color="inherit" component={RouterLink} to="/signup">
            Signup
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{height: "2rem"}}/>
      <Routes>
        <Route path="/" element={<FakeHome />}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/home2" element={<HomePage2/>}/>
        <Route path="/home3" element={<HomePage3/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        {/*<Route path="/auth" element={<LoginPage />} />*/}
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}
