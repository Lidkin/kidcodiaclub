import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll';


const childVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {opacity: 1, scale: 1}
}

type Props = {
    icon: JSX.Element;
    title: string;
    description: string;
    setSelectedPage: (value: SelectedPage) => void;
}

const AboutItem = ({ icon, title, description, setSelectedPage }: Props) => {
  return (
      <motion.div
          variants={childVariant}
          className='mt-5 rounded-md border-2 border-gray-100 px-5 py-12 text-center md:flex md:flex-col md:w-[300px] lg:w-[550px] md:h-[450px] md:justify-between'>
            <div className='mb-5 flex justify-center'>
                <div className='rounded-full border-2 border-gray-100 bg-gray-200 p-6'>
                    { icon }
                </div>
            </div>
            <h4 className='font-bold'>{title}</h4>
            <p className='my-3'>{description}</p>
            <AnchorLink
                className='text-sm font-bold text-primary-100 underline hover:text-secondary-400'
                    onClick={() => setSelectedPage(SelectedPage.Register)}
                    href={`${SelectedPage.Register}`}                          
                >
                <p>Learn More</p>
            </AnchorLink>
        </motion.div>
  )
}

export default AboutItem