import React, { useState, useEffect } from 'react';

export default function PersonListFetch() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then(res => {
        if (!res.ok) throw new Error("Fetch error: " + res.status);
        return res.json();
      })
      .then(data => setPersons(data.results))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading (fetch)...</div>;
  if (error) return <div>Error (fetch): {error}</div>;

  return (
    <div>
      <h2>People fetched using Fetch API</h2>
      <ul>
        {persons.map((p, i) => (
          <li key={i}>{p.name.first} {p.name.last} — {p.email}</li>
        ))}
      </ul>
    </div>
  );
}
