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

  const imgAbs = `absolute z-10 bottom-16 right-24`;
  const overlayStyles = `absolute z-30 bg-primary-500 opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <div className={mediumScreen ? 'relative h-auto' :
      'relative'}>
      <p className='text-2xl bg-primary-100 rounded-t-lg text-center py-2 text-white'>{name}</p>
      <div className={`overlay ${overlayStyles} h-[_90%] flex justify-between items-center rounded-b-lg`}>
        <div className='overblock h-full flex text-center text-white flex-col items-center justify-between whitespace-normal py-2'>
          <p className="font-bold">{age}</p>
          <div className="text flex justify-between flex-col">
            <p className='description'>{description}</p>
            <p className="paragraph">1 hour per session</p>
            <p className="paragraph">80 NIS per session</p>
            <p className="paragraph">Up to 6 kids in a group</p>
          </div>
          <ActionButton selectedPage={SelectedPage.Classes} setSelectedPage={setSelectedPage}>Enroll</ActionButton>
        </div>
      </div>
      <img className="images z-1" src={image} alt={`${name}-image`} />
      {name === 'JavaScript' ? <img id="javascript" className={`${imgAbs} w-[_20vw] md:w-[_10vw] rounded-xl`} src={gif} alt={`${name}-gif`} /> :
        name === 'Logic Lab' ? <img id="logic" className={`${imgAbs} w-[_20vw] md:w-[_10vw] rounded-xl`} src={gif} alt={`${name}-gig`} /> : <></>}
    </div>
  )
}

export default Class;