import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = (path: string) =>
    `h-12 sm:h-14 lg:h-16 flex items-center px-3 sm:px-4 lg:px-5 
     font-medium text-sm sm:text-base lg:text-lg transition-colors
     ${location.pathname === path ? "bg-sky-700" : "hover:bg-sky-700"}
     focus:outline-none focus:ring-2 focus:ring-white`;

  return (
    <nav className="bg-sky-600 text-white shadow-md w-full">
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          {/* Logo + Home */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <img
              src="/logo.png"
              alt="Logo applicazione FishSpot"
              className="h-8 sm:h-10 lg:h-12 w-auto cursor-pointer"
              onClick={() => navigate("/home")}
            />
            <button onClick={() => navigate("/home")} className={linkClass("/home")}>
              Home
            </button>
          </div>

          {/* Pulsanti destra */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button onClick={() => navigate("/settings")} className={linkClass("/settings")}>
              Impostazioni
            </button>
            <button onClick={handleLogout} className={linkClass("/login")}>
              Esci
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
