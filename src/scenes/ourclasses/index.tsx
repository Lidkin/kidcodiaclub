import { SelectedPage, ClassType, QueryWidth } from '@/shared/types'
import { useState, useEffect, useRef } from 'react';
import python from "@/assets/python-example.png";
import scratch from "@/assets/scratch-example.png";
import javascript from "@/assets/js-example.png";
import logic from "@/assets/logic-example.png";
import pythonMob from "@/assets/mobile/python-example.png";
import scratchMob from "@/assets/mobile/scratch-example.png";
import javascriptMob from "@/assets/mobile/js-example.png";
import logicMob from "@/assets/mobile/logic-example.png";
import kidcodia from '@/assets/kidcodia-text-location.png';
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import Class from './Class';
import useMediaQuery from '@/hooks/useMediaQuery';
import logicGif from '@/assets/logic.gif';
import javascriptGif from '@/assets/javascript.gif';
import './classes.css';
import { useTranslation } from 'react-i18next';

const classes: Array<ClassType> = [
    {
        id: 1,
        name: "Scratch",
        age: "8-10",
        image: scratch,
        imageMob: scratchMob
    },
    {
        id: 2,
        name: "Python",
        age: "10-14",
        image: python,
        imageMob: pythonMob,
    },
    {
        id: 3,
        name: "JavaScript",
        age: "12-16",
        image: javascript,
        imageMob: javascriptMob,
        gif: javascriptGif,
    },
    {
        id: 4,
        name: "Logic Lab",
        age: "6-16",
        image: logic,
        imageMob: logicMob,
        gif: logicGif,
    }

];


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Classes = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MediumWidth);
    const [activeClass, setActiveClass] = useState<ClassType | null>(null);
    const classRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { t } = useTranslation();

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight/2;
        for (let i = 0; i < classRefs.current.length; i++) {
            const element = classRefs.current[i];
            if (element && element.offsetTop <= scrollPosition) {
                setActiveClass(classes[i]);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  
    return (
        <section
            id="classes"
            className="mx-auto min-h-full w-5/6 md:bg-binarycode md:bg-center md:bg-[_120%] lg:bg-[_110%] xl:bg-contain md:bg-no-repeat"
        >
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Classes)}
            >
                <motion.div
                    className="md:my-5 md:w-3/5 pb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <Htext> { t('Classes').toUpperCase()} </Htext>
                </motion.div>
                <div className='flex justify-center items-center'>
                    <div className={isAboveMediumScreens ?
                        'parent-class mb-10 mx-10 grid grid-cols-2 w-5/6' :
                        'flex flex-col'}
                    >
                        {classes.map((item: ClassType, index) => (
                            <div key={index} className='class' ref={el => (classRefs.current[index] = el)}>
                                <Class
                                    key={`{${item.name}-${index}}`}
                                    id={item.id}
                                    active={activeClass?.id}
                                    name={item.name}
                                    age={item.age}
                                    image={item.image}
                                    imageMob={item.imageMob}
                                    gif={item.gif}
                                    mediumScreen={isAboveMediumScreens}
                                    setSelectedPage={setSelectedPage}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
            <div className='kidcodia w-5/6 flex'>
                <div className='mx-auto'>
                    <div className='flex w-5/6 h-fit absolute -translate-x-[40%] translate-y-[2vw]'>
                        <img className='w-full max-w-full' src={kidcodia} alt="externals-developers-institute" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Classes