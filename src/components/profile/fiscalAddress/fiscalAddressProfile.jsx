import { useSelector } from "react-redux";
import { taxt_system } from "../../../staticData/text_system";

export const FiscalAddressProfile = () => {
  const { fiscalAddress, stateSelected, municipalitySelected } = useSelector(
    (state) => state.profile
  );

  const taxt_selected = taxt_system.filter(
    (taxt) => taxt.value === fiscalAddress.tax_system
  );
  return (
    <>
      <div className="border-b-solid border-dashed text-lg font-Poppins leading-8 text-center px-5 py-5 border-b-2">
        <h2 className="text-[#333]">Datos Fiscales</h2>
      </div>
      <div className="p-5 font-Poppins text-[#888]">
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">Nombre Fiscal o Razón Social:</p>
          <span>{fiscalAddress?.legal_name || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="leading-8">RFC:</p>
          <span>{fiscalAddress.tax_id || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="leading-8">Régimen Fiscal:</p>
          <span>{taxt_selected[0]?.label || "No Seleccionado"}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="leading-8">Correo:</p>
          <span>{fiscalAddress.email || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="leading-8">Teléfono:</p>
          <span>{fiscalAddress.phone || "No Agregado"}</span>
        </div>
      </div>
      <div className="border-dashed text-lg font-Poppins leading-8 text-center px-5 py-5 border-y-2">
        <h2 className="text-[#333]">Dirección Fiscal</h2>
      </div>
      <div className="p-5 font-Poppins text-[#888]">
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">Calle:</p>
          <span>{fiscalAddress?.address?.street || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">No.Int:</p>
          <span>{fiscalAddress?.address?.interior || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">No.Ext:</p>
          <span>{fiscalAddress?.address?.exterior || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">Colonia:</p>
          <span>{fiscalAddress?.address?.neighborhood || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">Ciudad:</p>
          <span>{fiscalAddress?.address?.city || "No Agregado"}</span>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">Municipio:</p>
          <span>
            {fiscalAddress?.address?.municipality || "No Seleccionado"}
          </span>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="leading-8">Estado:</p>
          <span>{fiscalAddress?.address?.state || "No Seleccionado"}</span>
        </div>
      </div>
    </>
  );
};
