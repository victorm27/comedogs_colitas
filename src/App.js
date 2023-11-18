import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import './styles/styles.min.css';
import CrudUsers from './components/CrudUsers'
import Register from './components/Register';

function App() {
  return (
     <Router>
       <div className="App">
         <Routes>
           <Route exact path="/" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/users" element={<CrudUsers />} />
         </Routes>
       </div>
     </Router>
  );
}
export default App;
