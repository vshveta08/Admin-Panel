import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ENDPOINT } from "../config/endpoint";
import { Navbar } from "../components/Navbar";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Please Fill all the fields");
    }

    try {
      const res = await axios.post(ENDPOINT + "/createUser", {
        name,
        email,
        password,
      });

      console.log("res: ", res);
      console.log("res.data: ", res.data);

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
        <h2 className="text-2xl font-semibold text-cyan-800 text-center">
          Create User
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              className="border border-cyan-500 text-slate-600 p-2 w-full rounded-sm outline-cyan-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="border border-cyan-500 text-slate-600 p-2 w-full rounded-sm outline-cyan-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-cyan-600 p-2 text-white rounded-sm hover:bg-cyan-700 w-full mt-3">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
