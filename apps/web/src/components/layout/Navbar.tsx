import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/useAuth";


export default function Navbar() {

  const navigate = useNavigate();

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();


  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">

      <h1 className="text-xl font-bold">
        SkillSwap
      </h1>


      {
        isAuthenticated && (
          <div className="flex items-center gap-4">

            <span>
              {user?.fullName ?? "User"}
            </span>


            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
            <Link to="/profile">
  Profile
</Link>

          </div>
        )
      }


    </nav>
  );
}