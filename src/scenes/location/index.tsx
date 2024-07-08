import Htext from "@/shared/Htext";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import kidcodia from '@/assets/kidcodia-text-location.png';

motion

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

const Location = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='location'
      className="mx-auto h-fit md:pb-0 pb-5 w-5/6">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Location)}>

        <motion.div
          className='md:w-3/5'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <Htext>LOCATION</Htext>
        </motion.div>
        <p className="py-4 xs:py-10">Our classes are located in <a className="font-montserrat text-primary-500 font-bold" href='https://developers.institute/'>Developers.Institute</a><br />Bezalel St 8, 2nd & 4nd Floor, Ramat Gan</p>
        <iframe className='w-full rounded-lg lg:landscape:h-[_65vh] landscape:h-[_50vh] portrait:h-[_65vh] mb-20'
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDCV3q-VlEzBJnqN3SC8B60V_RTx52_L20&q=Developers+Institute,Ramat+Gan+Israel"
          allowFullScreen>
        </iframe>
      </motion.div>
      <div className='md:hidden md:h-0 h-fit w-5/6 flex'>
        <div className='mx-auto'>
          <div className='flex w-5/6 h-fit absolute -translate-x-[40%] -translate-y-[5vw]'>
            <img className='w-full max-w-full' src={kidcodia} alt="externals-developers-institute" />
          </div>
        </div>
      </div>

    </section>
  )
}

export default Location