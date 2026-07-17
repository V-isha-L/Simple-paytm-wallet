import { Route,Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

function App() {
  

  return (
   <>
   <Routes>
    <Route path="/Signup" element={<Signup/>}></Route>
    <Route path="/Signin" element={<Signin/>}></Route>
    <Route path="/Dashboard" element={<Dashboard/>}></Route>
    <Route path="/Send" element={<SendMoney/>}></Route>
   </Routes>
   </>
  )
}

export default App
