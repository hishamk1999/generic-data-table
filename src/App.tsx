import './App.sass';
import Table from './components/Table';
import MOCK_USERS from './assets/MOCK_USERS_DATA.json';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
};

function App() {
  // Define the columns with appropriate accessors
  const columns: { header: string; accessor: keyof User }[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'First Name', accessor: 'first_name' },
    { header: 'Last Name', accessor: 'last_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'IP Address', accessor: 'ip_address' },
  ];

  return (
    <>
      <section
        style={{
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}>
        <Table<User> data={MOCK_USERS} columns={columns} />
      </section>
    </>
  );
}

export default App;
