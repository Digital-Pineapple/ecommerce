import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../../src/actions/administrableActions";
import { wrapper } from "../../../src/store";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { successNotify } from "../../../src/helpers/helpers";

import { useRouter } from "next/router";

import ErrorIcon from '@mui/icons-material/Error';
import Layout from "../../../src/components/Layouts";
import { startLoadFaqsCategories } from "../../../src/actions/faqsActions";
import { resetPassword } from "../../../src/actions/authActions";

import PasswordIcon from '@mui/icons-material/Password';
import { startLoadCurrencies } from "../../../src/actions/countryAcctions";
import Image from "next/image";
const ResetPassword = () => {

  
  const { logo } = useSelector((state) => state.administrable);
  const { categories } = useSelector(state => state.faqs)

  const router = useRouter();
  
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleResetPassword = async (formData) => {
    const { hasError, message } = await resetPassword(formData);

    if (hasError) {
      setError(true);
      setMessageError(message);
      setTimeout(() => setError(false), 4000);
      return;
    }
    successNotify('Se ha enviado un enlace para restablecer tu contraseña');
    router.replace('/auth/login');
  }

  const initialValues = {
    userId: router.query.id,
    token: router.query.token,
    password: '',
    confirm_password: '',
  }

  const validationSchema = {
    password: Yup.string().required("La nueva contraseña es requerida"),
    confirm_password: Yup.string().required("Confirma tu contraseña"),
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData) => {
      handleResetPassword(formData)
    }
  });

  return (
    <Layout categories={categories}>
      <section className="px-6 md:px-0 font-Poppins">
        <div className="container mx-auto min-h-screen flex justify-center items-center">
          <div className="w-full md:w-8/12 lg:w-7/12 lg:p-20 border-2 border-gray-200 bg-white p-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center">  
              <Image
                  src={logo}
                  width={150}
                  height={100}
                />
              </div>
              <h1 className="text-4xl font-bold mb-5 text-center uppercase">Restablecer la contraseña</h1>
              <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center my-1">
                <PasswordIcon 
                  className = "text-[25px] text-[#888] w-[20%]"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Crear una contraseña"
                  className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <span className="flex items-center">
                  <ErrorIcon 
                    className = "text-red-600  mr-1"
                  />
                  <p className="text-red-600 text-sm">{formik.errors.password}</p>
                </span>
              ) : null}
              <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
              <PasswordIcon 
                  className = "text-[25px] text-[#888] w-[20%]"
                />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirmar contraseña"
                  className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                  onChange={formik.handleChange}
                    autoComplete="off"
                />
              </div>
              {formik.touched.confirm_password && formik.errors.confirm_password ? (
                <span className="flex items-center">
                  <ErrorIcon 
                    className = "text-red-600  mr-1"
                  />
                  <p className="text-red-600 text-sm">{formik.errors.confirm_password}</p>
                </span>
              ) : null}
              {
                error &&
                (
                  <span className="flex items-center mt-1">
                    <ErrorIcon 
                    className = "text-red-600  mr-1"
                  />
                    <p className="text-red-600 text-sm">{messageError}</p>
                  </span>
                )
              }
              <button
                className="w-full cursor-pointer text-center bg-[#222] text-white py-4 hover:bg-[#444] transition-all duration-700 ease-in-out mt-10"
                type="submit"
                >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async () => {
    await store.dispatch(startLoadCurrencies());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
  });

export default ResetPassword;