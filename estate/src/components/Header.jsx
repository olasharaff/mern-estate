
import { Link, useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa'
// make the sign in to dynamic that when user is authenticated the sign-in changes to profile vice versa
// import useSelector from react-redux
import {useSelector} from 'react-redux'

export default function Header() {
  // get the cuurentUser from the useSelector
  const {currentUser} = useSelector((state) => state.user)
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
        <ul className="flex gap-4 items-center">
          <li className="hidden sm:inline hover:underline cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:underline cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );}
