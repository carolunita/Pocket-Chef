import React from "react";
import "./Button.css";

// Destructuring the type, className, children and onClick props, applying them to the button element
const Button = ({ type = "default", className, children, onClick }) => (
  <button
    onClick={onClick}
    className={["button", `btn-${type}`, className].join(" ")}
  >
    {children}
  </button>
);

export default Button;
