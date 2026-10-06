import { useEffect, useState } from "react";
import CustomerList from "./components/CustomerList";
import type { Customer } from "./types/customer";

function App() {
  const [searchTxt, setSearchText] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
  fetch("http://127.0.0.1:8000/customers")
    .then((response) => response.json())
    .then((data) => setCustomers(data));
}, []);

 
 /* const customers: Customer[] = [
    { name: "John Smith", email: "john@example.com" },
    { name: "Mary Jones", email: "mary@example.com" },
    { name: "David Brown", email: "david@example.com" },
    { name: "Rao Kancharla", email: "rao@example.com" },
  ];*/

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [editingCustomer, setEditingCustomer] =
  useState<Customer | null>(null);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTxt.toLowerCase())
  );

  function handleEditCustomer(customer: Customer) {
   setEditingCustomer(customer);
   setEditName(customer.name);
   setEditEmail(customer.email);
   setError("");
 }

 async function handleSaveEdit() {
  if (!editingCustomer) {
    return;
  }

  if (editName.trim() === "") {
    setError("Customer name is required.");
    return;
  }

  if (editEmail.trim() === "") {
    setError("Customer email is required.");
    return;
  }

  if (!editEmail.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/customers/${editingCustomer.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName.trim(),
          email: editEmail.trim(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update customer");
    }

    const updatedCustomer = await response.json();

    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
      )
    );

    setEditingCustomer(null);
    setEditName("");
    setEditEmail("");
    setError("");
  } catch (error) {
    console.error(error);
    setError("Could not update customer.");
  }
}

function handleCancelEdit() {
  setEditingCustomer(null);
  setEditName("");
  setEditEmail("");
  setError("");
}

  async function handleDeleteCustomer(id: number) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/customers/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }

    setCustomers(
      customers.filter((customer) => customer.id !== id)
    );
  } catch (error) {
    console.error(error);
    setError("Could not delete customer.");
  }
}
   
async function handleAddCustomer() {
  if (customerName.trim() === "") {
    setError("Customer name is required.");
    return;
  }

  if (customerEmail.trim() === "") {
    setError("Customer email is required.");
    return;
  }

  if (!customerEmail.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customerName.trim(),
        email: customerEmail.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add customer");
    }

    const newCustomer = await response.json();

    setCustomers([...customers, newCustomer]);

    setCustomerName("");
    setCustomerEmail("");
    setError("");
  } catch (error) {
    setError("Could not add customer.");
    console.error(error);
  }
}


  return (
    <div>
      <h1>Customer Management</h1>

      <p>Welcome to our first modern application!</p>

      <h2>Add Customer</h2>

    <div>
      <input
        type="text"
        placeholder="Customer name"
        value={customerName}
        onChange={(event) => setCustomerName(event.target.value)}
      />

      <input
        type="email"
        placeholder="Customer email"
        value={customerEmail}
        onChange={(event) => setCustomerEmail(event.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={handleAddCustomer}>
        Add Customer
      </button>
    </div>

      <input
        type="text"
        placeholder="Search customers..."
        value={searchTxt}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <h2>Customers</h2>

      
      {editingCustomer && (
  <div>
    <h2>Edit Customer</h2>

    <div>
      <label>Name:</label>
      <input
        type="text"
        value={editName}
        onChange={(event) => setEditName(event.target.value)}
      />
    </div>

    <div>
      <label>Email:</label>
      <input
        type="email"
        value={editEmail}
        onChange={(event) => setEditEmail(event.target.value)}
      />
    </div>

    <button onClick={handleSaveEdit}>
      Save Changes
    </button>

    <button onClick={handleCancelEdit}>
      Cancel
    </button>
  </div>
)}
      <CustomerList customers={filteredCustomers} onDelete={handleDeleteCustomer} onEdit={handleEditCustomer}/>
      
    </div>
  );
}

export default App;