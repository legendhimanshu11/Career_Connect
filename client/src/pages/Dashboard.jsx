import { useContext, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  // Logout Function
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem('companyToken');
    setCompanyData(null);
    navigate('/');
  };

  // Redirect to manage-jobs on dashboard mount
  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs');
    }
  }, [companyData, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white shadow py-4 px-5 flex justify-between items-center">
        <img
          onClick={() => navigate('/')}
          className="max-sm:w-32 cursor-pointer"
          src={assets.logo}
          alt="CareerConnect Logo"
        />
        {companyData && (
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden text-gray-700 font-medium">Welcome, {companyData.name}</p>
            <div className="relative group">
              <img className="w-9 h-9 rounded-full border object-cover" src={companyData.image} alt="Avatar" />
              <div className="absolute hidden group-hover:block top-10 right-0 z-20 bg-white rounded shadow-md p-2 text-sm text-black">
                <ul className="space-y-1">
                  <li onClick={logout} className="cursor-pointer hover:text-red-600">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 border-r bg-gray-50 min-h-full">
          <ul className="pt-5 text-gray-700 font-medium">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 px-6 w-full hover:bg-blue-50 transition ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Job" className="w-4" />
              <span>Add Job</span>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 px-6 w-full hover:bg-blue-50 transition ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <img src={assets.home_icon} alt="Manage Jobs" className="w-4" />
              <span>Manage Jobs</span>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 px-6 w-full hover:bg-blue-50 transition ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="Applications" className="w-4" />
              <span>View Applications</span>
            </NavLink>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
