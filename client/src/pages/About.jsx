import { motion } from 'framer-motion';

const About = () => { return ( <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="py-16 px-6 md:px-20 bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen" > <div className="max-w-5xl mx-auto text-center"> <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About <span className="text-blue-600">CareerConnect</span></h1> <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-10"> CareerConnect is your trusted career companion, helping job seekers and employers connect in the most efficient and transparent way. Our mission is to bridge the gap between talent and opportunity by offering a seamless job discovery and hiring experience. </p>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
      >
        <h3 className="text-xl font-semibold mb-2 text-blue-600">🌟 Our Vision</h3>
        <p className="text-gray-600 text-sm">
          To be the most trusted platform for professionals to build careers and for companies to discover top talent.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
      >
        <h3 className="text-xl font-semibold mb-2 text-green-600">🚀 Our Mission</h3>
        <p className="text-gray-600 text-sm">
          Empower individuals by making job searching transparent, fast, and intuitive while offering companies a quality hiring pipeline.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
      >
        <h3 className="text-xl font-semibold mb-2 text-purple-600">💡 Why Choose Us</h3>
        <p className="text-gray-600 text-sm">
          We blend advanced tech, an intuitive interface, and a strong commitment to support to help users achieve their career goals effortlessly.
        </p>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="mt-16 bg-blue-600 text-white py-10 px-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-2">Join the Connect</h2>
      <p className="text-sm max-w-xl mx-auto">
        Whether you're a job seeker or a recruiter, CareerConnect is designed to elevate your journey. Sign up today and become part of the future of hiring.
      </p>
    </motion.div>
  </div>
</motion.div>

); };

export default About;