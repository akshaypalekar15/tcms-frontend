import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ExistingCustomer from './Pages/ExistingCustomer';
import NewCustomer from './Pages/NewCustomer';

function App() {
  return (
    <div>
      <h1>Telecom Customer Management System</h1>
      <Router>
        <Routes>
          <Route path="/existing" element={<ExistingCustomer />} />
          <Route path="/new" element={<NewCustomer />} />
        </Routes>
        <div style={{ textAlign: 'center', margin: '16px' }}>
          <Link to="/existing"><button>Existing customers</button></Link>
          <Link to="/new"><button>New customer</button></Link>
        </div>
      </Router>
    </div>
  );
}

export default App;
