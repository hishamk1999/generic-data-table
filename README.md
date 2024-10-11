# Dynamic Generic Data Table in React with TypeScript

This project is a **Dynamic Generic Data Table** built using **React** and **TypeScript**, which allows rendering tables with any data structure in a fully type-safe manner. The table is designed to be highly flexible, reusable, and customizable, making it suitable for various types of data (e.g., users, products, orders, etc.).

## Key Features

1. **Generic Table Component**:
   - The table is completely generic and can work with any type of data, thanks to TypeScript's generics.
   - The table accepts a data array and column definitions, allowing for flexible rendering based on dynamic object structures.
   
2. **Column Definitions**:
   - The column definitions include a `header` (display name) and an `accessor` (key of the object), allowing dynamic mapping between the data and table columns.
   - Each column definition is strongly typed using `keyof T` to ensure type-safe access to object properties.

3. **Dynamic Row Rendering**:
   - A `RenderRow` component dynamically renders each row of the table. It ensures type safety while accessing object properties, allowing for flexible row layouts.
   - Rows are efficiently rendered using `.slice()` to support pagination or lazy-loading mechanisms.

4. **Type Safety and Autocompletion**:
   - The project leverages TypeScript's powerful type inference capabilities to provide full autocompletion and type safety when defining data, columns, and rendering rows.
   - The generic table ensures that only valid keys of the data structure are used, preventing runtime errors and ensuring correctness at compile time.

5. **Custom Checkbox for Row Selection**:
   - Each row includes a custom checkbox, which can be used for row selection. The `checkAll` prop allows controlling the checkbox state globally, useful for "select all" functionality.

6. **Reusable Across Projects**:
   - The table component is highly reusable and can be dropped into any project where dynamic tables are needed, simply by defining the data structure and columns.
   - This allows for rendering a variety of data types (e.g., users, products, orders) without the need for duplicate code.

## How to Use

1. Define your data structure (e.g., `User`, `Product`).
2. Create column definitions mapping the headers to the object's keys.
3. Pass the data and columns to the table component.
4. Optionally, implement pagination or sorting logic using the `slice()` method or other pagination techniques.

### Example Use Case:

```tsx
import React from 'react';
import Table from './components/Table';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

const userData: User[] = [
  { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male' },
  // More user data...
];

const userColumns = [
  { header: 'ID', accessor: 'id' },
  { header: 'First Name', accessor: 'first_name' },
  { header: 'Last Name', accessor: 'last_name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Gender', accessor: 'gender' },
];

function App() {
  return <Table<User> data={userData} columns={userColumns} rowCount={5} currentPage={1} />;
}

export default App;
