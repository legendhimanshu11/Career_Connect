import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DashboardHeader = ({ jobCount, applicationCount, viewCount, loading }) => {
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow py-4 px-5 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Logo and Company Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
        <img
          src={assets.logo}
          alt="CareerConnect Logo"
          onClick={() => navigate("/")}
          className="w-36 cursor-pointer"
        />

        {companyData && (
          <div className="flex items-center gap-3">
            <img
              src={companyData.image}
              alt="Company Avatar"
              className="w-10 h-10 rounded-full border object-cover"
            />
            <p className="text-gray-700 font-medium">Welcome, {companyData.name}</p>
          </div>
        )}
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center w-full md:w-auto">
        {loading ? (
          <div className="col-span-3 text-gray-500">Loading stats...</div>
        ) : (
          <>
            <div className="bg-gray-100 px-4 py-2 rounded">
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-xl font-bold">{jobCount}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded">
              <p className="text-sm text-gray-500">Applications</p>
              <p className="text-xl font-bold">{applicationCount}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded">
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-xl font-bold">{viewCount}</p>
            </div>
          </>
        )}
      </div>

      {/* Admin Navigation + Logout */}
      <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center md:self-center">
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/add-job')}
            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700"
          >
            Add Job
          </button>
          <button
            onClick={() => navigate('/admin/manage-jobs')}
            className="bg-green-600 text-white text-sm px-4 py-1.5 rounded hover:bg-green-700"
          >
            Manage Jobs
          </button>
          <button
            onClick={() => navigate('/admin/view-applications')}
            className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded hover:bg-indigo-700"
          >
            View Applications
          </button>
        </div>

        <button
          className="text-sm text-red-500 hover:underline mt-2 sm:mt-0"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;