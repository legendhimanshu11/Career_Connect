import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="shadow backdrop-blur-md bg-white/70 sticky top-0 z-50">
      <div className="container mx-auto px-4 xl:px-20 py-2 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src={assets.logo} alt="logo" className="h-10 w-auto drop-shadow-md rounded-md" />
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
            Career<span className="text-green-500">Connect</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium text-base">
          <Link to="/" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1">Home</Link>
          <Link to="/services" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1">Services</Link>
          <Link to="/about" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1">About</Link>
          <Link to="/contact" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 text-sm">
          {
            user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-gray-700">Hi, {user.firstName}</span>
                <UserButton />
              </div>
            ) : (
              <div className="flex gap-2 items-center">

                {/* 🟢 Sign Up */}
                <Link to="/register" className="bg-green-500 text-white px-4 py-1.5 rounded-full hover:bg-green-600 transition">
                  Sign Up
                </Link>

                {/* 🔵 Login (Custom page using Clerk) */}
                <Link to="/login" className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition">
                  Login
                </Link>

                {/* | Divider */}
                <span className="text-gray-400 text-xl font-light">|</span>

                {/* ⚪ Recruiter Login (JWT) */}
                <button onClick={()=> setShowRecruiterLogin(true)} 
                className="text-gray-700 hover:border-b-2 hover:border-x-gray-600 transition duration-150 ease-in-out" >
                  Recruiter Login
                  </button>

              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
