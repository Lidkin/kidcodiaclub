import { SelectedPage } from '@/shared/types';
import EnrollGraphic from "@/assets/enroll-img.png";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import { useState } from 'react';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Enroll = ({ setSelectedPage }: Props) => {
    const inputStyles = `mt-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-gray-20`
    const checkboxText = "select your preferred days of the week".toUpperCase();
    const radioText = "select how many days you want in the week".toUpperCase();
    const [numChildren, setNumChildren] = useState<number>(1);
    const [numDays, setNumDays] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumChildren(Number(e.target.value));
    };

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = Number(e.target.value);
        setNumDays(selectedValue);
        setSelectedDays([]); // Reset selected days when number of days changes
    };

    const handleDayCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.checked) {
            if (selectedDays.length < numDays) {
                setSelectedDays([...selectedDays, value]);
            }
        } else {
            setSelectedDays(selectedDays.filter(day => day !== value));
        }
    };

    return (
        <section id='enroll' className='mx-auto w-5/6 xxxs:pt-24 md:pt-32 pb-32 portrait:pt-28'>
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Enroll)}>
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
                    <Htext>
                        <span className='text-primary-500'> ENROLL </span> FOR A CLASS
                    </Htext>
                    <p className="my-5">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt facilis fuga minima veniam expedita.
                        Beatae cupiditate asperiores aperiam. Illum eum veniam expedita ut fugiat provident,
                        reprehenderit nesciunt repudiandae iste deserunt.
                    </p>
                </motion.div>
                <div className="mt-10 justify-between gap-8 md:flex">
                    <motion.div
                        className='mt-10 basis-3/5 md:mt-0 z-[5]'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        {/* Start Form */}
                        <form
                            action="https://formsubmit.co/023177d25875ee7912e5274e047bbdd1"
                            method="POST"
                        >
                            <input type="text"
                                name="name"
                                placeholder={"Name".toUpperCase()}
                                maxLength={100}
                                required
                                className={inputStyles} />

                            <input type="email"
                                name="email"
                                placeholder={"Email".toUpperCase()}
                                maxLength={50}
                                pattern='/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i'
                                required
                                className={inputStyles} />

                            {/* number of kids */}
                            <div className='mt-5 w-full rounded-lg bg-primary-300 px-5 py-3'>
                                <div className='w-3/5 flex'>
                                    <label className='text-white pr-5'>{"Number of kids".toUpperCase()}</label>
                                    <input type="number"
                                        name="numChildren"
                                        value={numChildren}
                                        min={1}
                                        required
                                        onChange={handleChildrenChange}
                                        className='appearance-none block w-16 pl-4 border rounded-md text-gray-100 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    />
                                </div>
                            </div>


                            {/* 2nd */}
                            {/* 3rd */}
                            {/* 4th */}

                            <div className='mt-5 w-full rounded-lg bg-primary-300 px-5 py-3 flex'>
                                {[...Array(numChildren)].map((_, index) => (

                                    <div key={index} className='inline-flex pr-4'>

                                        <label className='text-white pr-1'>
                                            {index + 1 === 1 ? '1st KID AGE' :
                                                index + 1 === 2 ? '2nd KID AGE' :
                                                    index + 1 === 3 ? '3rd KID AGE' :
                                                        `${index + 1}th KID AGE`}</label>
                                        <input
                                            type="number"
                                            name={`childAge${index + 1}`}
                                            min={6}
                                            max={16}
                                            required
                                            className='appearance-none block w-16 pl-4 border rounded-md text-gray-100 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label>{radioText}</label>
                                <div>
                                    {[1, 2, 3].map(day => (
                                        <label key={day}>
                                            <input
                                                type="radio"
                                                name="numDays"
                                                value={day}
                                                checked={numDays === day}
                                                required
                                                onChange={handleDaysChange}
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>{checkboxText}</label>
                                <div>
                                    {['SUNDAY', 'TUESDAY', 'WEDNESDAY'].map(day => (
                                        <label key={day}>
                                            <input
                                                type="checkbox"
                                                name="preferredDays"
                                                value={day}
                                                disabled={selectedDays.length >= numDays}
                                                checked={selectedDays.includes(day)}
                                                onChange={handleDayCheckboxChange}
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>Range of the Class Time</label>
                                <input type="text" name="classTime" />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        {/* End Form */}

                    </motion.div>

                    <motion.div
                        className="relative mt-16 basis-2/5 md:mt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="w-full rounded-lg border-spacing-1 before:absolute before:-bottom-44 before:right-0 before:z-[1] md:before:content-enroll">
                            <img
                                className="w-full"
                                alt="enroll-page-graphic"
                                src={EnrollGraphic}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

        </section>
    )
}

export default Enroll





