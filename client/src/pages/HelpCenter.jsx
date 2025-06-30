import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenter = () => {
  return (
    <div>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-16 px-6 md:px-20 bg-gray-50"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Help Center</h1>
        <p className="text-gray-600 mb-4">Find answers to the most common questions about using JobNest.</p>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg text-gray-800">How do I apply for a job?</h2>
            <p className="text-sm text-gray-600 mt-1">Browse job listings and click the "Apply Now" button. Fill in your details and upload your resume.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg text-gray-800">Can I edit my application after submitting?</h2>
            <p className="text-sm text-gray-600 mt-1">No, once submitted, applications cannot be edited. Please review your details before submission.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg text-gray-800">How do I contact support?</h2>
            <p className="text-sm text-gray-600 mt-1">You can reach us via the Contact page or email us at <a href="mailto:support@jobnest.com" className="text-green-600 underline">support@jobnest.com</a>.</p>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default HelpCenter;