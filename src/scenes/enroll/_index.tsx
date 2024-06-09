import { SelectedPage } from '@/shared/types';
import EnrollGraphic from "@/assets/enroll-img.png";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from 'react';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

type FormFields = {
    name: string;
    email: string;
    questions: string;
    weekdays: string[];
    days: string;
    age: number[];
}


const Enroll = ({ setSelectedPage }: Props) => {
    const inputStyles = `mt-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-gray-20`
    const labelText = "select your preferred days of the week".toUpperCase();
    const radioText = "select how many days you want in the week".toUpperCase();
    const [disabledCheckBox, setDisabledCheckBox] = useState(true);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [numberOfChildren, setNumberOfChildren] = useState(1);
    // const weekdaysArr: string[] = [];

    const {
        register,
        resetField,
        getValues,
        handleSubmit,
        trigger,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormFields>();

    const onSubmit = async (e: any) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset])

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const days = parseInt(e.target.value);
        //const weekdaysArr = weekDays;
        console.log(weekDays)
        !isNaN(days) && resetCheckboxFields(days)
    }

    const resetCheckboxFields = (days: any) => {
        console.log(weekDays, days)
        if (weekDays && days) {
            const disabled = weekDays?.length <= days ? true : false;
            setDisabledCheckBox(disabled);
        }
    };


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        const isValidValue = weekDays.every((item) => item !== value);
        console.log(isValidValue, isChecked)
        if (isChecked && isValidValue) {
            console.log(weekDays)
            setWeekDays([...weekDays, value]);
            const days = getValues('days');
            resetCheckboxFields(days);
        }
    }

    const handleNumberOfChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        setNumberOfChildren(newValue);
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
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* NAME */}
                            <input
                                className={`${inputStyles} md:mt-0`}
                                type="text"
                                placeholder='NAME'
                                {...register("name", {
                                    required: true,
                                    maxLength: 100,
                                })} />
                            {errors.name && (
                                <p className='mt-1 text-primary-500'>
                                    {errors.name.type === "required" && "This field is required."}
                                    {errors.name.type === "maxLength" && "Max length is 100 char."}
                                </p>
                            )}

                            {/* EMAIL */}
                            <input
                                className={inputStyles}
                                type="email"
                                placeholder='EMAIL'
                                {...register("email", {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })} />
                            {errors.email && (
                                <p className='mt-1 text-primary-500'>
                                    {errors.email.type === "required" && "This field is required."}
                                    {errors.email.type === "pattern" && "Invalid email address."}
                                </p>
                            )}

                            {/* nimber of kids */}
                            <div>
                                <label>Number of Children:</label>
                                <input type="number" value={numberOfChildren} onChange={handleNumberOfChildrenChange} />
                            </div>
                            
                            {/* KID AGE */}
                            <input
                                className={inputStyles}
                                type="number"
                                placeholder='CHILD`S AGE'
                                {...register("age", {
                                    required: true,
                                    max: 16,
                                    min: 6
                                })} />
                            {numberOfChildren > 1 && (
                                <div>
                                    {[...Array(numberOfChildren - 1)].map((_, index) => (
                                        <div key={index}>
                                            <label>Child {index + 2}'s Age:</label>
                                            <input type="number" {...register(`age.${index + 2}`, {required: true, min: 6, max: 16})} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {errors.age && (
                                <p className='mt-1 text-primary-500'>
                                    {errors.age.type === "required" && "This field is required."}
                                    {errors.age.type === "min" && "The minimum age of the child is 6 years."}
                                    {errors.age.type === "max" && "The maximum age of the child is 16 years."}
                                </p>
                            )}

                            {/* DAYS */}
                            <div className='mt-5'>
                                <p className='my-1 text-primary-500 font-bold'>{radioText}</p>
                                <div className='w-full flex justify-between rounded-lg bg-primary-300 pl-5 pr-24 py-3 text-gray-20'>
                                    <label htmlFor="one">ONE
                                        <input
                                            id='one'
                                            className="mx-2"
                                            {...register("days", { required: true })}
                                            type='radio'
                                            value="1"
                                            title='1'
                                            onChange={handleRadioChange}
                                        />
                                    </label>
                                    <label htmlFor="two">TWO
                                        <input
                                            className="mx-2"
                                            id='two'
                                            {...register("days", { required: true })}
                                            type='radio'
                                            value="2"
                                            onChange={handleRadioChange}
                                        />
                                    </label>
                                    <label htmlFor="three">THREE
                                        <input
                                            className="mx-2"
                                            id='three'
                                            {...register("days", { required: true })}
                                            type='radio'
                                            value="3"
                                            onChange={handleRadioChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* DAYS OF WEEK */}
                            <div className='mt-5'>
                                <p className='my-1 text-primary-500 font-bold'>{labelText}</p>
                                <div className='w-full flex justify-between rounded-lg bg-primary-300 pl-5 pr-24 py-3 text-gray-20'>
                                    <label htmlFor="sunday">SUNDAY
                                        <input
                                            className='ml-2'
                                            id='sunday'
                                            type="checkbox"
                                            value="sunday"
                                            {...register("weekdays")}
                                            onChange={handleCheckboxChange}
                                            disabled={!disabledCheckBox} />
                                    </label>
                                    <label htmlFor="tuesday">TUESDAY
                                        <input
                                            className='ml-2'
                                            id='tuesday'
                                            type="checkbox"
                                            value="tuesday"
                                            {...register("weekdays")}
                                            onChange={handleCheckboxChange}
                                            disabled={!disabledCheckBox} />
                                    </label>
                                    <label htmlFor="wednesday">WEDNESDAY
                                        <input
                                            className='ml-2'
                                            id='wednesday'
                                            type="checkbox"
                                            value="wednesday"
                                            {...register("weekdays")}
                                            onChange={handleCheckboxChange}
                                            disabled={!disabledCheckBox} />
                                    </label>
                                </div>
                            </div>

                            {/* QUESTIONS */}
                            <textarea
                                className={inputStyles}
                                rows={4}
                                cols={50}
                                placeholder='Questions'
                                {...register("questions", {
                                    maxLength: 2000,
                                })} />
                            {errors.questions && (
                                <p className='mt-1 text-primary-500'>
                                    {errors.questions.type === "maxLength" && "Max length is 2000 char."}
                                </p>
                            )}
                            <button
                                type='submit'
                                className='w-full my-5 rounded-lg bg-primary-500 text-white hover:bg-secondary-500 px-20 py-3 transition duration-500 hover:text-primary-500'
                            >
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