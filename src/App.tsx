import Header from "./components/Header"
import Login from "./pages/AuthPages/Login"
import Register from "./pages/AuthPages/Register"
import HomePage from "./pages/HomePage/HomePage"
import CustomInput from "./ui/Input"


function App() {
  return (
    <div>
      {/* <CustomInput label="Name" /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Header />
      <HomePage />
    </div>
  )
}

export default App
