import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
// import Offerings from "@/scenes/offerings";
import { useEffect, useState } from "react";
import { SelectedPage } from '@/shared/types';
import Classes from "@/scenes/ourclasses";
import Enroll from "@/scenes/enroll";
import Footer from "@/scenes/footer";
import Address from "@/scenes/location";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home)
      } else {
        setIsTopOfPage(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);


  return (
    <div className="app bg-gray-20">
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      {/* <Offerings setSelectedPage={setSelectedPage} /> */}
      <Classes setSelectedPage={setSelectedPage} />
      <Address setSelectedPage={setSelectedPage}></Address>
      <Enroll setSelectedPage={setSelectedPage} />
      <Footer />
    </div>
  )
}

export default App
