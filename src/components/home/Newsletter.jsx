import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startStoreNewsletterSuscription } from '../../actions/newsletterActions';
import { useDispatch, useSelector } from 'react-redux';


const Newsletter = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.newsletter)
  const initialValues = {
    email: ''
  }
  const validationSchema = {
    email: Yup.string().email(true).required("El correo requerido"),
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData, { resetForm }) => {
      dispatch(startStoreNewsletterSuscription(formData));
      resetForm({ values: initialValues })
    }
  });

  return (
    <section className="border-t-2  border-[#f6f6f6] border-solid py-16">
      <div className="w-full m-auto px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 items-center  ">
          <div className="w-full  md:px-2 py-1">
            <div className="relative overflow-hidden  rounded-lg ">
            <div className="absolute inset-0 bg-wapicolor-600/80 blur "></div>
              <div className="relative z-10 p-4   rounded-lg">
                <div className="mx-auto ">
                  <div className="w-full mb-4 md:px-2 ">
                    <h2 className="text-xl  uppercase font-semibold font-['Poppins'] text-white mb-4">
                      Suscríbete a Nuestro Newsletter
                    </h2>
                    <p className="text-base md:text-lg text-white/80 font-['Poppins']">
                      Suscríbete para recibir nuestras promociones, ofertas y nuevos productos que están por salir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div className="flex">
            <form onSubmit={formik.handleSubmit} className="w-full flex">
              <input name="email" type="text" placeholder="Ingresa tu correo electronico" value={formik.values.email}
                onChange={formik.handleChange} className="bg-gray-50 w-full py-4 px-10 text-sm leading-normal   border  rounded-none transition-all outline-wapicolor-400  outline-2 " />

              <button type="submit" className="border  rounded-md  bg-white ml-2 lg:ml-5 text-wapicolor-400 px-2 md:px-5 text-[16px] transition-all hover:bg-wapicolor-50 ">Suscribirme</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;