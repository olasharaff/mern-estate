import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-center my-8 text-3xl">Sign Up</h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="username"
          placeholder="Username"
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          placeholder="Email"
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-[#2B2A4C] text-white p-3 rounded-md hover:shadow-md hover:opacity-90 disabled:opacity-30"
        >
          SIGN UP
        </button>
      </form>
      <div className="flex gap-1 text-sm">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 hover:underline"> Sign In</span>
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
