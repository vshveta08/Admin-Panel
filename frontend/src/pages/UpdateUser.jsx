import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";
import { Navbar } from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const location = useLocation();
  const { id, name, email, password } = location.state;

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedPassword, setUpdatedPassword] = useState(password);
  const [role, setRole] = useState("User");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!updatedName || !updatedEmail || !updatedPassword || !role) {
      return toast.error("Please Fill all the fields");
    }

    try {
      const res = await axios.put(`${ENDPOINT}/user/${id}`, {
        name: updatedName,
        email: updatedEmail,
        password: updatedPassword,
        role,
      });
      console.log("data: ", res.data);
      console.log("user: ", res.data.user);

      if (res.data.success) {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/Super_Admin_HomePage");
        }, 700);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      // console.log("error: ", err.response.data.message);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <div className="flex flex-col justify-center h-full w-full gap-4 px-[7em] py-[3em] mt-[2em]">
        <h2 className="text-2xl px-[9.4em] font-semibold text-cyan-800 text-start">
          Update User
        </h2>
        <div className="flex items-center justify-center w-full h-full mt-4">
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-4 items-center justify-center w-[38rem]"
          >
            <input
              type="text"
              placeholder="username"
              className="border border-cyan-500 text-slate-600 p-2 w-full rounded-sm outline-cyan-600"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              className="border border-cyan-500 text-slate-600 p-2 w-full rounded-sm outline-cyan-600"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="border border-cyan-500 text-slate-600 p-2 w-full rounded-sm outline-cyan-600"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
            <select
              value={role}
              onChange={(e) => (
                console.log(e.target.value), setRole(e.target.value)
              )}
              className="border border-cyan-500 text-slate-600 p-2 w-full rounded-sm outline-cyan-600"
            >
              <option value="" className="text-slate-400">
                select a role
              </option>
              <option defaultValue="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Super_Admin">Super_Admin</option>
            </select>

            <button className="bg-cyan-600 p-2 text-white rounded-sm hover:bg-cyan-700 w-full mt-3">
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
