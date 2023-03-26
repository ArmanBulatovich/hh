import { useState, useEffect, useContext } from "react";
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box } from "@chakra-ui/react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import { useSnapshot } from "valtio";

import { store } from "./store/store";
import { Profile } from "./pages/Profile/Profile";
import { ProfileVUZ } from "./pages/Profile/ProfileVUZ";

function App() {
  const queryClient = new QueryClient();
  const { isAuthenticated } = useSnapshot(store.auth);
  const tokenFromLocalStorage = localStorage.getItem("token");

  useEffect(() => {
    if (tokenFromLocalStorage) {
      store.auth.isAuthenticated = true;
    } else {
      store.auth.isAuthenticated = false;
    }
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Box pt="70px">
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />,
            <Route path="/login" element={<Login />} />,
            <Route path="/register" element={<Register />} />,
            {isAuthenticated && (
              <Route>
                <Route path="/profilePage" element={<Profile />} />
                <Route path="/profile" element={<ProfileVUZ />} />
              </Route>
            )}
          </Route>
        </Routes>
      </Box>
      <Box bottom={0} position="fixed" width="100%">
        <Footer />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
