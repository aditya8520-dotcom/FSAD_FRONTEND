import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("pendingMfa");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Glass Navbar */}
      <div className="flex justify-between items-center px-8 py-4 
      bg-gradient-to-r from-black/70 via-gray-900/70 to-black/70 
      backdrop-blur-lg border-b border-white/10 shadow-lg">

        {/* LEFT (empty for spacing) */}
        <div className="w-1/3"></div>

        {/* CENTER LOGO */}
        <Link to="/" className="group">
          <span className="text-4xl font-bebas tracking-wider uppercase bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-cyan-500 transition-all duration-300">
            FitWell
          </span>
        </Link>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-4 w-1/3 justify-end">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="px-5 py-2 rounded-full 
                bg-white/10 text-white border border-white/20 
                hover:bg-white hover:text-black transition duration-300">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-5 py-2 rounded-full 
                bg-gradient-to-r from-blue-500 to-cyan-500 
                text-white hover:scale-105 transition duration-300 shadow-md">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              {role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="px-5 py-2 rounded-full 
                  bg-purple-500/80 text-white hover:bg-purple-600 transition"
                >
                  Admin Panel
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full 
                bg-red-500/80 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;