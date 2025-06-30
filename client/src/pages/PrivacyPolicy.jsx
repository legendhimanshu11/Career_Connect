import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-16 px-6 md:px-20 bg-gray-50"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">
          At JobNest, we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>

        <div className="space-y-4 text-gray-700 text-sm">
          <p><strong>1. Information We Collect:</strong> We collect your name, email, resume, job preferences, and IP address when you use our platform.</p>
          <p><strong>2. How We Use Your Data:</strong> Your information is used to match you with job opportunities, provide personalized job alerts, and improve our services.</p>
          <p><strong>3. Sharing:</strong> We never sell your personal data. We only share it with recruiters for jobs you’ve applied to or shown interest in.</p>
          <p><strong>4. Data Security:</strong> We implement industry-standard security practices to protect your data from unauthorized access.</p>
          <p><strong>5. Cookies:</strong> We use cookies to enhance user experience and analyze site traffic.</p>
          <p><strong>6. Your Rights:</strong> You can request data deletion or correction at any time by contacting <a href="mailto:support@jobnest.com" className="text-green-600 underline">support@jobnest.com</a>.</p>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;