import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoutes from "./routing/AuthRoutes";
import HomePage from "./pages/HomePage";
import AddPost from "./pages/AddPost";
import axios from "axios";
import ProtectedRoute from "./routing/ProtectedRoute";
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "./context/AuthContext";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
axios.defaults.withCredentials = true;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // main: "#f57c00",
        main: "#002884",
        // main: "#757ce8",
        // main: "#3f50b5",
      },
      secondary: {
        main: "#ba000d",
        // main: "#006064",
      },
      darkgray:{
        main:"#455a64"
      },
      red:{
        main:"#aa2e25"
      }
    },
  });
  const auth = useAuth();
  return !auth.loading?(
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/addpost"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <AuthRoutes>
              <Register />
            </AuthRoutes>
          }
        />
      </Routes>
    </ThemeProvider>
  ):(<div className='w-[100vw] h-[100vh] flex justify-center items-center'><CircularProgress color="primary" /></div>)
}

export default App;
