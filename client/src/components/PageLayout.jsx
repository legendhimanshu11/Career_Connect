import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div className="font-outfit">
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto px-6 pt-28 pb-16 min-h-[70vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Optional Page Title */}
        {title && (
          <h1 className="text-3xl font-bold text-blue-600 mb-1">
            {title}
          </h1>
        )}

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-gray-500 mb-6 text-sm">{subtitle}</p>
        )}

        {/* Page Content */}
        <div className="text-gray-800 text-sm space-y-4 leading-relaxed">
          {children}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default PageLayout;