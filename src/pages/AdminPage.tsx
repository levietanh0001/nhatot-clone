import { Link, Outlet } from "react-router-dom"
import Dashboard from "~/components/admin/dashboard/Dashboard"

const AdminPage = () => {
  return (
    <>
      {/* <Link to='dashboard'>Dashboard</Link> */}
      {/* <Outlet /> */}
      <Dashboard />
    </>
  )
}

export default AdminPage