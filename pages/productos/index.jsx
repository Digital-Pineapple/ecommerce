import { useSelector, useDispatch } from "react-redux";
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

import { useEffect, useState } from "react";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CategoriesList from "../../src/components/categories/CategoriesList";
import BrandsList from "../../src/components/brands/BrandsList";
import TagsList from "../../src/components/tags/TagsList";
import LoadingScreen from "../../src/components/LoadingScreen";
import Filters from "../../src/components/products/Filters";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";

import { shoppingCartNotLoggedfromLocalStorage } from "../../src/actions/shoppingCartActions";

import { useQueryParams } from "../../src/hooks/useQueryParams";
import RangePrice from "../../src/components/prices/RangePrice";
import { startFilterProducts } from "../../src/actions/productsAction";

const endpoint = "/products/filter/products-paginated";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { startSearchByQueryParams, starClearQueryParams, paramsFilters } = useQueryParams(endpoint, { router });

  const { products, results, filters } = useSelector((state) => state.products);

  const { logged } = useSelector((state) => state.auth);
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);
  const { categories: CategoriesFaqs } = useSelector((state) => state.faqs);

  const [loading, setLoading] = useState(false);

  const handelClickPage = async (e, value) => {
    await startSearchByQueryParams({ page: value });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout
      title="Wapizima - Productos"
      robots="index, follow"
      categories={CategoriesFaqs}
    >
      <BannerImage title="Productos" banner="bg-banner1" />
      {loading && <LoadingScreen />}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
        <AsideBar>
          <Filters 
            starClearQueryParams={starClearQueryParams}
            endpoint={endpoint} 
           />
          <RangePrice 
            startSearchByQueryParams={startSearchByQueryParams} 
            paramsFilters={paramsFilters}
          />
          <BrandsList
            brands={brands}
            setLoading={setLoading}
            startSearchByQueryParams={startSearchByQueryParams}
            paramsFilters={paramsFilters}
          />
          <CategoriesList
            categories={categories}
            setLoading={setLoading}
            startSearchByQueryParams={startSearchByQueryParams}
            paramsFilters={paramsFilters}
          />
          {/* <TagsList tags={tags} setLoading={setLoading} /> */}
        </AsideBar>
        <div className="col-span-4 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 mt-10">
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
    await store.dispatch(startFilterProducts("/products/filter/products-paginated"));
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadBrands());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
  }
);

export default Products;
