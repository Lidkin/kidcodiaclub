import { SelectedPage } from '@/shared/types';
import EnrollGraphic from "@/assets/enroll-img.png";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import { useState, useRef, useEffect } from 'react';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Enroll = ({ setSelectedPage }: Props) => {
    const weekDaysArr = ['SUNDAY', 'TUESDAY', 'WEDNESDAY'];
    const numOfDays = [1, 2, 3];
    const timesSlots = ["14:00 - 15:00", "15:15 - 16:15", "16:30 - 17:30", "17:45 - 18:45"];
    const inputStyles = `w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`
    const checkboxText = "select your preferred days of the week".toUpperCase();
    const radioText = "select how many days you want in the week".toUpperCase();

    const [numKids, setNumKids] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedRadioDays, setSelectedRadioDays] = useState<number>(1);
    const [selectedRadioTime, setSelectedRadioTime] = useState<string>();
    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        validateMin();
    }, [selectedDays, selectedRadioDays]);

    const validateMin = () => {
        console.log(selectedDays)
        const minDays = selectedRadioDays; // assuming this is your minimum required days
        checkboxRefs.current.forEach((ref) => {
            if (ref) {
                if (selectedRadioDays && selectedDays.length < minDays) {
                    ref.setCustomValidity(`Please select at least ${minDays} days.`);
                }
            }
        });
    };

    const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumKids(Number(event.target.value));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        setSelectedRadioDays(value);
        setSelectedDays([]); // Uncheck all checkboxes when radio button changes
    };

    const handleRadioTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = String(event.target.value)
        setSelectedRadioTime(value);
    };

    const handleCheckboxChange = (day: any) => {
        if (selectedRadioDays === 1) {
            setSelectedDays([day]); // Only one checkbox can be checked for 1 day
        } else if (selectedRadioDays === 2) {
            if (selectedDays.includes(day)) {
                setSelectedDays(selectedDays.filter(d => d !== day)); // Uncheck if already checked
            } else if (selectedDays.length < 2) {
                setSelectedDays([...selectedDays, day]); // Check new box if less than 2 are checked
            } else {
                // Uncheck the first checked box and check the new one
                setSelectedDays([selectedDays[1], day]);
            }
        } else if (selectedRadioDays === 3) {
            if (selectedDays.includes(day)) {
                setSelectedDays(selectedDays.filter(d => d !== day)); // Uncheck if already checked
            } else {
                setSelectedDays([...selectedDays, day]); // Check any box
            }
        }        
        checkboxRefs.current.forEach((ref) => {
            if (ref) {
                if (selectedRadioDays && selectedDays.length < selectedRadioDays) {
                    ref.setCustomValidity(`Please select at least ${selectedRadioDays} days.`);
                }
            }
        });
    };


    return (
        <section id='enroll' className='mx-auto w-5/6 xxxs:pt-24 md:pt-32 pb-32 portrait:pt-28 xxxs:text-xs md:text-[_1rem]'>
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
                        Please, fill the form below
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
                            action="https://formsubmit.co/leo.dah.vinci@gmail.com"
                            method="POST"
                        >
                            {/* name */}
                            <input type="text"
                                name="name"
                                placeholder={"Name".toUpperCase()}
                                maxLength={100}
                                required
                                className={inputStyles} />

                            {/* email */}
                            <input type="email"
                                name="email"
                                placeholder={"Email".toUpperCase()}
                                maxLength={50}
                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                                required
                                className={`${inputStyles} mt-3`} />

                            {/* number of kids */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3'>
                                <div className='w-3/5 flex flex-wrap'>
                                    <label className='text-white pr-5'>{"Number of kids".toUpperCase()}</label>
                                    <input type="number"
                                        name="number_of_kids"
                                        value={numKids}
                                        min={1}
                                        max={4}
                                        required
                                        onChange={handleChildrenChange}
                                        className='appearance-none block w-16 pl-4 border rounded-md text-gray-100 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    />
                                </div>
                            </div>

                            {/* kid's age */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex'>
                                {[...Array(numKids)].map((_, index) => (

                                    <div key={index} className='inline-flex pr-4'>

                                        <label className='text-white pr-1'>
                                            {index + 1 === 1 ? '1st KID AGE' :
                                                index + 1 === 2 ? '2nd KID AGE' :
                                                    index + 1 === 3 ? '3rd KID AGE' :
                                                        `${index + 1}th KID AGE`}</label>
                                        <input
                                            type="number"
                                            name={`child_${index + 1}_age`}
                                            min={6}
                                            max={16}
                                            required
                                            className='appearance-none block w-16 pl-4 border rounded-md text-gray-250 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* num of days */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex items-center justify-between md:flex-col md:items-start'>
                                <label className='text-white pr-5 pb-2'>{radioText}</label>
                                <div className='flex basis-1/4 sm:basis-1/12 mdl:basis-1/4 lg:basis:1/2 w-fit'>
                                    {numOfDays.map(day => (
                                        <div key={day} className='flex w-[_12vw] items-center text-sm md:text-md '>
                                            <label className='text-gray-250 mx-1'>{day === 1 ? `${day} day` : `${day} days`}</label>
                                            <input
                                                name="num_of_days"
                                                type="radio"
                                                value={day}
                                                checked={selectedRadioDays === day}
                                                onChange={handleRadioChange}
                                                className='h-4 w-4 mr-3'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* days of week */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex flex-col'>
                                <label className='text-white'>{checkboxText}</label>
                                <div className='flex justify-between pt-2'>
                                    {weekDaysArr.map((day, index) => (
                                        <div key={day} className=''>
                                            <label className='text-gray-250 px-2'>{day}</label>
                                            <input
                                                name="days_of_week"
                                                type="checkbox"
                                                required
                                                value={selectedDays}
                                                checked={selectedDays.includes(day)}
                                                disabled={!selectedRadioDays}
                                                onChange={() => handleCheckboxChange(day)}
                                                ref={(el) => (checkboxRefs.current[index] = el)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* range of time */}
                            {/* <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex-col items-center'>
                                <label className='text-white mr-2 w-2/5'>{"times slots".toUpperCase()}</label>
                                <div className='w-5/6 flex items-center my-2 text-gray-250 justify-between'>
                                    {timesSlots.map((slot, index) => (
                                        <div key={index} className=' flex flex-col items-center'>
                                            <label htmlFor="startTime" className='mx-2'>{slot}</label>
                                            <input type="radio"
                                                name="time"
                                                value={slot}
                                                required
                                                checked={selectedRadioTime === slot}
                                                onChange={handleRadioTimeChange}
                                                className='h-4 w-4 mr-3'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* questions: write for user request: write for each selected day timeslot in diapason 14:00 - 19:00   */}
                            <textarea
                                className={`${inputStyles} mt-3`}
                                rows={2}
                                cols={50}
                                placeholder='Questions'
                            />

                            <button type="submit"
                                className='w-full my-5 rounded-lg bg-primary-500 text-white hover:bg-secondary-500 px-20 py-3 transition duration-500 hover:text-primary-500'>
                                ENROLL
                            </button>
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
                        <div className="w-full rounded-lg border-spacing-1 before:absolute before:-bottom-44 before:right-0
                         md:before:-bottom-40 mdl:before:-bottom-26 lg:before:-bottom-16 xl:before:bottom-10
                          md:before:right-[5%] lg:before:right-[90%] xl:before:right-[100%] before:z-[1] md:before:content-enroll">
                            <img
                                className="w-full"
                                alt="enroll-page-graphic"
                                src={EnrollGraphic}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div >

        </section >
    )
}

export default Enroll





