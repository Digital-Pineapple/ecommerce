import { useEffect, useState } from "react";
import { wrapper } from "../src/store";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../src/components/Layouts";

/**Actions */
import { startLoadOffers } from "../src/actions/offersActions";
import {
  startLoadBrandsHome,
  startLoadBrands,
  startLoadBrandsWithCategories,
  startLoadCategoriesWithProducts,
} from "../src/actions/brandsActions";
import { startLoadDataSliders } from "../src/actions/slidersActions";
import { startLoadCategoriesHome } from "../src/actions/categoryActions";
import { startLoadAdministrableLogo } from "../src/actions/administrableActions";
import { startLoadTags } from "../src/actions/tagsActions";

/************************     RSS FEED  ********************** */
import getRSS from "../src/lib/generateRSS";

import Cookie from "js-cookie";

/**Components */
import {
  Slider,
  Newsletter,
  PartnerArea,
  CategoryArea,
  FacilityArea,
  ProductsArea,
  ProductsOfferArea,
  TestimonialArea,
} from "../src/components/home";

/**Actions */
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Modal } from "../src/components/ui/modal";
import { Container, Grid, Typography } from "@mui/material";
import { OfferCard } from "../src/components/offers/offerCard";
import { startLoadReviews } from "../src/actions/reviewsActions";
import { startLoadCurrencies } from "../src/actions/countryAcctions";
import { startFilterProducts } from "../src/actions/productsAction";

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const { logo } = useSelector((state) => state.administrable);
  const { offers } = useSelector((state) => state.offers);

  // useEffect(() => {
  //   if (router.query.successTransfer === "true") {
  //     localStorage.removeItem("cart");
  //     Cookie.remove("client_secret");
  //     Swal.fire({
  //       icon: "success",
  //       title: "Venta finalizada con exito",
  //       text: "Revisa el apartado mis pedidos para subir los comprobantes de pago y una vez verificada la información enviaremos tus productos.",
  //       confirmButtonText: "Cerrar",
  //       cancelButtonText: "Ver mis pedidos",
  //       cancelButtonColor: "#1565c0",
  //       showCancelButton: true,
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router.push(
  //           {
  //             pathname: router.path,
  //           },
  //           undefined,
  //           { shallow: true }
  //         );
  //       }

  //       if (result.isDismissed) {
  //         router.push({
  //           pathname: "/perfil/mis-pedidos",
  //         });
  //       }
  //     });
  //   }
  // }, [router]);

  useEffect(() => {
    if (router.query.redirect_status === 'succeeded' || router.query.successTransfer === 'true') {
      localStorage.removeItem("cart");
      Cookie.remove("client_secret");
      Swal.fire({
        icon: "success",
        title: "Venta finalizada con éxito",
        text: "Tus productos serán enviados una vez sean empaquetados y se les asigne un número de rastreo.",
        confirmButtonText: "Cerrar",
        cancelButtonText: "Ver mis pedidos",
        cancelButtonColor: "#1565c0",
        showCancelButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isDismissed) return router.replace("/perfil/mis-pedidos");
        router.push(
          {
            pathname: router.path,
          },
          undefined,
          { shallow: true },
        );
      });
    }
  }, [router]);

  // useEffect(() => {
  //   const modalOfferOpen = Cookie.get("modalOfferOpen");

  //   if (modalOfferOpen === "false") {
  //     setOpen(false);
  //   }
  // }, []);

  // const handleButtonCloseModalOffers = () => {
  //   Cookie.set("modalOfferOpen", false);
  //   setOpen(false);
  // };

  // const handleOpenModalOffers = () => {
  //   setOpen(!open);
  // };

  const origin = typeof window === "undefined" ? "" : window.location.origin;


  return (
    <Layout
      title="Wapizima"
      keywords="nails,cosmetic nails,uñas,gel uñas, fantasy nails, bonita, uñas, material uñas, productos uñas, gel nail, decoraciones uñas, decoracion uñas,cursos uñas,lampara uñas"
      description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más."
      ogTitle="Wapizima, Tienda en línea distribuidora de productos para uñas profesionales"
      ogType="website"
      ogUrl={origin}
      ogImage={logo}
      robots="index, follow"
      canonical={origin}
    >
      {/* <Slider />
      <FacilityArea /> */}
      <ProductsArea />
      <CategoryArea />
      <ProductsOfferArea />
      <PartnerArea />
      <Newsletter />
      <TestimonialArea />
      {/* {offers.length && (
        <Modal
          showTitle={false}
          open={open}
          fullWidth={true}
          maxWidth="sm"
          actions={false}
          handleOpenCheckout={handleOpenModalOffers}
          background="bg-offers opacity-[0.9]"
        >
          <Container>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                  variant="h3"
                  className="font-Poppins font-normal text-[30px] text-primary text-center uppercase mb-6"
                >
                  Ofertas del dia
                </Typography>
              </Grid>
              {offers.map((offer) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  key={offer._id}
                >
                  <OfferCard offer={offer} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="w-full flex justify-center">
                <button
                  className="bg-[#333] text-secondary py-4 px-10 rounded-none w-full hover:bg-[#000]"
                  onClick={handleButtonCloseModalOffers}
                >
                  Cerrar
                </button>
              </div>
            </Grid>
          </Container>
        </Modal>
      )} */}
    </Layout>
  );
}

// HomePage.getLayout = function getLayout(page) {

//   return (
//     <Layout
//       title="Wapizima"
//       keywords="nails,cosmetic nails,uñas,gel uñas, fantasy nails, bonita, uñas, material uñas, productos uñas, gel nail, decoraciones uñas, decoracion uñas,cursos uñas,lampara uñas"
//       description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más."
//       ogTitle="Wapizima, Tienda en línea distribuidora de productos para uñas profesionales"
//       ogType="website"
//       ogUrl={origin}
//       ogImage={logo}
//       robots="index, follow"
//       canonical={origin}
//     >
//       {page}
//     </Layout>
//   );
// };

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const endpoint = '/products/filter/products';
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadCategoriesHome());
  await store.dispatch(startLoadDataSliders());
  await store.dispatch(startLoadOffers());
  await store.dispatch(startLoadBrandsHome());
  await store.dispatch(startFilterProducts(endpoint, undefined, ctx.req.cookies.Currency))
  await store.dispatch(startLoadTags());
  await store.dispatch(startLoadBrands());
  await store.dispatch(startLoadReviews());
  await store.dispatch(startLoadBrandsWithCategories());
  await getRSS();
});
