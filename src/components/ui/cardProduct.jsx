import { CardMedia } from '@mui/material';
import Image from 'next/image';

const CardProduct = ({
  images,
  name,
  titleButton,
  url,
  handleClickCard,
  hasName,
  opacity = false
}) => {

  return (
    <>
      <div className={`relative left-0 top-0 pb-[35px] animate__animated animate__zoomIn cursor-pointer`} onClick={() => handleClickCard(url)}>
        <div className="block">
          <div className={`block-pick overflow-hidden relative  max-h-full `}>
            {/* <img
              src={image}
              alt={name}
              className="flex items-center min-w-full min-h-full"
              width={300}
              height={300}
            /> */}
            <Image
              height="300"
              width="300"
              layout="responsive"
              priority={true}
              src={images['1000x1000']}
              alt={name}
              fill={true}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
            <div
              className={`absolute w-full h-full top-0 left-0 ${hasName ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(0,0,0,0.2)]"
                } ${opacity ? 'opacity-0 opacity-[1]' : 'opacity-0 hover:opacity-[1]'} transition-all	duration-[0.4s] ease-linear delay-0`}
            >
              <div className="absolute left-2/4 translate-x-[-50%]  bottom-[-50px] w-[161px] transition-all	duration-[0.4s] ease-linear delay-0">
                {hasName && (
                  <div className="flex items-center justify-center">
                    <a className="font-Poppins uppercase text-center font-medium text-[#fff] mb-44 font-semibold">
                      {name}
                    </a>
                  </div>
                )}
                <button
                  className={`${!opacity && 'block-btn'} rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-10 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0`}
                  onClick={() => handleClickCard(url)}
                >
                  {titleButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .block-pick:hover .block-btn {
            bottom: 100px;
          }

          .block-pick:hover .addwishlist {
            transform: scale(1);
          }
        `}
      </style>
    </>
  );
};

export default CardProduct;