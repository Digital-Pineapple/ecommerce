import React from 'react';
import {ImAirplane} from 'react-icons/im';
import {FaMoneyBillAlt , FaPaypal} from 'react-icons/fa';
import {BiSupport} from 'react-icons/bi';
import FacilityBox from '../ui/facilityBox';

export const FacilityArea = () => {
    
    return (
        <section className="bg-[#333] py-9">
            <div className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                <FacilityBox
                  icon={<ImAirplane/>}
                  title="Envíos Nacionales"
                />
                <FacilityBox
                  icon={<FaMoneyBillAlt/>}
                  title="Garantia de Devolución de Dinero"
                />
                <FacilityBox
                  icon={<FaPaypal/>}
                  title="Muchas Formas de Pago"
                />
                <FacilityBox
                  icon={<BiSupport/>}
                  title="Soporte en Linea 24/7"
                />
            </div>
        </section>
    );
};