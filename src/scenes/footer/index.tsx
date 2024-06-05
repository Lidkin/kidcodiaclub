import Logo from '@/assets/Logo-mini.png'

const images = [
    <a href="https://www.freepik.com/">Image by freepik</a>,
    <a href="https://www.freepik.com/free-vector/white-digital-matrix-binary-code-numbers-background_8289982.htm#query=binary&position=4&from_view=author&uuid=e0edc815-cee6-4f6f-beed-bbaf6a505cfa">Image by starline on Freepik</a>,
    <a href="https://www.freepik.com/free-photo/friends-watching-funny-video-laptop_863132.htm">Image by pressfoto on Freepik</a>
]

const Footer = () => {

    return (
        <div className='bg-primary-100 py-16'>
            <div className='justify-content mx-auto w-5/6 gap-16 md:flex'>
                <div className='mt-16 basis-1/2 md:mt-0 '>
                    <div className='max-w-[40px] flex items-baseline'>
                        <img src={Logo} alt="logo" />
                        <p className='mx-2 font-bold'>KIDCODIA</p>
                    </div>
                    <p className='my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloribus at corrupti unde temporibus dignissimos fuga a laudantium neque,
                        nisi veritatis ut labore nostrum. Doloribus magni tempora nemo nisi possimus cum.</p>
                    <p>&copy; Kidcodia All Rights Rserved.</p>
                </div>
                <div className='mt-16 basis-1/4 mad:mt-0'>
                    <h4 className='font-bold'>Links</h4>
                    <div className='my-5'> Icons made by <a href="https://www.flaticon.com/authors/iconbaandar" title="IconBaandar"> IconBaandar </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    <div className='mt-5'> Icons made by <a href="https://www.flaticon.com/authors/gravisio" title="gravisio"> gravisio </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    <div className='mt-5'></div>
                    {images.map((link, index) => (
                        <div key={index} className='mt-5'>{link}</div>
                    ))}

                </div>
                <div className='mt-16 basis-1/4 mad:mt-0'>
                    <h4 className='font-bold'>Contact Us</h4>
                    <p className='my-5'>(058) 779-07-25</p>
                    <p className='my-5'>Lidia Khait</p>
                </div>
            </div>

        </div>
    )
}

export default Footer