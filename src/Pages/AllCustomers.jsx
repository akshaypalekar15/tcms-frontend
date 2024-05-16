import React, { useState, useEffect } from "react";
import axios from "axios";

function AllCustomers({ customers }) {
  // const [customers, setCustomers] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/customers");
  //       setCustomers(response.data);
  //       setError(null);
  //     } catch (error) {
  //       console.error("Error fetching customers:", error);
  //       setError(error);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  return (
    <div className="allcustomers-wrapper">
      <h2 className="title">All customers</h2>
      <ul>
        {customers.map((customer) => (
          <li className="customers" key={customer.id}>
            {customer.name} - {customer.plan.planName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCustomers;
