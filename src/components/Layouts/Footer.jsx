import { useRouter } from "next/router";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { startStoreNewsletterSuscription } from "../../actions/newsletterActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = ({ categories }) => {
  const router = useRouter();

  const { facebook, instagram, tiktok } = useSelector(
    (state) => state.administrable
  );

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };
  const validationSchema = {
    email: Yup.string().email(true).required("El correo requerido"),
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData, { resetForm }) => {
      dispatch(startStoreNewsletterSuscription(formData));
      resetForm({ values: initialValues });
    },
  });

  const handleRedirectClick = (path) => {
    if (router.pathname === path) return router.push(path, undefined, { shallow: true });
    router.push(path)
  };


  return (
    <footer className=" left-0 right-0 bottom-0 min-h-[250px] pt-[60px] pb-[20px] bg-gradient-to-tr from-wapicolor-700 via-wapicolor-700 to-wapicolor-300/70 text-white mx-auto px-auto font-Poppins text-base font-medium">
      <div className="max-w-[1200px] mx-auto px-3">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
            <div className="flex justify-between flex-wrap">
              <div>
                <h6>Sobre nosotros</h6>
                <ul>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/acerca-de-nosotros")}>Acerca de nostros</li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/permisos-de-exportacion")}>Permisos de exportación</li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/politicas-de-privacidad")}>Políticas de privacidad</li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/devoluciones-y-garantias")}>Devoluciones y garantias</li>
                </ul>
              </div>
              <div>
                <h6>Ayuda y apoyo</h6>
                <ul>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/preguntas-frecuentes")}>
                    Preguntas frecuentes
                  </li>
                  {categories?.map((category) => (
                    <li className="text-[12px] cursor-pointer" key={category._id} onClick={() => handleRedirectClick(`/preguntas-frecuentes?category_id=${category._id}`)}>
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h6>Enlaces</h6>
                <ul>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/")}>
                    Inicio
                  </li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/marcas")}>
                    Marcas
                  </li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/categorias")}>
                    Categorias
                  </li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/productos")}>
                    Productos
                  </li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/contacto")}>
                    Contacto
                  </li>
                  <li className="text-[12px] cursor-pointer" onClick={() => handleRedirectClick("/acerca-de-nosotros")}>
                    Acerca de
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
            <div className="w-full flex justify-center flex-wrap">
              <div className="w-full lg:w-[40%] text-center">
                <h3>Encuentranos en:</h3>
                <div className="flex mt-6 justify-center mb-4 items-center">
                  <Link href={facebook} className="mx-3 text-sm ">
                    <a target="_blank" className="mx-2">
                      <FacebookIcon className="cursor-pointer hover:text-wapicolor-100  mr-3" />
                      <p className="text-[10px] text-center">Facebook</p>
                    </a>
                  </Link>
                  <Link href={instagram} passHref className="mx-3 text-sm">
                    <a target="_blank" className="mx-2">
                      <InstagramIcon className="cursor-pointer hover:text-wapicolor-100  mr-3" />
                      <p className="text-[10px] text-center">Instagram</p>
                    </a>
                  </Link>
                  <Link href={tiktok} passHref className="mx-3 text-sm">
                    <a target="_blank" className="mx-2">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="30" height="26"
                        className="cursor-pointer hover:fill-wapicolor-100 fill-[#fff]"
                        viewBox="0 0 48 48"><path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 26.435547 13.023438 A 1.50015 1.50015 0 0 0 25 14.5 L 25 28 C 25 30.227598 23.227598 32 21 32 C 18.772402 32 17 30.227598 17 28 C 17 25.772402 18.772402 24 21 24 A 1.50015 1.50015 0 1 0 21 21 C 17.151598 21 14 24.151598 14 28 C 14 31.848402 17.151598 35 21 35 C 24.848402 35 28 31.848402 28 28 L 28 20.335938 C 29.268121 21.316987 30.78243 22 32.5 22 A 1.50015 1.50015 0 1 0 32.5 19 C 29.996501 19 28 17.003499 28 14.5 A 1.50015 1.50015 0 0 0 26.435547 13.023438 z"></path></svg>
                      <p className="text-[10px] text-center">TikTok</p>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-[60%] mb-5">
                <p className="leading-7 mb-5">
                  Suscríbete para recibir ofertas exclusivas, promociones y más.
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex justify-center"
                >
                  <input name="email" type="text" placeholder="Ingresa tu correo electronico" value={formik.values.email}
                    onChange={formik.handleChange} className="bg-wapicolor-100 w-full py-4 px-10 text-sm leading-normal   rounded-none transition-all outline-wapicolor-500 outline-wapicolor-100 placeholder-wapicolor-500 text-wapicolor-800" />
                  <button
                    type="submit"
                    className="ml-2  bg-luz text-wapicolor-500 px-2 py-1 md:px-5 text-[16px] transition-all rounded-md border-b-4 border-r-2 border-wapicolor-400 "
                  >
                    Enviar
                  </button>
                  {formik.touched.email && formik.errors.email ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <div className="w-full h-full flex items-center justify-center my-5">
            <span className="text-[12px] cursor-pointer">
              <a href="https://digital-pineapple.com.mx/" target="_blank" rel="noopener noreferrer">
                ©Copyright 2025 By Digital Pinneapple
              </a>
            </span>
          </div>
        </Grid>
      </div>
    </footer >
  );
};

export default Footer;
