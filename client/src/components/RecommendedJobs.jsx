import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const jobs = [
  { id: 'frontend-dev', title: 'Frontend Developer', company: 'Adobe', location: 'Bangalore', type: 'Full-time', tags: ['React', 'JavaScript', 'UI/UX'] },
  { id: 'data-analyst', title: 'Data Analyst Intern', company: 'Amazon', location: 'Remote', type: 'Internship', tags: ['SQL', 'Excel', 'PowerBI'] },
  { id: 'hr-exec', title: 'HR Executive', company: 'Walmart', location: 'Hyderabad', type: 'Full-time', tags: ['Recruitment', 'Communication'] },
  { id: 'software-eng', title: 'Software Engineer', company: 'Microsoft', location: 'Noida', type: 'Full-time', tags: ['.NET', 'Azure', 'C#'] },
  { id: 'marketing-associate', title: 'Marketing Associate', company: 'Samsung', location: 'Mumbai', type: 'Full-time', tags: ['SEO', 'Google Ads', 'Brand'] },
  { id: 'ux-designer', title: 'UX Designer', company: 'Accenture', location: 'Pune', type: 'Full-time', tags: ['Figma', 'Prototyping'] },
  { id: 'backend-dev', title: 'Backend Developer', company: 'Flipkart', location: 'Bangalore', type: 'Full-time', tags: ['Node.js', 'MongoDB', 'REST API'] },
  { id: 'content-writer', title: 'Content Writer', company: 'Zomato', location: 'Remote', type: 'Part-time', tags: ['Blogging', 'Copywriting'] },
  { id: 'devops-eng', title: 'DevOps Engineer', company: 'TCS', location: 'Chennai', type: 'Full-time', tags: ['CI/CD', 'Kubernetes'] },
  { id: 'product-manager', title: 'Product Manager', company: 'Paytm', location: 'Gurgaon', type: 'Full-time', tags: ['Agile', 'Leadership'] },
  { id: 'ai-engineer', title: 'AI Engineer', company: 'Google', location: 'Bangalore', type: 'Full-time', tags: ['Python', 'TensorFlow', 'ML'] },
  { id: 'cyber-analyst', title: 'Cybersecurity Analyst', company: 'Infosys', location: 'Hyderabad', type: 'Full-time', tags: ['Security', 'Network', 'Audit'] },
  { id: 'tech-support', title: 'Technical Support', company: 'Dell', location: 'Chennai', type: 'Full-time', tags: ['Customer', 'Tech', 'Helpdesk'] },
  { id: 'systems-eng', title: 'Systems Engineer', company: 'IBM', location: 'Pune', type: 'Full-time', tags: ['System', 'Infra', 'Linux'] },
  { id: 'mobile-dev', title: 'Mobile App Developer', company: 'Swiggy', location: 'Remote', type: 'Full-time', tags: ['Flutter', 'iOS', 'Android'] },
  { id: 'qa-tester', title: 'QA Tester', company: 'Capgemini', location: 'Noida', type: 'Full-time', tags: ['Testing', 'Automation', 'Selenium'] },
  { id: 'cloud-arch', title: 'Cloud Architect', company: 'Oracle', location: 'Gurgaon', type: 'Full-time', tags: ['AWS', 'Cloud', 'Architecture'] },
  { id: 'graphic-designer', title: 'Graphic Designer', company: 'Snapdeal', location: 'Mumbai', type: 'Internship', tags: ['Photoshop', 'Illustrator', 'Creativity'] },
  { id: 'biz-analyst', title: 'Business Analyst', company: 'Uber', location: 'Remote', type: 'Full-time', tags: ['Analytics', 'Strategy', 'Dashboard'] },
  { id: 'tech-recruiter', title: 'Tech Recruiter', company: 'LinkedIn', location: 'Bangalore', type: 'Full-time', tags: ['Hiring', 'Talent', 'HR'] },
];

const RecommendedJobs = () => {
  const [slide, setSlide] = useState(0);
  const jobsPerPage = 3;
  const totalSlides = Math.ceil(jobs.length / jobsPerPage);

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500); // auto-slide every 3.5 sec
    return () => clearInterval(interval);
  }, []);

  const startIndex = slide * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <section className="py-16 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recommended Jobs</h2>
        </div>

        <motion.div
          key={slide}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {currentJobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{job.company} • {job.location}</p>
              <p className="text-xs mb-3 text-blue-600 font-medium">{job.type}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full">{tag}</span>
                ))}
              </div>
              <Link
                to={`/apply-job/${job._id}`}
                className="block text-center text-sm py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </motion.div>

        <div className="flex justify-center items-center gap-3 mt-8">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              onClick={() => setSlide(i)}
              className={`w-3 h-3 rounded-full ${i === slide ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedJobs;
