import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <>
      <Navbar />
      <motion.div
        className="max-w-6xl mx-auto py-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-orange-500">JobNest Blog</h1>
        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-white shadow">
            <h2 className="text-xl font-semibold">Top 10 Interview Tips</h2>
            <p className="text-gray-600 mt-2">Master your interviews with these practical, proven strategies.</p>
          </div>
          <div className="p-5 rounded-lg bg-white shadow">
            <h2 className="text-xl font-semibold">Resume Writing 101</h2>
            <p className="text-gray-600 mt-2">Learn how to craft a resume that stands out in 2025.</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Blog;