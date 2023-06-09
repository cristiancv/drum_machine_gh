import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from './App.jsx'
import Parent from "./components/Parent";

createRoot(document.getElementById("root")).render(
  /*
  <React.StrictMode>
    <App />
  </React.StrictMode>
  */
  <StrictMode>
    <Parent />
  </StrictMode>
);
