
import { Link, useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-[#f0cec3d3] shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1
          className="font-bold text-sm sm:text-xl flex flex-wrap whitespace-nowrap cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-[#B31312]">Ashraf</span>
          <span className="text-[#2B2A4C]">Estate</span>
        </h1>
        <form className="bg-[#eee2de] p-2 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-400" />
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline hover:underline cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:underline cursor-pointer">
            <Link to="/sign-in">Sign in</Link>
          </li>
        </ul>
      </div>
    </header>
  );}
