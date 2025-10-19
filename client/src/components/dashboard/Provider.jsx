import { useEffect, useState } from "react";

export default function ProviderDashboard() {
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

    // Fetch gigs available in your city
    fetch("http://localhost:5000/gigs", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setGigs(data));
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 font-sans max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome back, {username}</h1>
      <p className="text-gray-500 mb-6">Opportunities in {city}</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">Available Gigs in Your City</h2>
        {gigs.length === 0 ? (
          <p className="text-gray-400">No gigs available right now.</p>
        ) : (
          <ul className="space-y-2">
            {gigs.map((gig) => (
              <li key={gig.id} className="border rounded-md p-4 hover:shadow-md transition">
                <strong>{gig.title}</strong> – {gig.description}
                <p className="text-gray-500 text-sm mt-1">By {gig.client_name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
