import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import { useEffect, useState } from "react";
import { SelectedPage, QueryWidth } from '@/shared/types';
import Classes from "@/scenes/ourclasses";
import Enroll from "@/scenes/enroll";
import Footer from "@/scenes/footer";
import Address from "@/scenes/location";
import { useTranslation } from "react-i18next";
import useMediaQuery from '@/hooks/useMediaQuery';

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const { i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const isAboveMediumScreens = useMediaQuery(QueryWidth.MediumWidth);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }

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
    <div className={`app bg-gray-20 ${currentLanguage === 'ru' ? 'font-manrope' : 'font-dmsans'}`}>
      <div className={`translate fixed ${isAboveMediumScreens ? 'right-2 top-2' : 'translate-x-[50%] right-[50%] top-6'}`}>
        <button
          className={`w-[50px] h-[47px] ${currentLanguage === "en" ? 'bg-ru' : 'bg-en'}`}
          type="button"
          onClick={handleChangeLanguage}
        >
        </button>
      </div>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <Classes setSelectedPage={setSelectedPage} />
      <Address setSelectedPage={setSelectedPage}></Address>
      <Enroll setSelectedPage={setSelectedPage} />
      <Footer />
    </div>
  )
}

export default App
