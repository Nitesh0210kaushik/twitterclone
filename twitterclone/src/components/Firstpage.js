import React from "react";
import { Link } from "react-router-dom";
import "./Firstpage.css"; 

function Firstpage() {
  return (
    <div className="twitter-page">
        <img
          src={require("../images/twitter.jpeg")} 
          alt="Twitter Logo"
          className="twitter-logo"
        />
      <div className="twitter-content">
        
        <div className="twitter-text">
          <h1>Happening Now</h1>
          <h2>Join Today</h2>
          <div className="twitter-auth-buttons">
            <Link to="/signup" className="twitter-auth-button">
              Create account
            </Link>
           
          </div>
        
            <p>Already have an account?</p>
            <Link to="/login" className="twitter-auth-button">
              Log In
            </Link>
       
        </div>
      </div>
    </div>
  );
}

export default Firstpage;
