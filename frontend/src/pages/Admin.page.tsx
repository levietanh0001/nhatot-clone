import { Link, Outlet } from 'react-router-dom';
import Dashboard from '~/components/features/dashboard/Dashboard';

const AdminPage = () => {
  return (
    <>
      {/* <Link to='dashboard'>Dashboard</Link> */}
      {/* <Outlet /> */}
      <Dashboard />
    </>
  );
};

export default AdminPage;
