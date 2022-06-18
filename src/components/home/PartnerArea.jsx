import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
/**tags */

export const PartnerArea = () => {
  const { brands } = useSelector((state) => state.brands);
  const router = useRouter();

  const handleClickBrand = (url) => {
    router.push(`/marcas/${url}`)
  }

  return (
    <section className="bg-[#f5f5f5] py-8 m-auto">
      <div className="mx-auto px-6 max-w-[1420px] flex justify-around ">
        {brands.map((brand) => (
          <Link href={`/marcas/${brand.url}`} passHref key={brand._id}>
            <div className="text-center h-auto " key={brand._id}>
              <Image
                src={brand.image}
                width={100}
                height={100}
                className="w-auto inline-block cursor-pointer"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
