import { SelectedPage, ClassType, QueryWidth } from '@/shared/types'
import python from "@/assets/python-example.png";
import scratch from "@/assets/scratch-example.png";
import javascript from "@/assets/js-example.png";
import logic from "@/assets/logic-example.png";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import Class from './Class';
import useMediaQuery from '@/hooks/useMediaQuery';
// import Carousel from './Carousel';

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
         Interactive and hands-on sessions allow students to experiment independently.
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
    },
    {
        name: "Logic Lab",
        age: "Сhildren's age 6-16",
        description: `This program will develop logical thinking, mathematical intelligence, attention,
         and problem-solving skills through a variety of logical board games, mazes, puzzles, and visual materials.`,
        image: logic,
    }

];


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Classes = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MinWidth);

    return (
        <section
            id="classes"
            // className='w-full md:bg-binarycode md:bg-center md:bg-contain px-24 pt-32'
            className="mx-auto min-h-full w-5/6 xxxs:pt-24 md:pt-32 md:bg-binarycode md:bg-center md:bg-contain md:bg-no-repeat"
        >
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Classes)}
            >
                <motion.div
                    // className='mx-auto w-5/6'
                    className="md:my-5 md:w-3/5"
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

                <div className={isAboveMediumScreens ?
                    'm-10 grid grid-cols-2 gap-8' :
                    'flex flex-col'}
                >
                    {classes.map((item: ClassType, index) => (
                        <Class
                            key={`{${item.name}-${index}}`}
                            name={item.name}
                            age={item.age}
                            description={item.description}
                            image={item.image}
                            mediumScreen={isAboveMediumScreens}
                            setSelectedPage={setSelectedPage}
                        />
                    ))}
                </div>
                <iframe className='w-full mt-20'
                    height="250"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDCV3q-VlEzBJnqN3SC8B60V_RTx52_L20&q=Developers+Institute,Ramat+Gan+Israel"
                    allowFullScreen>
                </iframe>
            </motion.div>
        </section>
    )
}

export default Classes