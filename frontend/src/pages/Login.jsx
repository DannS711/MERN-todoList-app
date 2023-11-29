import { useState } from "react";
import axios from "axios";
import { baseServerAPI } from "../utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.type]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: `${baseServerAPI}/user/login`,
        data: form,
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
      // const errMsg = error.response.data.message
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-lg font-semibold">Login Form</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block py-1">Email</label>
                <input
                  type="email"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block py-1">Password</label>
                <input
                  type="password"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-3 pt-3 items-center">
                <button className="border px-4 py-2 rounded-lg shadow active:bg-gray-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
