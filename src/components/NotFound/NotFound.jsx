import React from "react";
import "./notfound.css";
import "../Landing/Landing.css";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="father">
      <h1>Oops! Page not found!</h1>
      <img
        className="image"
        src="https://i.pinimg.com/originals/35/5e/8f/355e8fb8447bfb6db91f430922dcddd8.jpg"
        alt="Page not found"
      />
      <Link to="/home">
        <button className="btnLanding">Home</button>
      </Link>
    </div>
  );
}
