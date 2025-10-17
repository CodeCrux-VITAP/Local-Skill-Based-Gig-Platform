import { useState } from "react";
import Navbar from "./components/navbar";
import MainPage from "./components/mainPage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <MainPage />
    </>
  );
}

export default App;
