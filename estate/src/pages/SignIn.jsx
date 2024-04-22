import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import dispatch from "react-redux"; to handle dispatch functions
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
 const {isLoading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.warn(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // replace it for loading to be true
      dispatch(signInStart())

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      console.log(data);
     dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-center my-8 text-3xl">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-[#2B2A4C] text-white p-3 rounded-md hover:shadow-md hover:opacity-90 disabled:opacity-30"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-1 text-sm">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 hover:underline"> Sign Up</span>
        </Link>
      </div>

      <button
        type="button"
        className="bg-[#b31212d6] w-full text-center mt-2 p-3 rounded-md hover:shadow-lg text-white"
      >
        Continue with Google
      </button>
    </div>
  );
}
