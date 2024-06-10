import Htext from "@/shared/Htext"
import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

motion

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

const Location = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='location'
      className="mx-auto min-h-full w-5/6 xxxs:pt-24 md:pt-32 portrait:pt-28">
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
        <iframe className='w-full rounded-lg lg:landscape:h-[_65vh] landscape:h-[_50vh] portrait:h-[_65vh]'
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDCV3q-VlEzBJnqN3SC8B60V_RTx52_L20&q=Developers+Institute,Ramat+Gan+Israel"
          allowFullScreen>
        </iframe>
      </motion.div>
    </section>
  )
}

export default Location