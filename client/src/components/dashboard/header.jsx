import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientDashboardHeader({ onAddGig }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        padding: isMobile ? "0.5rem 1rem" : "0.8rem 1.5rem",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: "0 0 12px 12px",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <h2
        style={{
          fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: isMobile ? "1.2rem" : "1.5rem",
          margin: 0,
          color: "#111",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
        onClick={() => navigate("/client-dashboard")}
        onMouseEnter={(e) => (e.target.style.color = "#000")}
        onMouseLeave={(e) => (e.target.style.color = "#111")}
      >
        TaskMasters
      </h2>

      {/* Right Section */}
      {isMobile ? (
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.5rem",
              padding: "0.3rem 0.6rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            ☰
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "2.5rem",
                right: 0,
                width: "180px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={() => {
                  onAddGig();
                  setMenuOpen(false);
                }}
                style={{
                  padding: "0.8rem 1rem",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f4f4f4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Add Gig
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                style={{
                  padding: "0.8rem 1rem",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f4f4f4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: "0.8rem 1rem",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  color: "red",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fef2f2")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={onAddGig}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#111",
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#111";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "translateY(1px)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Add Gig
          </button>

          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(0,0,0,0.5)",
                borderRadius: "30px",
                padding: "0.4rem 0.8rem",
                background: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                transition: "all 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src="https://ui-avatars.com/api/?name=U"
                alt="User"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <span
                style={{ fontSize: "14px", fontWeight: 500, color: "#222" }}
              >
                Profile
              </span>
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "3.2rem",
                  right: 0,
                  width: "180px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 100,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.8rem 1rem",
                    fontSize: "14px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f4f4f4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.8rem 1rem",
                    fontSize: "14px",
                    color: "red",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fef2f2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
