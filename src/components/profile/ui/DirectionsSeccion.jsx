import { useState } from 'react'
import Swal from "sweetalert2";
import { clearDirection, selectDirection, setDefaultAddress, startDeleteAddress } from "../../../../src/actions/profileActions"
import { useDispatch, useSelector } from 'react-redux';
import { errorNotify, infoNotify, successNotify } from '../../../helpers/helpers';
import { useModal } from '../../../hooks/useModal';
import FormAddress from '../FormAddress';
import AddIcon from '@mui/icons-material/Add';

const DirectionsSeccion = ({ directions, toggleSelectCountry, showForm, setShowForm, isEditing, setIsEditing }) => {

    const dispatch = useDispatch();

    const { direction } = useSelector(state => state.profile);

    const handleEditDirecction = async (direction) => {

        if (!direction) return;
        setIsEditing(true);
        dispatch(selectDirection(direction));
        setShowForm(true);

    }

    const handleDeleteAddress = async (address_id) => {

        Swal.fire({
            title: "¿Deseas eliminar esta direccion?",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: 'Cancelar!',
            cancelButtonColor: "#b71c1c",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#1976d2",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { hasError, message } = await dispatch(startDeleteAddress(address_id));

                if (hasError) {
                    errorNotify(message);
                    return;
                }
                
                successNotify(message);
            }
        })

    }

    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {
                !showForm ? (
                    <>
                        <div
                            className="border-2 border-wapicolor-400 mt-5 w-11/12 mx-auto h-72 md:mr-4 cursor-pointer overflow-hidden flex flex-col items-center justify-center border-dashed rounded-md"
                            // onClick={() => { setShowForm(true); dispatch(clearDirection()); setIsEditing(false) }}
                            onClick={toggleSelectCountry}
                        >
                            <div>
                                <AddIcon 
                                    className = "text-wapicolor-600 text-5xl"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold font-Poppins text-wapicolor-600">Agregar Dirección</h2>
                            </div>
                        </div>
                        {
                            directions?.map(direction => (
                                <div key={direction?._id}
                                    className="relative border-wapicolor-600  border-2 border-b-4 mt-5 w-11/12 mx-auto h-72 h-auto md:mr-4 overflow-hidden flex flex-col font-Poppins rounded-md"
                                >
                                    <div className="font-Poppins bg-wapicolor-600 text-luz px-10 py-5">
                                        <p className="uppercase truncate">{direction.name}</p>
                                    </div>
                                    <div className="px-10 my-10 pb-14">
                                        <p className="uppercase text-sm font-medium truncate">{direction?.street} {(direction?.no_ext) && `, #${direction?.no_ext}`}</p>
                                        <p className="uppercase text-sm font-medium">{direction?.municipality?.name || direction?.municipality}, {direction?.state?.name || direction?.state} , {direction?.postalcode}</p>
                                        <p className="uppercase text-sm font-light">{direction?.city}</p>
                                    </div>
                                    <div className="absolute bottom-8 flex text-sm font-medium px-10">
                                        <p className="text-sm text-[#e91e63] cursor-pointer border-b-3 hover:border-solid hover:text-[#e91e63] hover:transition-all flex justify-center items-center"
                                            onClick={() => handleEditDirecction(direction)}
                                        >
                                            Editar
                                        </p>
                                        <p className="text-sm cursor-pointer  hover:border-3 hover:border-solid hover:text-[#880e4f] hover:transition-all mx-2">|</p>
                                        <p className="text-sm text-[#e91e63] cursor-pointer border-b-3 hover:border-solid hover:text-[#e91e63] hover:transition-all flex justify-center items-center"
                                            onClick={() => { handleDeleteAddress(direction._id) }}
                                        >
                                            Descartar
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <div className="col-span-4">
                        <FormAddress
                            setShowForm={setShowForm}
                            direction={direction}
                            isEditing={isEditing}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default DirectionsSeccion