import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContextProvider'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <AuthProvider>
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  // </AuthProvider>,
)