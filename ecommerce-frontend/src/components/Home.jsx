import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    setUserDetails(null);

    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}/with-orders`);
      setUserDetails(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("User not found.");
      } else {
        setError("Error fetching user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-5 mt-5">
      {/* Intro Section */}
      <div className="mb-4">
        <h2 className="mb-2">Welcome to the Customer Dashboard</h2>
        <p className="text-muted">
          Use the search below to find customer details along with their total number of orders.
        </p>
      </div>

      {/* Search Form */}
      <div className="input-group mb-4">
        <input
          type="number"
          placeholder="Enter User ID"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchUser}>
          Search
        </button>
      </div>

      {/* Result */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {userDetails && (
        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title">{userDetails.first_name} {userDetails.last_name}</h5>
            <p className="card-text">
              <strong>Email:</strong> {userDetails.email} <br />
              <strong>Gender:</strong> {userDetails.gender} <br />
              <strong>Age:</strong> {userDetails.age} <br />
              <strong>Country:</strong> {userDetails.country} <br />
              <strong>Total Orders:</strong> {userDetails.order_count}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
