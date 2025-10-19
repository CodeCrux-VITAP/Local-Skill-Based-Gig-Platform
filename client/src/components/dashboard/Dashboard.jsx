export default function Dashboard() {
  const role = localStorage.getItem("role");
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to Dashboard</h2>
      {role === "client" ? (
        <p>You can create and manage gigs here.</p>
      ) : (
        <p>You can view gigs available in your city.</p>
      )}
    </div>
  );
}
