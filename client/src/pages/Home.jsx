import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import RecommendedJobs from "../components/RecommendedJobs";
import LatestJobs from "../components/LatestJobs";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";

const Home = () => {
  console.log("Homerendered");

  return (
    <div className="font-outfit">
      <Navbar />
      <HeroSection />
      <RecommendedJobs />
      <LatestJobs />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;