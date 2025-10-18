import React from "react";

function Navbar() {
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
        }}
      >
        TaskMasters
      </h2>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            fontSize: "16px",
            fontWeight: 500,
            width: "6rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid transparent",
            cursor: "pointer",
            marginLeft: "0.5rem",
            backgroundColor: "#ccc",
            color: "#222",
          }}
        >
          Log in
        </button>

        <button
          style={{
            fontSize: "16px",
            fontWeight: 500,
            width: "6rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #222",
            cursor: "pointer",
            marginLeft: "0.5rem",
            backgroundColor: "transparent",
            color: "#222",
          }}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
