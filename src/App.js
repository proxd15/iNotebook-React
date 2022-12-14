import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react'
import React from 'react';

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  return (
    
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert} />
        <div className="container">
      <Routes>
    <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
    <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
