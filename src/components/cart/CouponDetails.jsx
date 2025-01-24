
import { helpers } from "../../helpers";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CouponDetails = ({ handleApplyCoupon, setInputCoupon, coupon, handleRemoveCoupon, subtotalWithCoupon }) => {
    const subtotal = helpers.priceFormat(subtotalWithCoupon);
    return (
        <>
            {
                !coupon && (
                    <div className="w-full">
                        <div>
                            <span className="font-Poppins text-[15px] leading-[1.4] text-[#333]">
                                Agregar Cupón:
                            </span>
                        </div>
                        <form onSubmit={handleApplyCoupon}>
                            <div className="w-full mt-5 flex items-center justify-center">
                                <input
                                    name="cupon"
                                    placeholder="Aplicar cupon"
                                    onChange={(e) => setInputCoupon(e.target.value)}
                                    type="text"
                                    className="py-2 border-2 broder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 px-2 w-full"
                                />
                                <button
                                    className="w-full bg-luz hover:bg-wapicolor-600 hover:text-luz py-2 text-wapicolor-600 ml-2 w-4/12 border-2 border-b-4 border-wapicolor-600 rounded-md"
                                >
                                    Aplicar
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            {
                coupon && (
                    <div className="w-full">
                        <span className="font-Poppins text-[15px] leading-[1.4] text-[#333] mt-3">
                            Cupon:
                        </span>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg">{coupon.code}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-lg">-{coupon.discount}%</p>
                                <HighlightOffIcon 
                                    className="text-xl cursor-pointer ml-2 hover:text-red-600"
                                    onClick={handleRemoveCoupon}
                                />
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="w-full">
                                <span className="font-Poppins text-[15px] leading-[1.4] text-[#333] text-sm">
                                    Subtotal con cupon aplicado:
                                </span>
                            </div>
                            <div className="w-[65%] pr-[18px] flex justify-end">
                                <span className="font-Poppins text-[18px] leading-[1.2] text-[#333]">
                                    {subtotal}
                                </span>
                            </div>
                        </div>
                        <div className="w-full mt-5">
                                <span className="font-Poppins text-[15px] leading-[1.4] text-[#333] text-xs font-semibold">
                                    ¡El cupón solo es valido para productos sin descuento!
                                </span>
                            </div>
                    </div>
                )
            }
        </>
    )
}

export default CouponDetails