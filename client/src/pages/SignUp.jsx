import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {

const [formData, setFormData] = useState({});
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
     [e.target.id]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/auth/signup', formData);
    // do something with the response data
    console.log(res)
  } catch (error) {
    console.error('Error signing up:', error);
    // you can also display an error message to the user here
  }
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-white">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-200">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
