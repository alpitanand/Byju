import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import { Route, Link } from "react-router-dom";
import LandingPage from './Container/LandingPage/Landing'
function App() {
  return (
    <>
      <Navbar />
      <Route path="/" exact component={LandingPage}/>
    </>
  );
}

export default App;
