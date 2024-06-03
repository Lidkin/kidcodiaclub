import useMediaQuery from '@/hooks/useMediaQuery';
import ActionButton from '@/shared/ActionButton';
import { SelectedPage, QueryWidth } from '@/shared/types';
import HomePageText from '@/assets/kidcodia.png';
import HomePageGraphic from '@/assets/laptop-classroom-home.png';
import DILogo from '@/assets/LogoDI.png';
import ScratchLogo from '@/assets/Scratch-cat-logo-300x300px.png';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { motion } from 'framer-motion';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Home = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MinWidth);

  return (
      <section
          id="home"
          className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'
      >
            <motion.div
              className="w-5/6 items-center justify-center md:flex md:h-5/6 mx-auto"
              onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
            >
              {/* main header */}
              <div className='z-10 mt-32 md:basis-3/5'>
                  {/* headings */}
                  <motion.div
                      className='md:-mt-20'
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1 }}
                      variants={{
                          hidden: { opacity: 0, x: -50 },
                          visible: {opacity: 1, x: 0 }
                      }}
                  > 
                      <div className='relative'>
                          <div className='before:absolute before:-top-[150px] before:-left-20 before:z-[-1] md:before:content-kidcodiatext'>
                                <img alt="home-page-text" src={HomePageText} />
                            </div>
                      </div>
                      <p className="mt-8 text-sm md:text-start">
                          Are you looking for a fun and educational afterschool activity for your child?
                          Kidcodia is the perfect place for young minds aged 8-15 to dive into the world of programming and technology!
                      </p>
                  </motion.div>
                  {/* actions */}
                  <motion.div
                      className='mt-8 flex items-center gap-8'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: {opacity: 1, x: 0 }
                        }}
                    >
                      <ActionButton setSelectedPage={setSelectedPage}>
                          Enroll
                      </ActionButton>
                      <AnchorLink
                          className='text-sm font-bold text-primary-300 underline hover:text-secondary-400'
                          onClick={() => setSelectedPage(SelectedPage.Register)}
                          href={`${SelectedPage.Register}`}                          
                      >
                          <p>Learn More</p>
                      </AnchorLink>
                  </motion.div>
              </div>

              {/* image */}
              <div className='flex basis-3/5 justify-center
                    md:ml-40 md:mt-16 md:justify-items-end'>
                  <img alt="home-page-graphic" src={HomePageGraphic} />
              </div>
              
          </motion.div>

          {/* externals */}
          {isAboveMediumScreens && (
            <div className='h-[150px] w-full bg-primary-100 py-10'>
                  <div className='mx-auto w-5/6'>
                      <div className='flex w-3/5 items-center justify-between gap-8'>
                          <a href='https://developers.institute/'>
                              <img className='w-full max-w-80' src={DILogo} alt="externals-developers-institute" />
                          </a>
                          <a href='https://scratch.mit.edu/'>
                              <img className='w-full max-w-24' src={ScratchLogo} alt="externals-scratch" />
                          </a>
                    </div>
                </div>
            </div>
)}
          </section>
  )
}

export default Home