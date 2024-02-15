

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Addngo from "./pages/Addngo";
import AddRest from "./pages/AddRest"
import Restaurantdashboard from "./pages/RestaurantDashboard";
import Restaurent from "./pages/Restaurent";
import Ngo from "./pages/Ngo";

function App() {
  return (

  <BrowserRouter>
      <Routes>
    <Route exact path='/login'  element={<Login/>}></Route>
     <Route exact path='/signup'  element={<Signup/>}></Route>
     <Route exact path='/addngo'  element={<Addngo/>}></Route>
     <Route exact path='/addres'  element={<AddRest/>}></Route>
     <Route exact path='/rest'  element={<Restaurent/>}></Route>
     <Route exact path='/ngo'  element={<Ngo/>}></Route>
     <Route exact path='/dashboard'  element={<Restaurantdashboard/>}></Route>
     
     
  
    <Route exact path='/'  element={<Home/>}></Route>

  
   
    
      </Routes>

    </BrowserRouter>
   
  
  );
}

export default App;
