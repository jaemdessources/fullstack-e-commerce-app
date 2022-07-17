import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function AdminTab({ children }) {
  const [key, setKey] = useState("products");
  useEffect(() => {
    document.querySelectorAll("button[disabled]").forEach((element) => {
      element.parentElement.style.cursor = "not-allowed";
    });
  });
  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="products" title="Products" selected>
        <h1>Products</h1>
        {children[0]}
      </Tab>
      <Tab eventKey="orders" title="Orders">
        <h1>Orders</h1>
        {children[1]}
      </Tab>
      <Tab eventKey="users" title="Users" className="test" disabled>
        <h1>Users</h1>
        {children[2]}
      </Tab>
    </Tabs>
  );
}

export default AdminTab;
