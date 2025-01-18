import Link from 'next/link'

const ProductsOfferArea = () => {
    return (
        <section className="bg-cover bg-center z-10 bg-img bg-influerncer py-[12rem] bg-no-repeat">
            <div className="w-full  mx-auto px-6  lg:pl-36 lg:pr-1">
                <div className="max-w-xl border-solid border-luz border-8 text-center py-16 px-10 relative z-[1] before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 before:bg-luz before:z-[-1] before:m-3">
                    <h2 className="text-4xl font-bold mt-0 mb-2  font-['Poppins']"> No lo pienses más y se parte de la mejor escuela de uñas de México.</h2>
                    <p className="mb-6 text-xl text-[#222] leading-normal  font-['Poppins']">Regístrate en nuestra academia de cursos online y adquiere más conocimiento.</p>
                    <Link href="https://wapizima.com.mx">
                        <a target="_blank" className="bg-wapicolor-600 text-luz px-8 py-3 uppercase  font-['Poppins']  transition duration-700 ease-in-out cursor-pointer">Registrate</a>
                    </Link>
                </div>
            </div>
        </section>
    );
};
 export default ProductsOfferArea;