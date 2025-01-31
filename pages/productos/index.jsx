import { useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import AsideBar from "../../src/components/categories/AsideBar";
import Layout from "../../src/components/Layouts";

import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";

import { useRouter } from "next/router";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { ProductCard } from "../../src/components/ui";

import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CategoriesList from "../../src/components/categories/CategoriesList";
import BrandsList from "../../src/components/brands/BrandsList";
import LoadingScreen from "../../src/components/LoadingScreen";
import Filters from "../../src/components/products/Filters";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";

import { useQueryParams } from "../../src/hooks/useQueryParams";
import RangePrice from "../../src/components/prices/RangePrice";
import { startFilterProducts } from "../../src/actions/productsAction";

import {
  startLoadCurrencies,
  startLoadPricesCurrencies,
} from "../../src/actions/countryAcctions";
import SubcategoriesList from "../../src/components/subcategories/SubcategoriesList";

const endpoint = "/products/filter/products-paginated";

const Products = () => {
  const router = useRouter();

  const {
    startSearchByQueryParams,
    starClearQueryParams,
    paramsFilters,
    loading,
    removeQueryParam,
  } = useQueryParams(endpoint, { router });

  const { products, filters } = useSelector((state) => state.products);

  const { logo } = useSelector((state) => state?.administrable);
  const { brands } = useSelector((state) => state?.brands);
  const { categories, subcategories, showSubcategory } = useSelector(
    (state) => state.categories
  );
  const { currencyPrices } = useSelector((state) => state.countries);

  const handelClickPage = (e, value) => {
    startSearchByQueryParams({ page: value });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const origin = typeof window === "undefined" ? "" : window.location.href;

  return (
    <Layout
      title="Wapizima - Productos"
      robots="index, follow"
      keywords={`Wapizima, Productos, ${brands?.map(
        (brand) => brand?.name
      )}, ${categories?.map((category) => category?.name)}`}
      ogTitle="Wapizima - Productos"
      ogType="website"
      description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más."
      ogUrl={origin}
      ogImage={logo}
      canonical={origin}
    >
      <BannerImage title="Productos" banner="bg-banner1" />
      {loading && <LoadingScreen />}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
        <AsideBar>
          <Filters
            starClearQueryParams={starClearQueryParams}
            endpoint={endpoint}
            removeQueryParam={removeQueryParam}
            filters={filters}
          />
          <RangePrice
            startSearchByQueryParams={startSearchByQueryParams}
            paramsFilters={paramsFilters}
            currencyPrices={currencyPrices}
          />
          <BrandsList
            brands={brands}
            startSearchByQueryParams={startSearchByQueryParams}
            paramsFilters={paramsFilters}
          />
          <CategoriesList
            categories={categories}
            startSearchByQueryParams={startSearchByQueryParams}
            paramsFilters={paramsFilters}
          />
          {showSubcategory && (
            <SubcategoriesList
              subcategories={subcategories}
              startSearchByQueryParams={startSearchByQueryParams}
              paramsFilters={paramsFilters}
            />
          )}
        </AsideBar>

        <div className="col-span-4 md:col-span-2 lg:col-span-3">
          <div className={`grid grid-cols-2 lg:grid-cols-3 mb-20 mt-10`}>

            {products?.totalDocs > 0 ? (
              products?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="text-center col-span-full">
                <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">
                  No hay resultados para tu busqueda
                </h4>
              </div>
            )}
                        <a
              href="https://wa.me/7293222418?text=Hola, Estoy interesado en adquirir productos de su marca, me puedes proporcionar más detalles para comprar! "
              target="blank"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2111/2111728.png"
                style={{
                  width: "50px  ",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                }}
              />
            </a>
          </div>
          {(products.hasNextPage || products.hasPrevPage) && (
            <div className="flex justify-center my-10">
              <Stack spacing={2}>
                <Pagination
                  count={products.totalPages}
                  page={products.page}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                  onChange={handelClickPage}
                  size="large"
                />
              </Stack>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const endpoint = "/products/filter/products-paginated";
    if (!Object.keys(ctx.query).length)
      await store.dispatch(
        startFilterProducts(endpoint, undefined, ctx.req.cookies.Currency)
      );
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadBrands());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
    await store.dispatch(startLoadCurrencies());
    await store.dispatch(
      startLoadPricesCurrencies(ctx.req?.cookies?.Currency || "MXN")
    );
  }
);

export default Products;
