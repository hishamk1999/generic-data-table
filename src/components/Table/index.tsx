import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

// Define a column type to map the property keys to a label
type Column<T> = {
  header: string; // Column header
  accessor: keyof T; // Key of the object property to display in this column
};

// Define props for the Table component
type Props<T> = {
  data: T[];
  columns: Column<T>[]; // Array of columns defining what properties to display
  row_count?: number;
};

function Table<T extends object>({ data, columns, row_count = 10 }: Props<T>) {
  const [rowCount, setRowCount] = useState(row_count || 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(data.length / rowCount));
  const [checkAll, setCheckAll] = useState(false);

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <div className={styles.header}>
        {Array.from({ length: numberOfPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <table className={styles.table}>
        {/* Table header */}
        <thead>
          <tr>
            <th>
              <label htmlFor="checkAll" title="Check all rows">
                <input
                  type="checkbox"
                  name=""
                  id="checkAll"
                  onChange={() => setCheckAll(!checkAll)}
                />
              </label>
            </th>
            {columns.map((column) => (
              <th key={String(column.accessor)}>{column.header}</th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {data
            .slice(rowCount * currentPage - rowCount, rowCount * currentPage)
            .map((data, dataIndex) => (
              <RenderRow
                columns={columns}
                key={dataIndex}
                dataIndex={dataIndex}
                data={data}
                checkAll={checkAll}
              />
            ))}
        </tbody>
        {/* Table footer */}
        <tfoot></tfoot>
      </table>
    </div>
  );
}

type RenderRowProps<T> = {
  columns: Column<T>[];
  dataIndex: number;
  checkAll?: boolean;
  data: T;
};

function RenderRow<T>({ columns, dataIndex, checkAll = false, data }: RenderRowProps<T>) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked === true && checkAll === true) return;
    if ((checked === false && checkAll === true) || (checkAll === false && checked === true)) {
      console.log('here');
      setChecked(checkAll);
    }
  }, [checkAll]);

  return (
    <tr>
      <td>
        <label htmlFor={'check' + dataIndex} title="Check all rows">
          <input
            type="checkbox"
            name=""
            id={'check' + dataIndex}
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </label>
      </td>
      {columns.map((column) => (
        <td key={String(column.accessor)}>{renderCell(data[column.accessor])}</td>
      ))}
    </tr>
  );
}

// Utility function to safely render table cell values
function renderCell(value: any): React.ReactNode {
  // Check if the value is a valid type that can be rendered by React
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value; // These types are directly renderable in JSX
  }
  return JSON.stringify(value); // Fallback: Convert objects to string (for safety)
}

export default Table;
