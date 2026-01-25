import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const AdminLayout = () => {
  const token = useSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="admin-layout">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
