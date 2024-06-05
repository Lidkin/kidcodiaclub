import Htext from "@/shared/Htext";
import { OfferingType, SelectedPage } from "@/shared/types";
import OfferingsImage from "@/assets/offerings.png"
import TimeTable from "@/assets/icons/timetable.png";
import AgeGroop from "@/assets/icons/age-group.png";
import Inclusive from "@/assets/icons/inclusive.png";
import { motion } from "framer-motion";
import Offering from "./Offering";
import ActionButton from "@/shared/ActionButton";

const offerings: Array<OfferingType> = [
    {
        icon: <img src={TimeTable} className="h-8 w-8" />,
        title: "Engaging Curriculum",
        description: "Our program is designed to be both fun and educational. Kids will learn the basics of coding through interactive lessons and hands-on projects."
    },
    {
        icon: <img src={AgeGroop} className="h-8 w-8" />,
        title: "Age-Appropriate Learning",
        description: "Our curriculum is tailored to different age groups and skill levels, ensuring that each child is challenged and motivated."
    },
    {
        icon: <img src={Inclusive} className="h-8 w-8" />,
        title: "Safe and Collaborative Environment",
        description: "Kids will work on group projects, fostering teamwork and communication skills while making new friends with similar interests."
    }
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    },
}

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Offerings = ({ setSelectedPage }: Props) => {
    const spanVar = "text-primary-500 font-bold";
    const paragraph = "my-5 text-sm";

  return (
      <section
          id="offerings"
          className="mx-auto min-h-full w-5/6 py-20"
      >
          <motion.div
          onViewportEnter={() => setSelectedPage(SelectedPage.Offerings)}
          >
              <motion.div className="md:my-5 md:w-3/5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                  variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {opacity: 1, x: 0}
                  }}>
                  <Htext> WHAT WE OFFER </Htext>
              </motion.div> 
              {/* Offerings */}
              <motion.div
                  className="mt-5 items-center md:flex md:justify-between md:gap-8 md:mx-2 lg:gap-24"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={container}
              >
                  {offerings.map((offering: OfferingType) => (
                      <Offering
                          key={offering.title}
                          icon={offering.icon}
                          title={offering.title}
                          description={offering.description}
                          setSelectedPage={setSelectedPage}
                      />
                  ))}
              </motion.div>
              <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                  <img className="mx-auto z-[-10] md:max-w-[400px]"
                      alt="offerings-page-image"
                      src={OfferingsImage}
                  />
                  {/* description */}
                  <div>
                      {/* title */}
                      <div className="relative">
                          <div className="before:absolute before:-top-20 before:-left-16
                           before:z-[-1] before:content-smile before:w-max-[50]">
                              <motion.div
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.5 }}
                                  transition={{ duration: 1 }}
                                  variants={{
                                      hidden: { opacity: 0, x: 50 },
                                      visible: {opacity: 1, x: 0}
                                  }}
                              >                                  
                                  <Htext>
                                      DETAILS
                                  </Htext>
                              </motion.div>
                        </div>                        
                              
                      </div>
                      <motion.div
                            initial="hidden"
                             whileInView="visible"
                             viewport={{ once: true, amount: 0.5 }}
                             transition={{ delay: 0.2, duration: 1 }}
                             variants={{
                                 hidden: { opacity: 0, x: 50 },
                                 visible: {opacity: 1, x: 0}
                             }}
                      >
                          <p className={paragraph}>
                              <span className={spanVar}>Age Group:</span>
                              {' '} 8-15 years </p>
                          <p className={paragraph}>
                              <span className={spanVar}>Schedule:</span>
                              {' '}Twice a week, after school hours
                          </p>
                          <p className={paragraph}>
                              <span className={spanVar}>Location:</span> {' '} Tel Aviv </p>
                          <p className={paragraph}>
                              <span className={spanVar}>Contact Information:</span> {' '} [Your Contact Details] </p>

                          <p className={paragraph}>
                              Don’t miss out on this incredible opportunity for your child to learn and grow in the exciting field of coding.
                              Contact us to enroll or to learn more about our program!</p>
                          
                      </motion.div>

                      <div className="relative mt-16">
                          <div className="before:absolute before:-bottom-20 before:right-24
                           before:z-[-1] before:content-tongue md:before:right-8 after:absolute
                           after:-top-24 after:-right-16 after:content-wonderment">
                              <ActionButton setSelectedPage={setSelectedPage}>
                                  Enroll
                              </ActionButton>
                           </div>
                      </div>    
                  </div>
              </div>
          </motion.div>
      </section>
  )
}

export default Offerings;