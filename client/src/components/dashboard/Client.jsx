import { useEffect, useState } from "react";
import ClientDashboardHeader from "./header";
import { fetchGigs, createGig, editGig, deleteGig } from "../../api";

export default function ClientDashboard() {
  const [gigs, setGigs] = useState([]);
  const [username, setUsername] = useState("User");
  const [city, setCity] = useState("Your City");

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [editingGig, setEditingGig] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDeliveryTime, setEditDeliveryTime] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");

  const token = localStorage.getItem("token");

  const loadGigs = async () => {
    const data = await fetchGigs(token);
    setGigs(data);
  };

  useEffect(() => {
    loadGigs();
    fetch("http://localhost:5000/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
        setCity(data.city);
      });
  }, []);

  const handleCreateGig = async (e) => {
    e.preventDefault();
    const data = await createGig(token, {
      title,
      description,
      price,
      delivery_time: deliveryTime,
    });
    if (data.id) {
      setTitle("");
      setDescription("");
      setPrice("");
      setDeliveryTime("");
      setShowModal(false);
      loadGigs();
    }
  };

  const handleEditSave = async (gigId) => {
    const data = await editGig(token, gigId, {
      title: editTitle,
      description: editDescription,
      price: editPrice,
      delivery_time: editDeliveryTime,
    });
    if (data.id) {
      setEditingGig(null);
      loadGigs();
    }
  };

  const handleDelete = async (gigId) => {
    if (!window.confirm("Are you sure you want to delete this gig?")) return;
    await deleteGig(token, gigId);
    loadGigs();
  };

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesTime = true;
    if (timeFilter !== "All") {
      const now = new Date();
      const createdAt = new Date(gig.created_at);
      const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

      if (timeFilter === "1 Day") matchesTime = diffInDays <= 1;
      else if (timeFilter === "3 Days") matchesTime = diffInDays <= 3;
      else if (timeFilter === "7 Days") matchesTime = diffInDays <= 7;
    }

    return matchesSearch && matchesTime;
  });

  return (
    <div className="max-h-screen font-sans">
      <ClientDashboardHeader onAddGig={() => setShowModal(true)} />

      <section className="pt-40 pb-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Welcome back, {username}
        </h1>
        <p className="text-gray-700 mb-6">{`Building opportunities in ${city}`}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition"
          >
            Create New Gig
          </button>
          <input
            type="text"
            placeholder="Search gigs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-gray transition"
          />
        </div>
      </section>

      <div className="rounded-lg border border-gray-500 bg-gray-50 p-6 flex flex-col gap-6">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["All", "1 Day", "3 Days", "7 Days"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeFilter === t
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:shadow-sm"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {gigs.length === 0 ? (
            <div className="text-center col-span-full py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No gigs found
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first gig to get started
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition shadow"
              >
                Create Your First Gig
              </button>
            </div>
          ) : filteredGigs.length === 0 ? (
            <div className="text-center col-span-full py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No gigs match your search or filter
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            filteredGigs.map((gig) => (
              <div
                key={gig.id}
                className="w-full bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-3 border border-gray-100"
              >
                {editingGig === gig.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                      className="mb-2 px-3 py-2 border rounded"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description"
                      className="mb-2 px-3 py-2 border rounded"
                    />
                    <input
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="Price"
                      className="mb-2 px-3 py-2 border rounded"
                    />
                    <input
                      value={editDeliveryTime}
                      onChange={(e) => setEditDeliveryTime(e.target.value)}
                      placeholder="Delivery Time"
                      className="mb-2 px-3 py-2 border rounded"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditSave(gig.id)}
                        className="flex-1 px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-900 transition text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingGig(null)}
                        className="flex-1 px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {gig.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {new Date(gig.created_at).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-gray-700">{gig.description}</p>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Delivery: {gig.delivery_time || "Flexible"}</span>
                      <span>Price: {gig.price || "Negotiable"}</span>
                    </div>

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => {
                          setEditingGig(gig.id);
                          setEditTitle(gig.title);
                          setEditDescription(gig.description);
                          setEditPrice(gig.price);
                          setEditDeliveryTime(gig.delivery_time);
                        }}
                        className="flex-1 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-black transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(gig.id)}
                        className="flex-1 px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Gig Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Gig</h2>
            <form className="flex flex-col gap-3" onSubmit={handleCreateGig}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-3 py-2 border rounded"
                rows={3}
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Delivery Time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 bg-black text-white rounded hover:bg-gray-900"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
