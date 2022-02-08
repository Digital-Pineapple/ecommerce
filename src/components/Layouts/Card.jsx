import { useModal } from "../../hooks/useModal";
import ShowProduct from "../products/ShowProduct";

const Card = ({ product }) => {
    const [isOpen, openModal, closeModal] = useModal();

    return (
        <article className="my-12 drop-shadow-md overflow-hidden w-10/12 border-2 mx-auto rounded-xl relative hover:scale-[1.01]">
            <div className="overflow-hidden cursor-pointer" onClick={openModal}>
                <span className="absolute bg-[#fa440a] text-white p-2 font-bold">
                    20%
                </span>
                <img src={product?.principal_image} className="object-contain w-full h-full" />
            </div>
            <div className="px-4 mt-4 mb-4">
                <p className="text-xl">{product?.name}</p>
                <p className="text-md font-light">{product?.short_description}</p>
                <p className="text-lg font-bold">${product?.price}</p>
                {
                    product?.quantity > 0 ?
                        <p className="float-right semibold">Disponible</p>
                        : <p className="float-right semibold">Agotado</p>
                }
                <button className="w-full bg-[#f58d16] py-2 mt-2 text-white font-bold hover:bg-[#ff9f30] rounded-lg">
                    Add to card
                </button>
            </div>
            {
                isOpen && (<ShowProduct isOpen={isOpen} closeModal={closeModal} product_id={product._id} />)
            }
        </article>
    )
}

export default Card;