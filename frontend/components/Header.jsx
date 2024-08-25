import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="h-4 w-full bg-slate-600 text-slate-200">
      {/* <div className="flex items-center gap-6 text-xl"> */}
        <NavLink
          to="/login"
          className="hover:bg-slate-200 hover:text-black p-2 bg-slate-500 rounded-sm"
        >
          Login
        </NavLink>
       
      {/* </div> */}
    </div>
  );
};
