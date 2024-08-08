import ActionButton from "@/shared/ActionButton";
import { SelectedPage } from "@/shared/types";
import { useTranslation } from "react-i18next";


type Props = {
  id: number;
  active?: number;
  name: string;
  age: string;
  image: string;
  imageMob: string;
  gif?: string;
  mediumScreen: boolean;
  setSelectedPage: (value: SelectedPage) => void;
}


const Class = ({ active, id, name, age, image, imageMob, gif, mediumScreen, setSelectedPage }: Props) => {
  const imgAbs = `absolute z-10 bottom-16 right-24`;
  const overlayStyles = `absolute z-30 bg-primary-500 opacity-0 transition duration-500`;
  const hover = mediumScreen ? `hover:opacity-90` : active === id && `opacity-90`;
  const { t } = useTranslation();

  return (
    <div className={mediumScreen ? 'relative h-auto' :
      'relative'}>
      <p className='text-2xl bg-primary-100 rounded-t-lg text-center py-2 text-white'>{name}</p>
      <div className={`overlay ${overlayStyles} ${hover} flex justify-between items-center rounded-b-lg`}>
        <div className='overblock h-full flex text-center text-white flex-col items-center justify-between whitespace-normal py-2'>
          <p className="age font-bold">{t('age')} {age}</p>
          <p className="paragraph text-secondary-50 bg-gray-500 px-3 rounded-md">{t('price')}</p>
          <p className="paragraph">{t('time')}</p>
          <p className="paragraph">{t('classroom_capacity')}</p>
          <p className='description'>{t(`${id}_description`)}</p>
          <div className="button my-3 xl:my-5">
            <ActionButton buttonName={SelectedPage.Enroll} selectedPage={SelectedPage.Classes} setSelectedPage={setSelectedPage}>{t('enroll')}</ActionButton>
          </div>
        </div>
      </div>
      <img className="images z-1 w-full" src={mediumScreen ? image : imageMob} alt={`${name}-image`} />
      {name === 'JavaScript' ? <img id="javascript" className={`${imgAbs} w-[_20vw] md:w-[_10vw] rounded-xl`} src={gif} alt={`${name}-gif`} /> :
        name === 'Logic Lab' ? <img id="logic" className={`${imgAbs} w-[_20vw] md:w-[_10vw] rounded-xl`} src={gif} alt={`${name}-gig`} /> : <></>}
    </div>
  )
}

export default Class;