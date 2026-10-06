import type { Customer } from "../types/customer";

interface CustomerListProps {
  customers: Customer[];
  onDelete: (id: number) => void;
  onEdit: (customer: Customer) => void;
}

function CustomerList({ customers, onDelete, onEdit }: CustomerListProps) {
  return (
    <ul>
      {customers.map((customer) => (
        <li key={customer.id}>
          {customer.name} - {customer.email}

           <button onClick={() => onEdit(customer)}>
             Edit
           </button>

          <button onClick={() => onDelete(customer.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CustomerList;