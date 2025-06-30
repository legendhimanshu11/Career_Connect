import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InternshipApply = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contact: '',
    resume: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post('https://your-backend-api.com/api/internships/apply', formData);
      if (res.data.success) {
        toast.success('Application submitted!');
        navigate('/thank-you');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Failed to submit application.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 px-4 sm:px-10 bg-gray-50">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Apply for Internship</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              required
              value={form.contact}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InternshipApply;
