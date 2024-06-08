import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import LogoMini from "@/assets/Logo-mini.png";
import Link from "./Link";
import { SelectedPage, QueryWidth } from "@/shared/types";
import ActionButton from '@/shared/ActionButton';
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import Htext from "@/shared/Htext";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const flexBetween = "flex items-center justify-between z-[1000]";
  const isAboveMediumScreens = useMediaQuery(QueryWidth.MinWidth);
  const navbarBackground = isTopOfPage ? "" : "bg-gray-20";

  return <nav>
    <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
      <div className={`${flexBetween} gap-x-24 mx-auto w-5/6`}>
        <div className={`${flexBetween} w-full gap-16`}>
        {isAboveMediumScreens ?
          (
            <>
                <img style={{ width: '80px' }} alt="logo" src={Logo} />
                
              <div className={`${flexBetween} w-full`}>
                  <div className={`${flexBetween} gap-8 text-md`}>
                      <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                      {/* <Link page="Offerings" selectedPage={selectedPage} setSelectedPage={setSelectedPage} /> */}
                      <Link page="Classes" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                      <Link page="Adress" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                                                        </div>
                  { selectedPage !== 'enroll' ? <div className={`${flexBetween} gap-8`}>                    
                        <p>Want to code?</p>
                        <ActionButton setSelectedPage={setSelectedPage}>Enroll</ActionButton>
                  </div> :
                    <div>
                      <Htext> WELCOME TO<span className='text-primary-100'> KIDCODIA </span></Htext>
                      </div>
                    
                }  
              </div> 
            </>  
          ) : ( 
            <>     
              <img style={{width: '60px'}} alt="logo-mini" src={LogoMini} />
              <button
                className="rounded-full bg-secondary-500 p-2 hover:bg-primary-100"
                onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>

    {!isAboveMediumScreens && isMenuToggled && (
      <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-secondary-500 drop-shadow-xl">
        <div className="flex justify-end p-12">
          <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
            <XMarkIcon className="h-6 w-6 text-gray-400"/>
          </button>
        </div>
        <div className="ml-[33%] flex flex-col gap-10 text-2xl">
          <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          {/* <Link page="Offerings" selectedPage={selectedPage} setSelectedPage={setSelectedPage} /> */}
          <Link page="Classes" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <Link page="Enroll" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        </div>
      </div>
    )}
  </nav>
}

export default Navbar