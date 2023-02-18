import { useState, useEffect } from "react"
import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Footer from "./components/Footer"
import Header from "./components/Header"
import Login from "./pages/AuthPages/Login"
import Register from "./pages/AuthPages/Register"
import HomePage from "./pages/HomePage/HomePage"
import ProfilePage from "./pages/Profile/ProfilePage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" 
  // element={<Layout />}
  >
    <Route index element={<HomePage />} />
    <Route path="profile" element={<ProfilePage />}>
      <Route path="contacts" element={<p>Our contact</p>} />
      <Route path="team" element={<p>Our team</p>} />
    </Route>
    <Route path="about-us" element={<Navigate to="/about" replace />} />
    {/* <Route path="posts/new" element={
      <RequireAuth>
        <Createpost />
      </RequireAuth>
    } /> */}
    <Route path="login" element={<Login />} />
    {/* <Route path="*" element={<Notfoundpage />} /> */}
  </Route>
))

function App() {
  const [isAuthentificated, setIsAuthentificated ] = useState<boolean>(false);
  return (
      <RouterProvider router={router} />
    // <Routes>
    //   <Header />
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <PrivateRoute
    //       path="/profile"
    //       element={<ProfilePage />}
    //       authenticated={isAuthentificated}
    //     />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    //   <Footer />
    // </Routes>
  )
}

export default App