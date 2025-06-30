import { motion } from 'framer-motion';

const Services = () => { return ( <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen py-16 px-4 md:px-20"> <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto text-center" > <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6"> Our Services </h1> <p className="text-lg text-gray-600 mb-12"> We provide a wide range of career-boosting services to help you land your dream job. </p> </motion.div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      {
        title: 'Resume Building',
        desc: 'Get professionally designed resumes tailored to your career goals.',
        icon: '📄',
      },
      {
        title: 'Career Counseling',
        desc: 'Expert advice to help guide your career path in the right direction.',
        icon: '🎯',
      },
      {
        title: 'Mock Interviews',
        desc: 'Practice with real interview questions and get feedback to improve.',
        icon: '🎤',
      },
      {
        title: 'Skill Development',
        desc: 'Access resources and mentorship to upgrade your skill set.',
        icon: '💻',
      },
      {
        title: 'Job Alerts',
        desc: 'Stay ahead with real-time job alerts tailored to your preferences.',
        icon: '🔔',
      },
      {
        title: 'Application Tracking',
        desc: 'Track your job applications and responses from companies.',
        icon: '📊',
      },
    ].map((service, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
      >
        <div className="text-4xl mb-4 text-blue-600">{service.icon}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h2>
        <p className="text-gray-600 text-sm">{service.desc}</p>
      </motion.div>
    ))}
  </div>
</div>

); };

export default Services;