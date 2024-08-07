import Header from "./components/Header/Header";
import MoreInformation from "./components/MoreInformation/MoreInformation";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import TryItOut from "./components/TryItOut/TryItOut";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <Header />
      <MoreInformation />
      <HowItWorks />
      <TryItOut />
      <Footer />
    </>
  );
}
