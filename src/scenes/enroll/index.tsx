import { SelectedPage, QueryWidth } from '@/shared/types';
import EnrollGraphic from "@/assets/enroll-img.png";
import EnrollGraphicMob from "@/assets/mobile/enroll-img.png";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import { useState, useRef } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import storage from '@/firebaseconfig';
import "./enroll.css";
import useMediaQuery from '@/hooks/useMediaQuery';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Enroll = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MediumWidth);
    const weekDaysArr = ['SUNDAY', 'TUESDAY', 'WEDNESDAY'];
    const numOfDays = [1, 2, 3];
    const timesSlots = ["14:00 - 15:00", "15:15 - 16:15", "16:30 - 17:30", "17:45 - 18:45"];
    const classes = [{ key8: 'SCRATCH' }, { key10: 'PYTHON' }, { key12: 'JAVASCRIPT' }, { key0: 'LOGIC LAB' }];
    const inputStyles = `w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`
    const checkboxText = "select your preferred days of the week".toUpperCase();
    const radioText = "how many days you want in the week".toUpperCase();

    const [numKids, setNumKids] = useState<number>(1);
    const [selectedRadioDays, setSelectedRadioDays] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
    const classesRef = useRef<(HTMLInputElement | null)[]>([]);
    const valueRef = useRef<HTMLInputElement | null>();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        classesRef.current.forEach((ref) => {            
            if (ref) {
                const minAge = ref.id.replace('key','');
                if (value < parseInt(minAge)) {
                    ref.disabled = true;
                    ref.checked = false;
                } else {
                   ref.disabled = false;
                }
            }
        });
    };

    const validateMin = (value: number = 0, weekDays: string[] = []) => {
        const minDays = value === 0 ? selectedRadioDays : value;
        const days = weekDays[0] ? weekDays.length : selectedDays.length;
        const varning = minDays === 1 ? `Please select at least 1 day.` : `Please select at least 2 days.`
        checkboxRefs.current.forEach((ref) => {
            if (ref) {
                if (days < minDays && minDays < 3) {
                    ref.setCustomValidity(varning);
                    minDays === 2 && ref.reportValidity();
                } else {
                    ref.setCustomValidity('');
                }
            }
        });
    };

    const validateMax = (num: number) => {
        const maxNum = 6;
        if (num > maxNum) {
            valueRef.current?.setCustomValidity('MAXIMUM NUMBER OF KIDS IS 6');
            valueRef.current?.reportValidity();
        } else {
            valueRef.current?.setCustomValidity('');
        }
    }

    const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumKids(Number(event.target.value));
        validateMax(Number(event.target.value));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        setSelectedRadioDays(value);
        validateMin(value);
        if (value === weekDaysArr.length) {
            setSelectedDays([...weekDaysArr]);
        } else {
            setSelectedDays([]);
        }
    };


    const handleCheckboxChange = (day: string) => {
        let weekDays: string[] = [];

        if (selectedRadioDays === 1) {
            weekDays = [day];
            setSelectedDays(weekDays);
            // Only one checkbox can be checked for 1 day
        } else if (selectedRadioDays === 2) {
            if (selectedDays.includes(day)) {
                weekDays = selectedDays.filter(d => d !== day);
                setSelectedDays(weekDays);
                // Uncheck if already checked
            } else if (selectedDays.length < 2) {
                weekDays = [...selectedDays, day];
                setSelectedDays(weekDays);
                // Check new box if less than 2 are checked
            } else {
                // Uncheck the first checked box and check the new one
                weekDays = [selectedDays[1], day];
                setSelectedDays(weekDays);
            }
        }
        validateMin(0, weekDays);
    };


    const handleButtonClick = async () => {
        validateMin();

        const form = formRef.current;
        if (form && form.checkValidity()) {

            setIsSubmitting(true);
            setIsSubmitted(false);

            const formData = new FormData(form);
            const formObject: { [key: string]: any } = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const formDataString = Object.entries(formObject)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');

            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };

            const currentDate = new Date().toLocaleDateString('en-US', options);
            const blob = new Blob([formDataString], { type: 'text/plain' });
            const userDate = currentDate.replace(/\//g, "-");
            const fileRef = ref(storage, `form-data/${userDate}_${formObject?.email}.txt`);
            try {
                await uploadBytes(fileRef, blob);
                setIsSubmitting(false);
                setIsSubmitted(true);

                form.reset();
                setSelectedDays([]);
                setSelectedRadioDays(1);
                setNumKids(1);

                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            } catch (error) {
                console.error("Error uploading file:", error);
                setIsSubmitting(false);
            }
        } else {
            form?.reportValidity();
        }
    };

    return (
        <section id='enroll' className='mx-auto w-5/6 pt-[5vw] xxs:pt-[100px]'>
            {/* className='mx-auto w-5/6 xxxs:pt-24 md:pt-32 pb-32 portrait:pt-28 xxxs:text-xs md:text-[_1rem] */}
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

                </motion.div>
                <p className="mt-10">
                    Please, fill the form below
                </p>
                <div className="enroll justify-between gap-8 md:flex">
                    <motion.div
                        className='basis-3/5 md:mt-0 z-[5]'
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
                            ref={formRef}
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
                                <div className='kids inline-flex justify-between'>
                                    <label className='text-white pr-5'>{"Number of kids".toUpperCase()}</label>
                                    <input type="number"
                                        name="number_of_kids"
                                        value={numKids || ''}
                                        defaultValue={1}
                                        min={1}
                                        max={6}
                                        required
                                        onChange={handleChildrenChange}
                                        ref={(el) => (valueRef.current = el)}
                                        className='appearance-none w-11 block pl-4 border rounded-md text-gray-100 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    />
                                </div>
                            </div>

                            {/* kid's age */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3'>
                                <p className='text-white pr-2'>KID's AGE AND CLASS</p>
                                <div className="kidparent items-center">
                                    {[...Array(numKids)].map((_, index) => (
                                        index + 1 <= 6 &&
                                        <div key={index} className='kid flex justify-between gap-1 my-2 px-3'>
                                            <div className='kidage flex justify-between h-fit'>
                                                <label >
                                                    {index + 1 === 1 ? '1st KID' :
                                                        index + 1 === 2 ? '2nd KID' :
                                                            index + 1 === 3 ? '3rd KID' : `${index + 1}th KID`}
                                                </label>
                                                <input
                                                        type="number"
                                                        name={`child_${index + 1}_age`}
                                                        defaultValue={6}
                                                        min={6}
                                                        max={16}
                                                        required
                                                        onChange={handleAgeChange}
                                                        className='appearance-none block w-11 pl-4 border rounded-md text-gray-250 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                                />
                                            </div>
                                            <div className='classes'>
                                                {classes.map((item, indx) => (
                                                    <div key={`${index}-${Object.values(item)}`} className='child-classes w-full'>
                                                        <label>{Object.values(item)}</label>
                                                        <input
                                                            type='checkbox'
                                                            id={`${Object.keys(item)}`}
                                                            name={`${Object.values(item)}_child_${index + 1}`}
                                                            disabled={Object.values(item).toString() !== 'LOGIC LAB' ? true : false}
                                                        
                                                            // value={`child_${index + 1} - ${classesRef.current[indx]?.value}`}
                                                            // value = {kidRef.current[index]?.name}
                                                            ref={(el) => (classesRef.current[indx] = el)}
                                                        />

                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* num of days */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex-col'>
                                <p className='text-white'>{radioText}</p>
                                <div className='daysparent w-full flex py-1 flex-wrap justify-between'>
                                    {numOfDays.map(day => (
                                        <div key={day} className='days inline-flex justify-between md:text-md items-center'>
                                            <label className='text-gray-250 mx-1'>{day === 1 ? `${day} DAY` : `${day} DAYS`}</label>
                                            <input
                                                name="num_of_days"
                                                type="radio"
                                                value={day}
                                                checked={selectedRadioDays === day}
                                                onChange={handleRadioChange}
                                                className='h-[_18px] w-[_18px]'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* days of week */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex-col'>
                                <p className='text-white'>{checkboxText}</p>
                                <div className='week w-full flex py-1 md:gap-1 justify-between'>
                                    {weekDaysArr.map((day, index) => (
                                        <div key={day} className='weekday inline-flex justify-between items-center'>
                                            <label className='text-gray-250'>{day}</label>
                                            <input
                                                name="days_of_week"
                                                type="checkbox"
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
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3 flex-col items-center'>
                                <p className='text-white mr-2 w-2/5'>{"times slots".toUpperCase()}</p>
                                {selectedDays.map((day, index) => (
                                    <div className="mt-3" key={index}>
                                        <p>{day}</p>
                                        <div className='time flex items-center my-1 text-gray-250 justify-between'>
                                            {timesSlots.map((slot, index) => (
                                                <div key={index} className='timeslot flex flex-col items-center'>
                                                    <label className='sm:left-0 mx-2'>
                                                        {slot.split(' ').map((item, index) => (
                                                            <div key={index}>{item}</div>
                                                        ))}
                                                    </label>
                                                    <input type="radio"
                                                        name={`${day}_time`}
                                                        value={slot}
                                                        required
                                                        className='h-4 w-4 mt-1'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <textarea
                                className={`${inputStyles} mt-3`}
                                name='Questions'
                                rows={3}
                                cols={50}
                                placeholder='Questions'
                            />

                            <div className='button mt-1 w-full text-primary-500 items-center font-montserrat'>
                                {!isSubmitting && !isSubmitted && (
                                    <button type="submit"
                                        onClick={handleButtonClick}
                                        className='w-full rounded-lg bg-primary-500 text-white hover:bg-secondary-500 px-20 py-3 transition duration-500 hover:text-primary-500'>
                                        ENROLL
                                    </button>
                                )}
                                {isSubmitting && <p className='text-lg text-primary-500 font-bold'>In process...</p>}
                                {isSubmitted && <p className='text-lg text-primary-500 font-bold'>Thanks for enrolling!</p>}
                            </div>
                        </form>
                        {/* End Form */}

                    </motion.div>

                    <motion.div
                        className="image relative basis-2/5 md:mt-0"
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
                         md:before:-bottom-8 mdl:before:-bottom-5 xl:before:-bottom-2
                          md:before:right-[-30px] xl:before:right-[100%] before:z-[1] md:before:content-enroll mdl:before:content-enrollmd">
                            <img
                                className="w-full"
                                alt="enroll-page-graphic"
                                src={isAboveMediumScreens ? EnrollGraphic : EnrollGraphicMob}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div >

        </section >
    )
}

export default Enroll;