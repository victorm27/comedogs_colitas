import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import './styles/styles.min.css';
import CrudUsers from './components/CrudUsers'
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; 

function App() {
  return (
     <Router>
       <div className="App">
         <Routes>
           <Route exact path="/" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/users" element={<CrudUsers />} />
           <Route path='/forgotpassword' element={<ForgotPassword />} /> {/* Utiliza el nombre en mayúsculas aquí */}
         </Routes>
       </div>
     </Router>
  );
}
export default App;
