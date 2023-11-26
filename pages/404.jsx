import Link from 'next/link';
import Image from "next/image"
const NotFoundPage = () => {
  return (
    <section className="container mx-auto text-center flex items-center flex-col justify-center min-h-screen font-Poppins">
      <div className="w-full grid-cols-1 md:grid grid-cols-2 flex items-center justify-center">
        <div className="w-full hidden md:block">
          <Image
            src="/assets/icons/404.svg"
            width={600}
            height={600}
          />
        </div>
        <div>
          <h1 className="text-9xl md:lg:text-[200px] xl:text-[300px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">404</h1>
          <h2 className="text-xl lg:text-4xl uppercase">Página no econtrada</h2>
          <p className="my-5 text-sm lg:text-base">Opps, la paágina que buscas no esta disponible por el momento</p>
          <button className="px-10 py-4 rounded-full text-white font-bold mt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
            <Link href="/">
              <a>Volver al inicio</a>
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage;