import ActionButton from "@/shared/ActionButton";
import { SelectedPage } from "@/shared/types";


type Props = {
  name: string;
  age: string;
  description?: string;
  image: string;
  gif?: string;
  mediumScreen: boolean;
  setSelectedPage: (value: SelectedPage) => void;
}


const Class = ({ name, age, description, image, gif, mediumScreen, setSelectedPage }: Props) => {

  const imgAbs = `absolute z-10 bottom-16 right-24 xxxs:bottom-8 xxxs:right-8 xs:bottom-14 xs:right-14`;
  const overlayStyles = `xxxs:px-5 px-10 absolute z-30 bg-primary-500
    opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <div className={mediumScreen ? 'relative' :
      'relative mx-8 my-2 w-fit h-fit'}>
      <p className='text-2xl bg-primary-100 rounded-t-lg text-center py-2 text-white'>{name}</p>
      <div className={`${overlayStyles} h-[_67vw] md:h-[_32vw] lg:h-[_35vw] flex justify-between items-center rounded-b-lg`}>
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
      <img className="z-1" src={image} alt={`${name}-image`} />
      {name === 'JavaScript' ? <img className={`${imgAbs} w-[_20vw] md:w-[_10vw] rounded-xl`} src={gif} alt={`${name}-gif`} /> :
        name === 'Logic Lab' ? <img className={`${imgAbs} w-[_20vw] md:w-[_10vw] rounded-xl`} src={gif} alt={`${name}-gig`} /> : <></>}
    </div>
  )
}

export default Class;