import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-16 px-6 md:px-20 bg-gray-50"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-6">
           to JobNest. By using our platform, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-4 text-gray-700 text-sm">
          <p><strong>1. Acceptance of Terms:</strong> By accessing or using JobNest, you agree to comply with these Terms of Service.</p>
          <p><strong>2. User Obligations:</strong> You agree to provide accurate and complete information when using our services and comply with applicable laws.</p>
          <p><strong>3. Job Listings:</strong> JobNest is not responsible for the content of job listings posted by recruiters or users.</p>
          <p><strong>4. Termination:</strong> We reserve the right to suspend or terminate your account if you violate any terms of use.</p>
          <p><strong>5. Liability:</strong> JobNest is not liable for any damages or loss arising from the use of the platform.</p>
          <p><strong>6. Governing Law:</strong> These terms are governed by the laws of the jurisdiction in which JobNest operates.</p>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default TermsOfService;