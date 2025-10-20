const API_URL = "http://localhost:5000";

export async function signup(data) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchGigs(token) {
  const res = await fetch(`${API_URL}/gigs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createGig(token, gigData) {
  const res = await fetch(`${API_URL}/gigs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gigData),
  });
  return res.json();
}

export async function editGig(token, gigId, gigData) {
  const res = await fetch(`${API_URL}/gigs/${gigId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gigData),
  });
  return res.json();
}
export async function deleteGig(token, gigId) {
  const res = await fetch(`${API_URL}/gigs/${gigId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
