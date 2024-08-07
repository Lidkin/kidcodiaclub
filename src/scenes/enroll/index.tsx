import { SelectedPage, QueryWidth } from '@/shared/types';
import EnrollGraphic from "@/assets/enroll-img.png";
import EnrollGraphicMob from "@/assets/mobile/enroll-img.png";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import { useState, useRef } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebaseconfig';
import './enroll.css';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Enroll = ({ setSelectedPage }: Props) => {
    const { t, i18n: { language } } = useTranslation();
    const isAboveMediumScreens = useMediaQuery(QueryWidth.MediumWidth);
    const weekDaysArr = t('weekdays').split(',');
    const numOfDays = [1, 2, 3];
    const timesSlots = ["14:00 - 15:00", "15:15 - 16:15", "16:30 - 17:30", "17:45 - 18:45"];
    const classes = [{ key8: 'SCRATCH' }, { key10: 'PYTHON' }, { key12: 'JAVASCRIPT' }, { key0: 'LOGIC LAB' }];
    const inputStyles = `w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`
    const checkboxText = t('form_days').toUpperCase();
    const radioText = t('form_num_days').toUpperCase();

    const [numKids, setNumKids] = useState<number>(1);
    const [selectedRadioDays, setSelectedRadioDays] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [ages, setAges] = useState<number[]>(new Array(numKids).fill(6));
    const classesRef = useRef<Array<Array<HTMLInputElement | null>>>([]);
    const valueRef = useRef<HTMLInputElement | null>();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseInt(event.target.value);

        setAges(prevAges => {
            const newAges = [...prevAges];
            newAges[index] = value;
            return newAges;
        });

        if (classesRef.current[index]) {
            classesRef.current[index].forEach((ref) => {
                if (ref) {
                    const minAge = ref.id.replace('key', '');
                    if (value < parseInt(minAge)) {
                        ref.disabled = true;
                        ref.checked = false;
                    } else {
                        ref.disabled = false;
                    }
                }
            });
        }
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
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Enroll)}>
                <motion.div
                    className='md:w-3/5'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.1 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <Htext>
                        <span className='text-primary-500'>{t('enroll')} </span> {t('for')}
                    </Htext>

                </motion.div>
                <p className="mt-10">
                    {t('fill_form')}
                </p>
                <div className="enroll justify-between gap-8 md:flex">
                    <motion.div
                        className='basis-3/5 md:mt-0 z-[5]'
                        initial={`${isAboveMediumScreens} ? hidden : visible`}
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
                                placeholder={t('form_name').toUpperCase()}
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

                            {/* phone */}
                            <input type="tel"
                                name="tel"
                                placeholder={t('form_phone').toUpperCase()}
                                maxLength={12}
                                className={`${inputStyles} mt-3`} />


                            {/* number of kids */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 px-5 py-3'>
                                <div className={`kids flex justify-between items-center ${language === 'ru' && 'w-[100%]'}`}>
                                    <label className='text-white pr-5'>{t('form_num_kids').toUpperCase()}</label>
                                    <input type="number"
                                        name="number_of_kids"
                                        value={numKids || ''}
                                        defaultValue={1}
                                        min={1}
                                        max={6}
                                        required
                                        onChange={handleChildrenChange}
                                        ref={(el) => (valueRef.current = el)}
                                        className='appearance-none text-center text-[16px] w-14 h-fit py-[1px] block md:pl-4 border rounded-md text-gray-250 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    />
                                </div>
                            </div>

                            {/* kid's info and classes */}
                            <div className='mt-3 w-full rounded-lg bg-primary-300 md:px-5 py-3'>
                                <p className='text-white px-5'>{language === 'ru' ? t('form_age_classes').toUpperCase() : t('form_age_classes')}</p>
                                <div className="kidparent items-center gap-2">
                                    {[...Array(numKids)].map((_, index) => (
                                        index + 1 <= 6 &&
                                        <div key={index} className='justify-between items-center flex flex-col xxs:flex-row m-2 xl:px-3 w-full border-2 rounded-lg'>
                                            <div className='kidNameAge m-2 w-[90%] xxs:w-full'>
                                                <p className='text-center text-gray-250'>{t('kids').split(',')[index]}</p>
                                                <div className='kid flex-col w-full px-2'>
                                                    {/* kid's age */}
                                                    <div className='kidage flex flex-row w-full text-[1rem] mb-1 items-center'>
                                                        <label className='text-gray-250'>{t('form_age')}</label>
                                                        <input
                                                            type="number"
                                                            name={`child_${index + 1}_age`}
                                                            defaultValue={6}
                                                            value={ages[index]}
                                                            min={6}
                                                            max={16}
                                                            required
                                                            onChange={(event) => handleAgeChange(event, index)}
                                                            className='appearance-none block text-center text-[16px] w-14 h-fit py-[1px] md:pl-4 border rounded-md text-gray-250 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                                        />
                                                    </div>
                                                    {/* kid's name */}
                                                    <div className='flex w-full flex-row justify-between items-center text-[1rem]'>
                                                        <label className='text-left xs:text-nowrap pr-2 text-gray-250'>{t('form_kid_name')}</label>
                                                        <input type="text"
                                                            name="name_of_kid"
                                                            maxLength={100}
                                                            className='appearance-none justify-center w-full xs:w-[16vw] h-fit block py-1 px-2 border rounded-md text-gray-250 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* classes */}
                                            <div className='classes-name'>
                                                {classes.map((item, indx) => (
                                                    <div key={`${index}-${Object.values(item)}`} className='child-classes w-full text-gray-250'>
                                                        <label className='text-center'>{Object.values(item)}</label>
                                                        <input
                                                            type='checkbox'
                                                            id={`${Object.keys(item)}`}
                                                            name={`${Object.values(item)}_child_${index + 1}`}
                                                            disabled={Object.values(item).toString() !== 'LOGIC LAB' ? true : false}
                                                            ref={(el) => {
                                                                if (!classesRef.current[index]) {
                                                                    classesRef.current[index] = [];
                                                                }
                                                                classesRef.current[index][indx] = el;
                                                            }}
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
                                        <div key={day} className='days flex justify-between md:text-md items-center'>
                                            <label className='text-gray-250 mx-1 text-center xxs:text-nowrap'>{day === 1 ? day + ' ' + t('days').split(',')[0].toUpperCase() : day + ' ' + t('days').split(',')[1].toUpperCase()}</label>
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
                                        <div key={day} className='weekday xxs:w-fit px-3 flex justify-between items-center'>
                                            <label className='text-gray-250 xs:landscape:pr-3'>{day}</label>
                                            <input
                                                className='mb-1'
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
                                <p className='text-white mr-2'>{t('form_times').toUpperCase()}</p>
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
                                placeholder={t('form_questions')}
                            />

                            <div className='button mt-1 w-full text-primary-500 items-center font-montserrat'>
                                {!isSubmitting && !isSubmitted && (
                                    <button type="submit"
                                        onClick={handleButtonClick}
                                        className='w-full rounded-lg bg-primary-500 text-white hover:bg-secondary-500 px-20 py-3 transition duration-500 hover:text-primary-500'>
                                        {t('enroll')}
                                    </button>
                                )}
                                {isSubmitting && <p className='text-lg text-primary-500 font-bold'>{t('process')}</p>}
                                {isSubmitted && <p className='text-lg text-primary-500 font-bold'>{t('thanks')}</p>}
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