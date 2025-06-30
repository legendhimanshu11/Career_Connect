import { SignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("clerk-db-jwt");
    if (token) navigate("/");
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side with Gradient Background and Branding */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white"
        style={{
          background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)"
        }}
      >
       <h1 className="text-5xl font-extrabold mb-4 transition-transform duration-300 hover:scale-105">
         <span className="text-blue-500 hover:text-blue-600 transition-colors duration-300">Career</span>
         <span className="text-green-400 hover:text-green-500 transition-colors duration-300">Connect</span>
       </h1>
        <p className="text-center text-md max-w-sm text-white/90">
          Welcome back to your career journey. Sign in and discover exciting job opportunities tailored for you.
        </p>
      </div>

      {/* Right Side with Clerk Login */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to CareerConnect</h2>
          <SignIn
            afterSignInUrl="/"
            appearance={{
              elements: {
                footerAction: "hidden", // 👈 hides just the "Don't have an account? Sign up" from Clerk
              },
            }}
          />

          {/* ✅ Your custom Sign Up link (visible as desired) */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;