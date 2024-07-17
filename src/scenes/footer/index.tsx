import Logo from '@/assets/Logo-mini.png';
import Icon from '@/assets/icons/whatsapp.png';
import { FooterType } from '@/shared/types';
import { useTranslation } from 'react-i18next';

const images: Array<FooterType> = [
    { title: 'Image by freepik', href: 'https://www.freepik.com/' },
    { title: 'Image by starline on Freepik', href: 'https://www.freepik.com/free-vector/white-digital-matrix-binary-code-numbers-background_8289982.htm#query=binary&position=4&from_view=author&uuid=e0edc815-cee6-4f6f-beed-bbaf6a505cfa' },
    { title: 'Image by pressfoto on Freepik', href: 'https://www.freepik.com/free-photo/friends-watching-funny-video-laptop_863132.htm' },
    { title: 'Whatsapp icons created by Aldo Cervantes-Flaticon', href: 'https://www.flaticon.com/free-icons/whatsapp' },
];

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className='footer bg-primary-100 py-10'>
            <div className='justify-content mx-auto w-5/6 gap-16 flex-col'>
                <div className='mt-16 md:mt-0 '>
                    <div className='max-w-[40px] flex items-baseline'>
                        <img src={Logo} alt="logo" />
                        <p className='mx-2 font-bold'>KIDCODIA</p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between md:items-center gap-5'>
                        <p className='mt-2 mb-10'>
                            {t('footer_one')}
                            <br />
                            {t('footer_two')}
                            <br />
                            {t('footer_three')}
                        </p>
                        <div className='w-fit'>
                            <p className='text-nowrap'>{t('contact').toUpperCase()}</p>                             
                            <p className='flex'><img className='pr-1' src={Icon} alt='whatsapp-icon' /> +972-58-779-07-25</p>                            
                        </div>    
                    </div>
                </div>
                <div className='imglinks mt-10 gap-x-3 md:mt-0 text-dxs text-gray-100 flex align-bottom justify-between'>
                    <div className='w-fit'>Icons made by <a href="https://www.flaticon.com/authors/iconbaandar" title="IconBaandar"> IconBaandar </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    <div className='w-fit'>Icons made by <a href="https://www.flaticon.com/authors/gravisio" title="gravisio"> gravisio </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    {images.map((item: FooterType, index) => (
                        <div key={index} className='w-fit'>
                            <a href={item.href}>{item.title}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer