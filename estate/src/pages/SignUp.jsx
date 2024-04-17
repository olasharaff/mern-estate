import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({...formData, [id]: value})
    console.warn(formData);
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
    try {
       setIsLoading(true);

       const res = await fetch("/api/auth/signup", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       });
       const data = await res.json();
       if (data.success === false) {
         setError(data.message);
         setIsLoading(false);
         return;
       }
       console.log(data);
       setIsLoading(false);
       setError(null);
        navigate("/sign-in");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      
    }
   
  }
  

  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-center my-8 text-3xl">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
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
        <button
          type="submit"
          className="bg-[#2B2A4C] text-white p-3 rounded-md hover:shadow-md hover:opacity-90 disabled:opacity-30"
          disabled={isLoading}
        >
         {isLoading ? 'Loading...' : 'SIGN UP'}
        </button>
      </form>
      <div className="flex gap-1 text-sm">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 hover:underline"> Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        type="button"
        className="bg-[#b31212d6] w-full text-center mt-2 p-3 rounded-md hover:shadow-lg text-white"
      >
        Continue with Google
      </button>
    </div>
  );
}
