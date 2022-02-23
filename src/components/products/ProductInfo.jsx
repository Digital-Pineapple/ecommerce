import { useRef } from "react";
import { priceFormat } from "../../helpers/helpers";
import { useCounter } from "../../hooks/useCounter";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from "react-redux";
import { newProduct } from "../../actions/shoppingCartActions";

const ProductInfo = ({ productSelected, CloseModal }) => {
    const dispatch = useDispatch();
    const img = useRef(null);
    const { counter, increaseBy, setCounter } = useCounter(1);
    const price = priceFormat(productSelected?.price || 0);
    const showImage = (newImg) => {
        img.current.src = newImg
    }
    const addCart = (product, value) => {
        dispatch(newProduct(product, value));
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div>
                    <div className="w-full h-[15rem] md:h-[25rem]">
                        <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX472_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1570119352353"
                            className="object-contain w-full h-full p-2" ref={img}
                        />
                    </div>
                    <div>
                        <div className="flex">
                            <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer overflow-hidden">
                                <img
                                    src={productSelected?.principal_image}
                                    alt=""
                                    className="h-full w-full object-fill"
                                    onClick={e => showImage(e.target.src)}
                                />
                            </div>
                            {
                                productSelected?.multimedia.map(multimedia => (
                                    <div
                                        className="overflow-hidden border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer"
                                    >
                                        <img
                                            src={multimedia.path}
                                            alt=""
                                            onClick={e => showImage(e.target.src)}
                                            className="w-full h-full object-fill"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden mt-5 md:mt-0">
                    <h2 className="text-3xl font-semibold uppercase">{productSelected?.name}</h2>
                    <p className="mt-4 text-xl break-normal">
                        {productSelected?.description}
                    </p>
                    <div className="mt-10">
                        <p className="font-bold text-3xl text-second-100 mr-12">
                            {price}
                        </p>
                        <p className="text-lg mt-4 font-light">
                            {productSelected?.quantity} Disponibles
                        </p>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold">Categorias</h3>
                        <div className="flex">
                            <Link href="/">
                                <p className="text-second-100 font-semibold mr-4 cursor-pointer text-lg hover:text-gray-700 duration-500">hola mundo</p>
                            </Link>
                            <Link href="/">
                                <p className="text-second-100 font-semibold mr-4 cursor-pointer text-lg hover:text-gray-700 duration-500">hola mundo</p>
                            </Link>
                            <Link href="/">
                                <p className="text-second-100 font-semibold mr-4 cursor-pointer text-lg hover:text-gray-700 duration-500">hola mundo</p>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-12 lg:mt-20">
                        <div className="flex items-center">
                            <button
                                className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out"
                                onClick={() => increaseBy(-1)}
                            >-</button>

                            <button className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out" onClick={() => increaseBy(+1)}
                            >+</button>

                            <input value={counter} type="text" placeholder="quantity" className="py-4 px-4 w-full w-full outline-none border-0 text-center font-bold" />

                            <button className="text-xs lg:text-sm  w-full mx-2 text-white mx-1 bg-black font-bold p-4 border-2 hover:bg-white hover:text-black hover:border-2 border-black transition-all duration-700 ease-in-out" onClick={() => { addCart(productSelected, counter), CloseModal(), setCounter(1) }}>
                                <ShoppingCartIcon />
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo