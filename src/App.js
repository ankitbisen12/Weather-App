import React, { useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Weather from "./components/weather";
import Footer from "./components/footer";

function App() {
  const [city, setCity] = useState("Bangalore");

  return (
    <div className="bg-custom-gradient">
      <Navbar city={city} setCity={setCity} />
        <Weather city={city} />
      <Footer />
    </div>
  );
}

export default App;
