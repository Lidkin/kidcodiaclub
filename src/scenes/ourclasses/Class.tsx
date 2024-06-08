import ActionButton from "@/shared/ActionButton";
import { SelectedPage } from "@/shared/types";

type Props = {
  name: string;
  age: string;
  description?: string;
  image: string;
  mediumScreen: boolean;
  setSelectedPage: (value: SelectedPage) => void;
}


const Class = ({ name, age, description, image, mediumScreen, setSelectedPage }: Props) => {
  const afterStyle = `after:absolute after:-z-15 after:bg-cover after:rounded-2xl
    after:w-[250px] after:h-[250px]
    xxxs:after:max-w-[80px] xxxs:after:max-h-[80px]
    xxs:after:max-w-[120px] xxs:after:max-h-[120px]
    xs:after:max-w-[160px] xs:after:max-h-[160px]
    sm:after:max-w-[200px] sm:after:max-h-[200px]
    md:after:max-w-[120px] md:after:max-h-[120px]
    lg:after:max-w-[170px] lg:after:max-h-[170px]
    xl:after:max-w-[200px] xl:after:max-h-[200px]
    xxl:after:max-w-[250px] xxl:after:max-h-[250px] xxl:after:rounded-[_20%]`;

  const overlayStyles = `xxxs:px-5 px-10 absolute z-30 bg-primary-500
    opacity-0 transition duration-500 hover:opacity-90`;
  console.log(window.innerWidth)

  return (
    <div className={mediumScreen ? 'relative' :
      'relative mx-8 my-2 w-fit h-fit'}>
      <p className='text-2xl bg-primary-100 rounded-t-lg text-center py-2 text-white mt-10'>{name}</p>
      <div className={`${overlayStyles} h-[_70vw] md:h-[_37vw] flex justify-between items-center rounded-b-lg`}>
        <div className='h-fit flex text-center text-white xxxs:text-pxs xs:text-base flex-col items-center justify-between whitespace-normal py-2'>
          <p className="md:text-xl font-bold">{age}</p>
          <div className="flex justify-between flex-col h-full my-[_1vw]">
            <p className='text-dxs xs:text-sm mt-2'>{description}</p>
            <p className="mt-2">1 hour per session</p>
            <p className="mt-2">Cost 80 NIS per lesson</p>
            <p className="mt-2">Maximum 6 kids in a group</p>
          </div>
            <ActionButton selectedPage={SelectedPage.Classes} setSelectedPage={setSelectedPage}>Enroll</ActionButton>
        </div>
      </div>
      <div className={name === 'JavaScript' ?
        `${afterStyle} after:bg-javascript
          xxxs:after:bottom-10 xxxs:after:right-6 
          xxs:after:bottom-16 xxs:after:right-6 
          xs:after:bottom-20 xs:after:right-12
          sm:after:bottom-28 sm:after:right-18
          md:after:bottom-16 md:after:right-12
          lg:after:bottom-16 lg:after:right-24
          xl:after:bottom-16 xl:after:right-24
          xxl:after:bottom-18 xxl:after:right-18
        ` : name === 'Logic' ? `${afterStyle} after:bg-logic 
          xxxs:after:bottom-10 xxxs:after:right-8 
          xxs:after:bottom-12 xxs:after:right-16 
          xs:after:bottom-20 xs:after:right-16
          sm:after:bottom-24 sm:after:right-24
          md:after:bottom-20 md:after:right-12
          lg:after:bottom-24 lg:after:right-24
          xl:after:bottom-36 xl:after:right-24
          xxl:after:bottom-18 xxl:after:right-18
        ` : ''}>
        <img className="z-1" src={image} alt={`${name}-image`} />
      </div>
    </div>
  )
}

export default Class;