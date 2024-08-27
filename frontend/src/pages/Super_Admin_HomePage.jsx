import axios from "axios";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { ENDPOINT } from "../config/endpoint";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

// import DeleteUserModal from "../components/modal/DeleteUserModal";
// import UpdateUserModal from "../components/modal/UpdateUserModal";
// import { BsThreeDots } from "react-icons/bs";

export default function Super_Admin_HomePage() {
  const [users, setUsers] = useState([]);
  // const[openUpdateModal, setOpenUpdateModal] = useState(false);
  // const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    const res = await axios.get(`${ENDPOINT}/users`);
    // console.log("users: ", res.data);
    const data = res.data.users;
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("users: ", users);

  // const updateHandler = async () => {
  // const res = await axios.put(`${ENDPOINT}/user/${id}`, {
  //   name,email,password,role
  // });
  // console.log("data: ", res.data);
  // console.log("user: ", res.data.user);
  // if(res.data.success){
  //   toast.success(res.data.msg);
  // }
  // else{
  //   toast.error(res.data.msg);
  // }
  // };

  const deleteHandler = async (id) => {
    console.log("dleet");
    const res = await axios.delete(`${ENDPOINT}/user/${id}`);
    if (res.data.success) {
      toast.success(res.data.msg);
      fetchUsers();
    } else {
      toast.error(res.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />
      <Toaster />

      <div className="flex flex-col w-full gap-4 px-[7em] py-[3em]">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-cyan-800">Users</p>
          <NavLink
            to="/createUser"
            className="bg-cyan-600 p-2 text-white rounded-sm hover:bg-cyan-700"
          >
            Create User <FaPlus className="inline-block" />
          </NavLink>
        </div>

        <div className="flex items-center justify-center w-full relative shadow-md rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-300 rounded-sm">
            <thead className="text-xs text-white uppercase bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr. No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-slate-700 even:bg-cyan-800 border-b border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <NavLink
                      to={`/updateUser/${user._id}`}
                      state={{
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                      }}
                      className="font-medium text-blue-600 bg-slate-200 p-1 px-3 hover:bg-white rounded-sm"
                    >
                      Update
                    </NavLink>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="flex items-center text-red-600 font-medium bg-slate-200 p-1 hover:bg-white rounded-sm"
                    >
                      Delete <MdDelete className="text-xl inline " />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* {openUpdateModal && <UpdateUserModal />} */}
      </div>
    </div>
  );
}
