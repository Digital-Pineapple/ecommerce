import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { startfinaliceTransferCheckout } from "../../actions/checkoutActions";
import Cookies from "js-cookie";
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { helpers } from "../../helpers";
import { clearCart } from "../../actions/shoppingCartActions";

export const CheckoutTransfer = ({ handleOpenTransfer, setLoadingForm, cart }) => {

    const dispatch = useDispatch();

    const { banksAccounts } = useSelector((state) => state.checkout);
    const [bankAccountSelected, setBankAccountSelected] = useState({});

    const banksAccounts_options = banksAccounts.map(bank => {
        let bankOption = {
            label: `${bank.account_number} - ${bank.beneficiary}`,
            value: bank._id
        }
        return bankOption;
    });

    const handleClickBankAccount = (value) => {
        const bank_account_selected = banksAccounts.find(bank => bank._id === value);
        setBankAccountSelected(bank_account_selected)
    }

    const handleFinaliceTransfer = async (e) => {
        e.preventDefault();
        setLoadingForm(true)
        handleOpenTransfer();
        const token = Cookies.get('token');
        const currency = Cookies.get('Currency') || 'MXN';
        if (banksAccounts.length > 1)

            await dispatch(startfinaliceTransferCheckout(bankAccountSelected?._id, token, currency,cart));
        // console.log(bankAccountSelected._id)
        else
            await dispatch(startfinaliceTransferCheckout(banksAccounts[0]?._id, token, currency));
        // console.log(banksAccounts[0]._id);
        dispatch(clearCart());
        setLoadingForm(false);
    }

    const copyInformation = (bankAccount) => {
        const { account_number, interbank, beneficiary, card_number } = bankAccount;
        const dataAccount = {
            'Banco': bankAccount.bank.name,
            ...(card_number) && {
                'No. Tarjeta': card_number,
            },
            'Beneficiario': beneficiary,
            'No. de cuenta': account_number,
            'Clabe interbancaria': interbank,
        };
        const text = helpers.convertObjectToPlainText(dataAccount)
        helpers.copyText(text);
    }

    return (
        <form className="w-full min-h-20 py-3">
            <div className="">
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: 23 }}>Selecciona una cuenta:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Selecciona una cuenta bancaria:"
                        placeholder="ej. 424-242-424-242 - wapizima"
                        className="pt-1"
                        value={banksAccounts.length > 1 ? bankAccountSelected._id : banksAccounts[0]._id}
                        onChange={(e) => handleClickBankAccount(e.target.value)}
                    >
                        {
                            banksAccounts_options.map(({ label, value }) => (
                                <MenuItem value={value} key={value}>{label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div >
            <div className="my-5 min-h-10 border-[1px] border-solid border-[#888]">
                {
                    Object.keys(bankAccountSelected).length > 1 || banksAccounts.length === 1 ?
                        <div className="px-5 py-2 relative">
                            <span className="absolute right-2">
                                <ContentCopyIcon
                                    className="cursor-pointer text-[#e91e63] hover:bg-red-200 hover:rounded-full p-1 text-4xl"
                                    titleAccess="copiar"
                                    onClick={() => copyInformation(banksAccounts.length > 1 ? bankAccountSelected : banksAccounts[0])}
                                />
                            </span>
                            <div className="block w-[100px] h-[100px] mx-auto my-1">
                                <Image
                                    // src={bankAccountSelected?.bank?.image || ''}
                                    src={banksAccounts.length > 1 ? bankAccountSelected?.bank?.image : banksAccounts[0]?.bank?.image}
                                    width={100}
                                    height={100}
                                    alt="backAccount"
                                    layout="responsive"
                                />
                            </div>
                            {
                                banksAccounts.length > 1 ? (
                                    bankAccountSelected?.card_number && (
                                        <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                            <p className="text-[#888] leading-6">
                                                <strong>
                                                    No. Tarjeta:
                                                </strong>
                                            </p>
                                            <span className="text-base leading-7">
                                                {bankAccountSelected?.card_number}
                                            </span>
                                        </div>
                                    )
                                ) : (
                                    banksAccounts[0]?.card_number && (
                                        <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                            <p className="text-[#888] leading-6">
                                                <strong>
                                                    No. Tarjeta:
                                                </strong>
                                            </p>
                                            <span className="text-base leading-7">
                                                {banksAccounts[0]?.card_number}
                                            </span>
                                        </div>
                                    )
                                )
                            }
                            <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                <p className="text-[#888] leading-6">
                                    <strong>
                                        Clabe Interbancaria:
                                    </strong>
                                </p>
                                <span className="text-base leading-7">
                                    {banksAccounts.length > 1 ? bankAccountSelected?.interbank : banksAccounts[0]?.interbank}
                                </span>
                            </div>
                            <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                <p className="text-[#888] leading-7">
                                    <strong>
                                        Número de cuenta:
                                    </strong>
                                </p>
                                <span className="text-base leading-7">
                                    {banksAccounts.length > 1 ? bankAccountSelected?.account_number : banksAccounts[0]?.account_number}
                                </span>
                            </div>
                            <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                <p className="text-[#888] leading-7">
                                    <strong>
                                        Beneficiario:
                                    </strong>
                                </p>
                                <span className="text-base leading-7">
                                    {banksAccounts.length > 1 ? bankAccountSelected?.beneficiary : banksAccounts[0]?.beneficiary}
                                </span>
                            </div>

                        </div>
                        :
                        <div className="my-10 min-h-10 flex justify-center items-center">
                            <p className="text-[#888] leading-6 font-Poppins text-xs">
                                <span>
                                    Selecciona una cuenta bancaria
                                </span>
                            </p>
                        </div>
                }
                <button
                    className="bg-[#333] text-luz py-3 px-6 w-full font-Poppins uppercase cursor-pointer"
                    onClick={(e) => handleFinaliceTransfer(e)}
                    disabled={Object.keys(bankAccountSelected).length > 0 || (banksAccounts.length <= 1 && Object.keys(banksAccounts[0]).length > 0) ? false : true}
                >
                    Finalizar
                </button>
            </div>
        </form >
    )
}
