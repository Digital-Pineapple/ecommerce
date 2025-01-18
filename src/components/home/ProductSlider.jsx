import { useRouter } from "next/router";
import { ProductCard } from "../ui";

export const ProductSlider = ({
  products,
  name,
  categories,
  brand_id,
  search,
  brand_url,
}) => {
  const router = useRouter();
  // const { dimensions } = useSelector(state => state.ui);
  const showMore = () => {
    const { category_id } = router.query;

    if (!category_id) return router.push(`/marcas/${brand_url}`);

    router.push({
      pathname: `/marcas/${brand_url}`,
      query: { category_id },
    });
  };

    return (
        <div className="w-full inline-block">
            <div className="bg-wapicolor-50 py-3 text-center border border-b-4 border-r-4 border-wapicolor-700 rounded-md">
                <h2 className="w-full text-base md:text-lg lg:text-[26pxgit ] text-wapicolor-950  text-center font-Poppins uppercase">{name} </h2>
            </div>
            <div className="text-xs w-full md:text-base lg:text-lg pb-4 pt-4 ">
                {
                    categories.map(({ _id, name }) => (
                        <span onClick={() => search(brand_id, _id)}
                            key={_id}
                            className="cursor-pointer hover:bg-pink-500 hover:text-white text-pink-500   py-2 px-2 inline-block">
                            {name}
                        </span>
                    ))
                }
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products?.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
            <div>
                {
                    products.length > 0 && (
                        <div className="flex items-start mb-14 justify-center" onClick={showMore}>
                            <div className="text-pink-600 border-2 border-[#e91e63] px-6 md:px-14 py-2 cursor-pointer hover:bg-[#e91e63] hover:text-white rounded-full flex flex-col items-center transition-all duration-700 ease-in-out text-xs md:text-xl">
                                <span className="font-semibold">Ver más</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}