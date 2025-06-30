import { motion } from 'framer-motion';

const Press = () => {
  return (
    <motion.div className="max-w-4xl mx-auto px-6 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">In the Press</h1>
      <p className="text-gray-600 mb-6">See how JobNest is making headlines across the industry.</p>
      <ul className="space-y-4">
        <li className="bg-gray-100 p-4 rounded shadow-sm">"JobNest transforms how youth find careers" – The Tech Times</li>
        <li className="bg-gray-100 p-4 rounded shadow-sm">"Top 10 Job Platforms of the Year" – CareerWeekly</li>
        <li className="bg-gray-100 p-4 rounded shadow-sm">"Startup Spotlight: JobNest connects talent with future" – Founders Daily</li>
      </ul>
    </motion.div>
  );
};

export default Press;