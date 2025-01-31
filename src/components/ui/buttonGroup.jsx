import { memo } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ButtonGroup = ({ quantity = 0, increaseDecreaseQuantityProduct, handleChangeQuantity, product }) => {

    const handleKeyPress = (e) => {
        let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }
    return (
        <div className="flex border-[1px]  bg-wapicolor-50 rounded-md border-solid border-wapicolor-500 items-center justify-center max-w-[130px] min-w-[100px] w-[95px] md:w-[130px]">
            {
                product?.product_type === '2' ? (
                    <span className="w-[50px] h-full outline-none md:py-2 py-1 flex justify-center ">
                        {quantity}
                    </span>
                ) : (
                    <>
                        <button
                            className="cursor-pointer rounded-md rounded-r-none border-r border-wapicolor-600 bg-wapicolor-50 hover:bg-wapicolor-100  mx-auto w-full flex items-center justify-center py-3"
                            onClick={() => increaseDecreaseQuantityProduct(-1)}
                        >
                            <RemoveIcon className="text-base text-wapicolor-700 " />
                        </button>
                        <input
                            type="text"
                            className="flex w-full  outline-none text-center py-1 md:py-2 bg-wapicolor-50 text-wapicolor-900"
                            onChange={handleChangeQuantity}
                            value={quantity}
                            placeholder={quantity}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="cursor-pointer rounded-md rounded-l-none border-l border-wapicolor-600 bg-wapicolor-50 hover:bg-wapicolor-100  mx-auto w-full flex items-center justify-center py-3"
                            onClick={() => increaseDecreaseQuantityProduct(+1)} 
                        >
                            <AddIcon className="text-base text-wapicolor-700 " />
                        </button>
                    </>
                )
            }
        </div>
    )
};

export default ButtonGroup;


ButtonGroup.displayName = 'ButtonGroup';