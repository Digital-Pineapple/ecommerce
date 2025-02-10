import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

import { startLoadBusinessRules } from '../../actions/shoppingCartActions';
import { useSelector } from 'react-redux';

const BusinessRules = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { BusinessRules } = useSelector((state) => state.cart);

    useEffect(()=>{
        handleLoadBusinessRules();
    }, []);

    const handleLoadBusinessRules = async () => {
        setLoading(true);
        await dispatch(startLoadBusinessRules());
        setLoading(false);
    }

  return (
    <div>
        {
            loading ? (
              <div className="flex justify-center items-center">
                <CircularProgress />
              </div>)
              : (
                <div>
                    <table className="min-w-full leading-normal font-Poppins borfe border-collapse">
                        <thead>
                        <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Compra mínima</th>
                        <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Compra máxima</th>
                        <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Descuento</th>
                        </thead>
                        <tbody>
                        {
                        BusinessRules.map(rule =>(
                            <tr className="border-b border-gray-200 text-center" key={rule._id}>
                                <td className="py-2">${rule.minimum_money}</td>
                                <td className="py-2">${rule.maximum_money}</td>
                                <td className="py-2">%{rule.discount}</td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
              )
        }
    </div>    
  )
}

export default BusinessRules