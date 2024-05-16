import React, { useState, useEffect } from "react";
import axios from "axios";
import AllCustomers from "./AllCustomers";
import "./page.css";

function NewCustomer() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    adharNumber: "",
    registrationDate: "",
    mobileNumber: "",
    planName: "",
    planCost: "",
    validity: "",
    planStatus: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers/new",
        formData
      );
      console.log("New customer registered:", response.data);
      setError(null);
      setSuccess(true);
    } catch (error) {
      console.error("Error registering new customer:", error);
      setError(error);
      setSuccess(false);
    }
  };

  return (
    <>
      <div className="newcustomer-wrapper">
        <h2 className="title">New Customer Registration</h2>
        {error && (
          <p style={{ color: "red" }}>Error while submitting the data</p>
        )}
        {success && (
          <p style={{ color: "green" }}>New customer registered successfully</p>
        )}
        <div>
          <form className="form-container" onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Adhar Number:</label>
              <input
                type="number"
                name="adharNumber"
                value={formData.adharNumber}
                onChange={(e) => {
                  if (e.target.value.length < 13) {
                    handleChange(e);
                  }
                }}
                required
              />
            </div>
            <div>
              <label>Registration Date:</label>
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => {
                  if (e.target.value.length < 11) {
                    handleChange(e);
                  }
                }}
                required
              />
            </div>
            <div>
              <label>Plan Name:</label>
              <select
                name="planName"
                value={formData.planName}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Platinum365">Platinum365</option>
                <option value="Gold180">Gold180</option>
                <option value="Silver90">Silver90</option>
              </select>
            </div>
            <div>
              <label>Plan Cost:</label>
              <select
                name="planCost"
                value={formData.planCost}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="499">499</option>
                <option value="299">299</option>
                <option value="199">199</option>
              </select>
            </div>
            <div>
              <label>Validity:</label>
              <input
                type="number"
                name="validity"
                value={formData.validity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Plan Status:</label>
              <select
                name="planStatus"
                value={formData.planStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <AllCustomers customers={customers} />
    </>
  );
}

export default NewCustomer;
