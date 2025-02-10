import Link from 'next/link';
import Image from 'next/image';

const InfoItem = ({ title, text, image }) => {
    return (
        <div className="my-10 md:my-4 w-full   ">
            {/* <div className="flex items-center">
                <div className="border-[#e91e63] rounded-lg  mx-4 shadow-lg shadow-[#e91e63] flex justify-center items-center">
                    <Image
                        src={image}
                        alt="distribuidor"
                        width={180}
                        height={150}
                    />
                </div>
                <div className="lg:w-8/12">
                    <h3 className="md:text-3xl font-bold uppercase text-lg">
                        {title}
                    </h3>
                    <div className="mt-8 text-gray-500">
                        {text}
                    </div>
                </div>
            </div> */}
         <div className=" max-w-md mx-auto  md:mx-4 lg:mx-auto   ">
                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square border border-b-4 border-r-4 border-wapicolor-600">
                    {/* Imagen de fondo con baja opacidad */}
                    <Image
                    src={image || "/placeholder.svg?height=300&width=400"}
                    alt="distribuidor"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-10"
                    />

                    {/* Contenido de la tarjeta */}
                    <div className="relative h-full p-4 flex flex-col  justify-center ">
                        <div className='mb-4'>
                            <h2 className="text-2xl font-bold  text-pink-600 uppercase">{title}</h2> 
                        </div>
                        <div className="">
                        <p className="text-sm text-wapicolor-900 font-bold">
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default InfoItem;