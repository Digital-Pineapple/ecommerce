import { useEffect, useState } from "react";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts"
import { BannerImage, ContactInfo } from "../../src/components/ui";
import { wrapper } from "../../src/store";
import { MdOutlineMailOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { GoLocation, GoPerson } from "react-icons/go";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";

import { addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage, } from "../../src/actions/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { HiMail } from "react-icons/hi";

import { useFormik } from "formik";
import * as Yup from 'yup';
import { startSendMessage } from "../../src/actions/contactActions";
import LoadingScreen from "../../src/components/LoadingScreen";
import { errorNotify, successNotify } from "../../src/helpers/helpers";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.faqs);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!logged) {
      let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged]);


  const handelSendMessage = async (formData, resetForm) => {

    setLoading(true);

    const { hasError, message } = await startSendMessage(formData);

    if (hasError) {
      errorNotify(message)
      return;
    }
    successNotify(message);
    resetForm({ values: initialValues })
    setLoading(false);
  }

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }

  const validationSchema = {
    name: Yup.string().min(8, "El nombre debe contener al menos 8 caracteres").required("El nombre es requerido"),
    email: Yup.string().email(true).required("El correo es requerido"),
    phone: Yup.string().required("La telefono es requerida"),
    message: Yup.string().min(8, "El mensaje debe contener al menos 8 caracteres").required("El mensaje es requerido"),
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData, { resetForm }) => {
      handelSendMessage(formData, resetForm);
      //alert(JSON.stringify(formData));
    }
  });

  return (
    <Layout
      title="Wapizima - Contácto"
      robots="noindex"
      categories={categories}
    >
      {loading && <LoadingScreen />}
      <BannerImage
        title="Contáctanos"
        imageBackground="bg-about-us"
      />
      <section className="bg-luz min-h-screen">
        <div>
          <div className=" max-w-[1380px] mx-auto w-full my-20">
            <div className="flex flex-wrap">
              <div className="border-solid border-[2px] border-[#e6e6e6] w-full lg:w-1/2 xl:w-1/2 p-16 flex justify-center flex-wrap items-center">
                <form className="w-full" onSubmit={formik.handleSubmit}>
                  <h4 className="font-Poppins text-[24px] leading-[1.5] text-[#333] text-center pb-[30px]">Envianos un mensaje</h4>
                  <div className="mb-6">
                    <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">

                      <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[20%] " }}
                      >
                        <GoPerson />
                      </IconContext.Provider>
                      <input type="text"
                        name="name"
                        placeholder="Ingresa tu nombre"
                        onChange={formik.handleChange}
                        className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                      />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                      <span className="text-red-500 text-sm">{formik.errors.name}</span>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                      <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[20%] " }}
                      >
                        < HiMail />
                      </IconContext.Provider>
                      <input
                        type="text"
                        name="email"
                        placeholder="Ingresa tu correo electronico"
                        className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                        onChange={formik.handleChange}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <span className="text-red-500 text-sm">{formik.errors.email}</span>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                      <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[20%] " }}
                      >
                        <BsTelephoneFill />
                      </IconContext.Provider>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Ingresa tu número telefonico"
                        className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                        onChange={formik.handleChange}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone ? (
                      <span className="text-red-500 text-sm">{formik.errors.phone}</span>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <div className="border border-solid boder-[1px] border-[#e6e6e6] rounded-sm">
                      <textarea
                        placeholder="¿Como podemos ayudarte?"
                        name="message"
                        className="w-full min-h-[199px] font-Poppins text-xs leading-[1-6923] text-[#333] px-[28px] pt-[25px] block outline-0 resize-none"
                        onChange={formik.handleChange}
                      ></textarea>
                    </div>
                    {formik.touched.message && formik.errors.message ? (
                      <span className="text-red-500 text-sm">{formik.errors.message}</span>
                    ) : null}
                  </div>
                  <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out"
                    type="submit"
                  >
                    Enviar
                  </button>
                </form>
              </div>
              <div className="border-solid border-[2px] border-[#e6e6e6] w-full lg:w-1/2 xl:w-1/2 p-16 flex justify-center flex-wrap items-center">

                <ContactInfo
                  icon={<GoLocation />}
                  title="Dirección"
                  text="Dr. Andrés Benavides 304, Residencial Colón y Col Ciprés, 50120 Toluca de Lerdo, Méx."
                />

                <ContactInfo
                  icon={<BsTelephone />}
                  title="Hablemos"
                  text="+52 (7292420885)"
                />

                <ContactInfo
                  icon={<MdOutlineMailOutline />}
                  title="Soporte de Venta"
                  text="pruebitas.test@gmail.com"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.14544889983!2d-99.66265068578412!3d19.276040050664797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89a337ab3863%3A0xe5209d75006ddf53!2sDr.%20Andr%C3%A9s%20Benavides%20304%2C%20Residencial%20Col%C3%B3n%20y%20Col%20Cipr%C3%A9s%2C%2050120%20Toluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1650566416705!5m2!1ses-419!2smx" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            className="border-0 w-full"
          ></iframe>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadFaqsCategories());

  return {
    revalidate: 3600
  }
});


export default ContactUs; 