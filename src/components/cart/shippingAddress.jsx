
import { useDispatch, useSelector } from "react-redux"

import { addShippingAddressSelected, removeAddressFromCart, startLoadShippingCost, loadShippingCost } from "../../actions/shoppingCartActions";

import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const ShippingAddress = ({ toggleSelectCountry }) => {

    const dispatch = useDispatch();
    const { shippingAddress, addressSelected, shippingCosts } = useSelector((state) => state.cart);

    const loadShippingCostToCart = async () => {
        await dispatch(startLoadShippingCost());
    }

    const address = shippingAddress?.map(address => {
        let add = {
            label: `${address.street} #${address.no_ext}, ${address.postalcode}, ${address?.state?.name || address?.state}`,
            value: address._id
        }
        return add;
    });

    const handleChangeAddress = (value) => {

        const shippingAddressSelected = shippingAddress.find(address => address._id === value);

        if (shippingAddressSelected) dispatch(addShippingAddressSelected(shippingAddressSelected));

        if (shippingAddressSelected.type_direction === 2) loadShippingCostToCart();

    }

    const handleRemoveAddress = () => {
        dispatch(removeAddressFromCart());
        dispatch(loadShippingCost(shippingCosts))
    }

    return (
        <>
            <div className="w-full">
                <span className="font-Poppins text-[15px] leading-[1.4] text-[#333] mr-7">
                    Selecciona una dirección ó agrega una nueva:
                </span>
            </div>
            <div className="w-full mt-1 flex items-center">
                {
                    Object.keys(addressSelected)?.length > 0 ? (
                        <p className="w-full font-semibold">{addressSelected.street} #{addressSelected.no_ext}, {addressSelected.postalcode}, {addressSelected?.state?.name}</p>
                    ) : (
                        <FormControl size="small" fullWidth  sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "pink"
                                },    "&:hover fieldset": {
                                    borderColor: "pink", // Color del borde al pasar el mouse
                                },
                                }
                            }}
                            >
                            <InputLabel
                                id="demo-simple-select-label">Dirección de envío</InputLabel>
                            <Select
                                placeholder="Dirección de envío"
                                label="Dirección de envío"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(event) => handleChangeAddress(event.target.value)}
                            >
                                {
                                    address.map(({ label, value }) => (
                                        <MenuItem  key={label} value={value}>{label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                }
                {!Object.keys(addressSelected).length ? (
                    <button
                        className="w-full  bg-luz hover:bg-wapicolor-600 hover:text-luz py-2 text-wapicolor-600 py-[5.5px]  ml-2 w-4/12 border-2 border-b-4 border-wapicolor-600 rounded-md"
                        onClick={toggleSelectCountry}
                    >
                        Agregar
                    </button>
                ) : (
                    <div onClick={handleRemoveAddress}>
                        <HighlightOffIcon className="text-xl cursor-pointer ml-2 hover:text-red-600" />
                    </div>
                )
                }
            </div>
        </>
    )
}