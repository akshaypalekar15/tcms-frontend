import React from "react";

function AllCustomers({ customers }) {
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
