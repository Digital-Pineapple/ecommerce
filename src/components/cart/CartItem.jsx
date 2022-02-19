import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { deleteProduct, deleteOneProduct, addOneProduct } from '../../actions/shoppingCartActions';
const CartItem = ({ item }) => {
    const { product } = item;
    const dispatch = useDispatch();

    const deleteToCart = (product_id) => {
        dispatch(deleteProduct(product_id));
    }

    const removeOneFromCart = (item) => {
        dispatch(deleteOneProduct(item));
    }

    const addOneFromCart = (item) => {
        dispatch(addOneProduct(item));
    }

    return (
        <div className="w-full overflow-hidden mb-2 flex items-center">
            <div className="bg-second-100 w-1 h-1/3">
            </div>
            <div className="mt-5">
                <div className='flex justify-between'>
                    <div className='flex flex-row'>
                        <div className="w-32">
                            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX472_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1570119352353" alt={product?.name} className="w-full h-full object-fill" />
                        </div>
                        <div className="py-4 flex flex-col">
                            <p className="font-bold sm:text-sm">{product?.name}</p>
                            <p className="font-semibold text-sm mt-3">${product?.price} x {item?.value} = ${product.price * item.value}</p>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col p-2 float-right">
                        <button className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-2 border-2 border-black transition-all duration-700 ease-in-out my-1" onClick={() => addOneFromCart(item)}
                        >+</button>
                        <button
                            className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-2 border-2 border-black transition-all duration-700 ease-in-out my1"
                            onClick={() => removeOneFromCart(item)}
                        >-</button>
                    </div>
                    <div>
                        <span className="flex flex-row-reverse cursor-pointer pr-1" onClick={() => deleteToCart(product._id)}>
                            <CloseIcon />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem 
