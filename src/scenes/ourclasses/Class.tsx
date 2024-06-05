type Props = {
    name: string;
    description?: string;
    image: string;
    mediumScreen: boolean;
}

const Class = ({ name, description, image, mediumScreen }: Props) => {
    const overlayStyles = `p-5 absolute z-30 flex h-[420px] w-[450px] flex-col
    items-center justify-center whitespace-normal bg-primary-500 text-center
    text-white opacity-0 transition duration-500 hover:opacity-90`;

    const imgAfter = `after:b`

    return (
        <li className={mediumScreen ? 'relative mx-5 inline-block h-[420px] w-[450px]' :
            'relative m-8 items-center w-fit h-fit'}>
            <div className={`${overlayStyles} sm:w-full sm:h-full`}>
              <p className='text-2xl'>{name}</p>
              <p className='mt-4'>{description}</p>
            </div>
            <div className={name === 'JavaScript' ?
                `after:absolute after:-z-15 after:bottom-16 after:right-10 after:bg-javascript after:bg-cover
                 md:after:w-[150px] md:after:h-[150px] after:max-w-[200px] after:max-h-[200px] after:rounded-[30px]`
                    : ''}>
            <img className="z-1" src={image} alt={`${name}-image`} />
                </div>
        </li>
  )
}

export default Class;