import { useState, useEffect } from "react"
import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
import { useSnapshot } from 'valtio'
import { Box } from '@chakra-ui/react'

import Footer from "./components/Footer"
import Header from "./components/Header"
import Login from "./pages/AuthPages/Login"
import Register from "./pages/AuthPages/Register"
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from "./pages/HomePage/HomePage"
import ProfilePage from "./pages/Profile/ProfilePage";
import { store } from './store';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    // loader: homeLoader,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    // loader: postLoader,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
    // loader: postLoader,
  },
]);

const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    // loader: homeLoader,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
    // loader: postLoader,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    // loader: postLoader,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
    // loader: postLoader,
  },
]);

function App() {
  const queryClient = new QueryClient();
  const { isAuthenticated } = useSnapshot(store.auth);

  return (
    <QueryClientProvider client={queryClient} >
      <Header />
      <Box pt='50px'>
        <RouterProvider router={isAuthenticated ? privateRouter : router} />
      </Box>
      <Box bottom={0} position="fixed" width='100%'><Footer /></Box>
    </QueryClientProvider>
  )
}

export default App