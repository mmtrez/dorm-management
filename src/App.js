import rtl from './rtl';
import './App.css';
import Entrance from "./pages/Entrance/Entrance";
import { ThemeProvider } from "@mui/material";
import theme from './theme';
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import {useState} from "react";
import Announcements from "./pages/Announcements/Announcements";

function App() {
    // STATE
    const [auth, setAuth] = useState(Boolean(Number(localStorage.getItem('auth'))) || false);
    const [role, setRole] = useState(localStorage.getItem('role') || undefined)
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || []);

  return (
      <ThemeProvider theme={theme}>
          <rtl children={
              <BrowserRouter>
                  <div className="App">
                      <Header auth={auth} setAuth={setAuth} setRole={setRole} />
                      <Routes>
                          {!auth &&
                              <Route path="*" element={<Entrance setAuth={setAuth} setRole={setRole} setUserInfo={setUserInfo} />}  />
                          }
                          {auth && <Route path="*" element={<Dashboard userInfo={userInfo} role={role} />} />}
                          <Route path="/announcements" element={<Announcements role={role} />} />
                      </Routes>
                  </div>
              </BrowserRouter>
          } />
      </ThemeProvider>
  );
}

export default App;
