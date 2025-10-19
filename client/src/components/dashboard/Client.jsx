import { useEffect, useState } from "react";

export default function ClientDashboard() {
  const [username, setUsername] = useState("User");
  const [city, setCity] = useState("Your City");
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setUsername(data.username);
        setCity(data.city);
      });

    // Optionally fetch your posted gigs
    fetch("http://localhost:5000/my-gigs", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setGigs(data));
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 font-sans max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome back, {username}</h1>
      <p className="text-gray-500 mb-6">Your local area: {city}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Active Gigs</h2>
        {gigs.length === 0 ? (
          <p className="text-gray-400">No gigs posted yet.</p>
        ) : (
          <ul className="space-y-2">
            {gigs.map((gig) => (
              <li key={gig.id} className="border rounded-md p-4 hover:shadow-md transition">
                <strong>{gig.title}</strong> – {gig.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Nearby Providers</h2>
        <p className="text-gray-500">See local talent available to hire.</p>
        <button className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
          Browse Providers
        </button>
      </section>
    </div>
  );
}
