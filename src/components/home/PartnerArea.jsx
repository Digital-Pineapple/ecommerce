import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Fab } from "@mui/material";
/**tags */

const PartnerArea = () => {
  const { brands } = useSelector((state) => state.brands);
  const router = useRouter();

  return (
    <section className="bg-[#f5f5f5] py-8 m-auto">
      <div className="mx-auto px-6 max-w-[1420px] flex justify-around ">
        {brands.map((brand) => (
          <Link href={`/marcas/${brand.url}`} passHref key={brand._id}>
            <div className="text-center h-20 w-20 " key={brand._id}>
              <img
                src={brand.image}
                className="inline-block cursor-pointer min-h-[40px] max-h-[5rem]"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default PartnerArea;
