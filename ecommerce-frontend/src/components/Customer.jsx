import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customer data
  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setCustomers(response.data);
        setFiltered(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
        setError("Failed to fetch customers.");
        setLoading(false);
      });
  }, []);

  // Filter when searchTerm changes
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filteredData = customers.filter(customer =>
      customer.first_name.toLowerCase().includes(term) ||
      customer.last_name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
  }, [searchTerm, customers]);

  if (loading) return <p className="mt-5 text-center">Loading customers...</p>;
  if (error) return <p className="text-danger mt-5 text-center">{error}</p>;

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">Customer List</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customer Cards */}
      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((customer) => (
            <div className="col-md-4 mb-4" key={customer.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{customer.first_name} {customer.last_name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {customer.email}<br />
                    <strong>Gender:</strong> {customer.gender}<br />
                    <strong>Age:</strong> {customer.age}<br />
                    <strong>Country:</strong> {customer.country}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No customers match your search.</p>
        )}
      </div>
    </div>
  );
}
