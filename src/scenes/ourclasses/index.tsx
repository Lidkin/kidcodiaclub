import { SelectedPage, ClassType, QueryWidth } from '@/shared/types'
import python from "@/assets/python-example.png";
import scratch from "@/assets/scratch-example.png";
import javascript from "@/assets/js-example.png";
import logic from "@/assets/logic.gif";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import Class from './Class';
import useMediaQuery from '@/hooks/useMediaQuery';

const classes: Array<ClassType> = [

    {
        name: "Scratch",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, accusamus architecto. Aspernatur temporibus eveniet repellat, animi, hic quas cumque rerum sequi at distinctio quaerat dolores veniam mollitia aliquid qui tenetur.",
        image: scratch
    },
    {
        name: "Python",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, accusamus architecto. Aspernatur temporibus eveniet repellat, animi, hic quas cumque rerum sequi at distinctio quaerat dolores veniam mollitia aliquid qui tenetur.",
        image: python
    },
    {
        name: "JavaScript",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, accusamus architecto. Aspernatur temporibus eveniet repellat, animi, hic quas cumque rerum sequi at distinctio quaerat dolores veniam mollitia aliquid qui tenetur.",
        image: javascript,
        afterbg: "javascript"
    },
    {
        name: "Logic",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, accusamus architecto. Aspernatur temporibus eveniet repellat, animi, hic quas cumque rerum sequi at distinctio quaerat dolores veniam mollitia aliquid qui tenetur.",
        image: logic,
        afterbg: "logic"
    }

];

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Classes = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MinWidth);

    return (
        <section id="classes" className='w-full bg-primary-100 p-24'>
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Classes)}
            >
                <motion.div
                    className='mx-auto w-5/6'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <div className='w-3/5'>
                        <Htext> OUR CLASSES </Htext>
                        <p className='py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas modi mollitia nostrum officia repudiandae aliquam reprehenderit doloremque nesciunt saepe eaque aut nobis quam, sunt perferendis beatae nulla non ex!</p>
                    </div>

                </motion.div>

                {/* slides scroll */}
                <div className={isAboveMediumScreens ?
                    'mt-10 h-[450px] w-full overflow-x-auto overflow-y-hidden ' :
                    'flex flex-col'}
                >
                    <ul className={isAboveMediumScreens ? 'w-fit whitespace-nowrap ' : 'w-fit'}>
                        {classes.map((item: ClassType, index) => (
                            <Class
                                key={`{${item.name}-${index}}`}
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                afterbg={item.afterbg}
                                mediumScreen={isAboveMediumScreens}
                            />
                        ))}
                    </ul>
                </div>
            </motion.div>
        </section>
    )
}

export default Classes