import { Outlet } from "react-router-dom";
import { UserDataProvider } from "../context/userData.jsx";

function UserLayout() {
  return (
    <UserDataProvider>
      <Outlet />
    </UserDataProvider>
  );
}

export default UserLayout;