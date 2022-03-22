import Image from 'next/image';
import Link from 'next/link';
import {AiOutlineHeart} from 'react-icons/ai';
import { priceFormat } from '../../helpers/helpers';

export const CardProduct = ({image , product }) => {
    
    const price_format = priceFormat(product.price);

    const handleClickButton = () =>{

    }
    return (
        <>
      <div className="relative left-0 top-0 pb-[35px] animate__animated animate__zoomIn">
        <div className="block">
          <div className="block-pick overflow-hidden relative  min-h-[250px] ">
  
            <Image
              src={image}
              alt={product.name}
              width={250}
              height={250}
              layout="responsive"
              className="flex items-center"
            />

            <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-[1] transition-all	duration-[0.4s] ease-linear delay-0">
            
             <a className="addwishlist block absolute top-[26px] right-[20px] font-normal text-xl text-luz leading-none	scale-0 transition-all duration-[0.4s] ease-linear delay-0">
             <AiOutlineHeart/>
             </a>
             <div className="absolute left-2/4 translate-x-[-50%]  bottom-[-50px] w-[161px] transition-all	duration-[0.4s] ease-linear delay-0">
               <button
              onClick={()=>handleClickButton()}
              className="block-btn rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-10 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0"
            >
              Ver más
            </button>
            </div>

            </div>
          </div>
          <div className="flex items-start flex-wrap">
            <div className="w-4/5">
              <a className="font-Poppins text-base leading-[2.4] text-[#666] mb-16 ">
                {product.name}
              </a>
              <p className="font-Poppins text-base leading-[1] text-[#666]">
                {price_format}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .block-pick:hover .block-btn {
            bottom: 100px;
          }

          .block-pick:hover .addwishlist{
              transform:scale(1);
          }
        `}
      </style>
    </>
    );
};