import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../../src/actions/administrableActions";
import { wrapper } from "../../../src/store";
import { forgotPassword } from "../../../src/actions/authActions";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { successNotify } from "../../../src/helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../../../src/components/Layouts";
import { startLoadFaqsCategories } from "../../../src/actions/faqsActions";

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

import ErrorIcon from '@mui/icons-material/Error';
import { startLoadCurrencies } from "../../../src/actions/countryAcctions";
import Image from "next/image";
const ForgotPassword = () => {

  const { logo } = useSelector((state) => state.administrable);
  const { categories } = useSelector(state => state.faqs)

  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const router = useRouter();

  const handleForgotPassword = async (email) => {
    const { hasError, message } = await forgotPassword(email);
    if (hasError) {
      setError(true);
      setMessageError(message);
      setTimeout(() => setError(false), 4000);
      return;
    }
    successNotify(message);
    setTimeout(() => {
      router.replace('/auth/login');
    }, 1000)
  }

  const initialValues = {
    email: '',
  }

  const validationSchema = {
    email: Yup.string().email("El correo electronico no es valido").required("El correo electronico es requerido"),
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (email) => {
      handleForgotPassword(email);
    }
  });

  return (
    <Layout categories={categories}>
      <section className="px-6 md:px-0 font-Poppins">
        <div className="container mx-auto min-h-screen flex justify-center items-center">
          <div className="w-full md:w-8/12 lg:w-7/12 lg:p-20 border-2 border-gray-200 bg-white p-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-10">
                <div className="flex justify-center">
                  <Image
                    src={logo}
                    alt="Wapizima"
                    width={150}
                    height={100}
                  />
                </div>
                <h1 className="text-2xl font-bold mb-5 text-center">¿Olvidaste tu contraseña?</h1>
                <p className="text-lg my-1 font-light">Ingresa la dirección de correo electrónico que utilizaste para crear tu cuenta y nosotros te enviaremos un enlace para que restablezcas tu contraseña.</p>
              </div>
              <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                <MarkEmailReadIcon
                  className="text-[25px] text-[#888] w-[20%]"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Ingresa tu correo electronico"
                  className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span className="flex items-center">
                  <ErrorIcon
                    className="text-red-600  mr-1"
                  />
                  <p className="text-red-600 text-sm">{formik.errors.email}</p>
                </span>
              ) : null}
              {
                error &&
                (
                  <span className="flex items-center mt-1">
                    <ErrorIcon
                      className="text-red-600  mr-1"
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
            <div className="text-gray-500 text-sm font-semibold my-3">
              <Link href="/auth/login">
                <a className="hover:text-gray-900 transition-all duration-700 ease-out">Iniciar Sesión</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}


export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadFaqsCategories());
  return {
    revalidate: 3600
  }
});

export default ForgotPassword;