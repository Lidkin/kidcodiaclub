import useMediaQuery from '@/hooks/useMediaQuery';
import ActionButton from '@/shared/ActionButton';
import { SelectedPage, QueryWidth } from '@/shared/types';
import HomePageText from '@/assets/kidcodia.png';
import HomePageGraphic from '@/assets/laptop-classroom-home.png';
import HomePageGraphicMob from '@/assets/mobile/laptop-classroom-home.png';
import DILogo from '@/assets/LogoDI.png';
import ScratchLogo from '@/assets/Scratch-cat-logo-300x300px.png';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Home = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MediumWidth);
    const { t }= useTranslation();
    return (
        <section
            id="home"
            className={`gap-16 bg-gray-20 pt-24 w-full h-full`}
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
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <div className='relative'>
                            <div className='before:absolute before:-top-[150px] before:-left-20 before:z-[-1] md:before:content-kidcodiatext'>
                                <img alt="home-page-text" src={HomePageText} />
                            </div>
                        </div>
                        <p className="mt-8 text-sm md:text-start">
                            {t('home_description_one')}
                            <br />
                            <Trans i18nKey='home_description_two'>Do you want them to develop <span className='text-primary-100 font-montserrat text-md'>logic</span> and problem-solving skills while <span className='text-primary-500 font-montserrat text-md'>thinking critically</span> and <span className='text-secondary-50 font-montserrat text-md'>creatively</span>?    
                            </Trans>
                            <br />{t('home_description_three')}</p>
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
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <ActionButton setSelectedPage={setSelectedPage}>
                            { t('enroll') }
                        </ActionButton>
                    </motion.div>
                </div>

                {/* image */}
                <div className='home-image flex basis-3/5 justify-center
                    slg:ml-20 mdl:ml-40 md:mt-16 md:justify-items-end md:pt-4'>
                    <img alt="home-page-graphic" src={isAboveMediumScreens ? HomePageGraphic : HomePageGraphicMob} />
                </div>

            </motion.div>
            
                <div className='externals hidden w-0 h-0'>
                    <div className='mx-auto w-11/12'>
                        <div className='flex w-full items-center justify-between gap-8'>
                        <p className='font-montserrat mb-2 font-semibold text-md'>{t('support')}</p>
                            <a href='https://developers.institute/'>
                                <img className='w-full max-w-80' src={DILogo} alt="externals-developers-institute" />
                            </a>
                        </div>
                    </div>
                </div>

            {/* externals */}
            {isAboveMediumScreens && (
                <div className='md-externals h-fit w-full bg-primary-100 py-8 flex absolute bottom-0 '>
                    <div className='mx-auto w-5/6'>
                        <div className='flex w-full items-center justify-between gap-8'>
                            <div>
                                <p className='font-montserrat mb-2 font-semibold text-md'>{t('support')}</p>
                                <a href='https://developers.institute/'>
                                    <img className='w-full max-w-80' src={DILogo} alt="externals-developers-institute" />
                                </a>
                            </div>
                            <a href='https://scratch.mit.edu/'>
                                <img className='w-full max-w-24 h-20' src={ScratchLogo} alt="externals-scratch" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Home