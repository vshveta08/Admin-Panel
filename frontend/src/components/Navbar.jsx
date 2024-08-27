import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let decodedToken = "";
  let username = "";
  let role = "";

  if (token) {
    decodedToken = jwtDecode(token);
    username = decodedToken.name;
    role = decodedToken.role;
  }

  const logoutHandler = async () => {
    localStorage.removeItem("token");

    toast.success("Successfully logged out");
    setTimeout(() => {
      navigate("/"); // redirect to home page i.e. login page
    }, 700);
  };

  return (
    <div className="flex gap-10 h-[3.3em] w-full items-center justify-center p-4 bg-cyan-900 text-slate-200">
      <Toaster />

      <div className="flex items-center gap-2">
        <FaUserCircle className="text-2xl" />

        {/* <p className="w-[6em] break-words text-center text-lg">{username}</p> */}

        <NavLink
          className="text-xl hover:underline hover:underline-offset-8"
          to={
            role === "User"
              ? "/User_HomePage"
              : role === "Admin"
              ? "/Admin_HomePage"
              : role === "Manager"
              ? "/Manager_HomePage"
              : role === "Super_Admin"
              ? "/Super_Admin_HomePage"
              : ""
          }
        >
          {username}
        </NavLink>
      </div>
      {/* <div className="flex flex-col gap-4 mt-2 text-xl"> */}
      <button
        onClick={logoutHandler}
        className="hover:underline hover:underline-offset-8 p-2 rounded-sm text-xl"
      >
        Logout
      </button>
      {/* </div> */}
    </div>
  );
};
