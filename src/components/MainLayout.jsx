import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;