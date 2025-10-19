import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 1.5rem",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: "0 0 12px 12px",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: "1.5rem",
          margin: 0,
          color: "#222",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        TaskMasters
      </h2>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            fontSize: "16px",
            fontWeight: 500,
            width: "6rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid transparent",
            cursor: "pointer",
            marginLeft: "0.5rem",
            backgroundColor: "#111",
            color: "#fff",
            transition: "all 0.15s ease",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(1px)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
        >
          Log in
        </button>

        <button
          onClick={() => navigate("/signup")}
          style={{
            fontSize: "16px",
            fontWeight: 500,
            width: "6rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #111",
            cursor: "pointer",
            marginLeft: "0.5rem",
            backgroundColor: "transparent",
            color: "#111",
            transition: "all 0.15s ease",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(2px)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
