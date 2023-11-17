import { wrapper } from "../src/store";
import { useSelector } from "react-redux";
import Layout from "../src/components/Layouts";

/**Actions */
import { startLoadCategoriesHome } from "../src/actions/categoryActions";
import { startLoadAdministrableLogo } from "../src/actions/administrableActions";
import { startLoadAdministrableSlider } from "../src/actions/administrableActions";
/**Actions */
import { startLoadReviews } from "../src/actions/reviewsActions";
import { startLoadCurrencies } from "../src/actions/countryAcctions";
import { startFilterProducts } from "../src/actions/productsAction";

const endpoint = "/brands/with/categories";

/***************************************Components*************************************** */

import loadable from "@loadable/component";

import ProductsAreaComponent from "../src/components/home/ProductsArea";
import { Slider } from "../src/components/home";

const ProductsOfferAreaComponent = loadable(() =>
  import("../src/components/home/ProductsOfferArea")
);
const PartnerAreaComponent = loadable(() =>
  import("../src/components/home/PartnerArea")
);
const NewsletterComponent = loadable(() =>
  import("../src/components/home/Newsletter")
);
const TestimonialAreaComponenet = loadable(() =>
  import("../src/components/home/testimonialArea")
);

export default function HomePage() {
  const { logo } = useSelector((state) => state.administrable);
  const { products } = useSelector((state) => state.products);
  const { sliders } = useSelector((state) => state.administrable);
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
      {sliders.length > 0 && <Slider sliders={sliders} />}
      <ProductsAreaComponent products={products} />
      <ProductsOfferAreaComponent />
      <PartnerAreaComponent />
      <NewsletterComponent />
      <TestimonialAreaComponenet />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await store.dispatch(startLoadCurrencies());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadCategoriesHome());
    await store.dispatch(startLoadReviews());
    await store.dispatch(startLoadAdministrableSlider());
    await store.dispatch(
      startFilterProducts(
        endpoint,
        undefined,
        ctx.req?.cookies?.Currency || "MXN"
      )
    );
  }
);
