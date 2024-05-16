import React, { useState, useEffect } from "react";
import axios from "axios";

const Customer = ({ customer, fetchCustomers }) => {
  const [renewalData, setRenewalData] = useState({
    renewalDate: "",
    planStatus: "",
  });
  const [upgradeDowngradeData, setUpgradeDowngradeData] = useState({
    existingPlanName: customer.plan.planName,
    newPlanName: "",
    planCost: "",
    validity: "",
    planStatus: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleRenewPlan = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/customers/renew/${customer.id}`,
        renewalData
      );
      fetchCustomers();
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.error("Error renewing plan:", error);
      setSuccess(false);
      setError(true);
    }
  };

  const handleUpgradeDowngradePlan = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/customers/upgradeDowngrade/${customer.id}`,
        upgradeDowngradeData
      );
      setSuccess(true);
      setError(false);
      fetchCustomers();
    } catch (error) {
      console.error("Error upgrading/downgrading plan:", error);
      setSuccess(false);
      setError(true);
    }
  };

  const handleRenewalInputChange = (e) => {
    const { name, value } = e.target;
    setRenewalData({ ...renewalData, [name]: value });
  };

  const handleUpgradeDowngradeInputChange = (e) => {
    const { name, value } = e.target;
    setUpgradeDowngradeData({ ...upgradeDowngradeData, [name]: value });
  };

  return (
    <li>
      {success && (
        <p style={{ color: "green" }}>This customer is updated successfully</p>
      )}
      {error && <p style={{ color: "red" }}>Failed to update this customer</p>}
      <div>
        Name: {customer.name}, Plan: {customer.plan.planName}, Plan Status:{" "}
        {customer.plan.planStatus}
      </div>
      <div>
        <label>Renewal Date:</label>
        <input
          type="date"
          name="renewalDate"
          value={renewalData.renewalDate}
          onChange={handleRenewalInputChange}
        />
        <label>Plan Status:</label>
        <select
          name="planStatus"
          value={renewalData.planStatus}
          onChange={handleRenewalInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleRenewPlan}>Renew Plan</button>
      </div>
      <div>
        <label>Existing Plan Name:</label>
        <input
          type="text"
          name="existingPlanName"
          value={upgradeDowngradeData.existingPlanName}
          readOnly
        />
        <label>New Plan Name:</label>
        <input
          type="text"
          name="newPlanName"
          value={upgradeDowngradeData.newPlanName}
          onChange={handleUpgradeDowngradeInputChange}
        />
        <label>Plan Cost:</label>
        <input
          type="number"
          name="planCost"
          value={upgradeDowngradeData.planCost}
          onChange={handleUpgradeDowngradeInputChange}
        />
        <label>Validity:</label>
        <input
          type="number"
          name="validity"
          value={upgradeDowngradeData.validity}
          onChange={handleUpgradeDowngradeInputChange}
        />
        <label>Plan Status:</label>
        <select
          name="planStatus"
          value={upgradeDowngradeData.planStatus}
          onChange={handleUpgradeDowngradeInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleUpgradeDowngradePlan}>
          Upgrade/Downgrade Plan
        </button>
      </div>
    </li>
  );
};

function ExistingCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div className="existing-wrapper">
      <h2>Existing Customers</h2>
      <ul>
        {customers.map((customer) => (
          <Customer
            key={customer.id}
            customer={customer}
            fetchCustomers={fetchCustomers}
          />
        ))}
      </ul>
    </div>
  );
}

export default ExistingCustomers;
