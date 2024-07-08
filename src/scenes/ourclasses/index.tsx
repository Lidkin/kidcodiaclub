import { SelectedPage, ClassType, QueryWidth } from '@/shared/types'
import python from "@/assets/python-example.png";
import scratch from "@/assets/scratch-example.png";
import javascript from "@/assets/js-example.png";
import logic from "@/assets/logic-example.png";
import kidcodia from '@/assets/kidcodia-text-location.png';
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import Class from './Class';
import useMediaQuery from '@/hooks/useMediaQuery';
import logicGif from '@/assets/logic.gif';
import javascriptGif from '@/assets/javascript.gif';
import './classes.css';

const classes: Array<ClassType> = [
    {
        name: "Scratch",
        age: "Сhildren's age 8-10",
        description: `This class will introduce children to basic programming concepts using Scratch, a visual
         programming language. The classes are interactive and hands-on, allowing students to experiment and explore
          independently. Throughout the course, creativity and problem-solving skills are encouraged.`,
        image: scratch
    },
    {
        name: "Python",
        age: "Сhildren's age 10-14",
        description: `This program will introduce children to basic programming concepts using Python.
          Over time, students will develop a strong foundation in coding and logical thinking,
           fostering their growth in computational skills and problem-solving abilities.`,
        image: python
    },
    {
        name: "JavaScript",
        age: "Сhildren's age 12-16",
        description: `This program will introduce children to creative coding with JavaScript.
         In these interactive sessions, students experiment with creating interactive images and integrating audio and media.
          Over time, students will develop a strong foundation in coding, enhancing their creativity and technical skills.`,
        image: javascript,
        gif: javascriptGif,
    },
    {
        name: "Logic Lab",
        age: "Сhildren's age 6-16",
        description: `This program will develop logical thinking, mathematical intelligence, attention,
         and problem-solving skills through a variety of logical board games, mazes, puzzles, and visual materials.`,
        image: logic,
        gif: logicGif,
    }

];


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Classes = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MediumWidth);

    return (
        <section
            id="classes"
            // className="mx-auto min-h-full w-5/6 xxxs:pt-24 md:pt-32 portrait:pt-28
            //  md:bg-binarycode md:bg-center md:bg-[_120%] lg:bg-[_110%] xl:bg-contain md:bg-no-repeat"

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
                    <Htext> CLASSES </Htext>
                </motion.div>
                <div className='flex justify-center items-center'>
                    <div className={isAboveMediumScreens ?
                        'parent-class mb-10 mx-10 grid grid-cols-2 w-5/6' :
                        'flex flex-col'}
                    >
                        {classes.map((item: ClassType, index) => (
                            <div key={index} className='class'>
                                <Class
                                    key={`{${item.name}-${index}}`}
                                    name={item.name}
                                    age={item.age}
                                    description={item.description}
                                    image={item.image}
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