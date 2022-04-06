import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../src/store";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AsideBar from "../../src/components/categories/AsideBar";
import Layout from "../../src/components/Layouts";

import { startLoadProductPerPagination, startLoadProducts, startLoadProductsPerBrand, startLoadProductsPerCategory, startloadProductsPerTags } from "../../src/actions/productsAction";
import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { startLoadTags } from "../../src/actions/tagsActions";
import { useRouter } from "next/router";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { ProductCard } from "../../src/components/ui";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";
import { useEffect } from "react";
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CategoriesList from "../../src/components/categories/CategoriesList";
import BrandsList from "../../src/components/brands/BrandsList";
import TagsList from "../../src/components/tags/TagsList";
const Products = () => {

    const { products, filteredProducts, results, filters } = useSelector((state) => state.products);

    const { brands } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.categories);
    const { tags } = useSelector((state) => state.tags);

    const dispatch = useDispatch();
    const router = useRouter();

    const handelClickPage = (e, value) => {
        dispatch(startLoadProductPerPagination(value));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const [storedValue, setValue,] = useLocalStorage('filtersInProducts');


    const getCurrentData = async () => {

        if (router.query.hasOwnProperty('brand')) {
            const brand = await brands.filter(brandSelected => brandSelected._id === router.query.brand);
            await dispatch(startLoadProductsPerBrand(...brand));
        }

        if (router.query.hasOwnProperty('category')) {
            const category = await categories.filter(categorySelected => categorySelected._id === router.query.category);
            await dispatch(startLoadProductsPerCategory(...category));
        }

        if (router.query.hasOwnProperty('tag')) {
            const tag = await tags.filter(tagSelected => tagSelected._id === router.query.tag);
            await dispatch(startloadProductsPerTags(...tag));
        }

    }

    useEffect(() => {

        if (Object.keys(router.query).length !== 0) {
            setValue(router.asPath)
            return;
        }
        
        localStorage.removeItem('filtersInProducts')

    }, [router.asPath]);


    useEffect(() => {
        if (router.asPath === storedValue && Object.keys(router.query).length !== 0) {
            getCurrentData();
            console.log("Me ejecute xD")
        }
    }, [router.query]);

    return (
        <Layout
            title="Wapizima - Productos"
            robots="noindex"
        >
            <BannerImage
                title="Productos"
            />
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <BrandsList brands={brands} />
                    <CategoriesList categories={categories} />
                    <TagsList tags={tags} />
                </AsideBar>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    {
                        Object.keys(results).length !== 0 && (
                            <p className="text-gray-900 px-2 text-lg">
                                {results.quantity} {results.quantity > 1 ? 'resultados' : 'resultado'}  sobre {results.name}
                            </p>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 mt-10">
                        {
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))
                            ) : (
                                products.products?.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            )
                        }
                    </div>
                    {
                        !filteredProducts.length > 0 && (
                            <div className="flex justify-center my-10">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={products.totalPages}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                {...item}
                                            />
                                        )}
                                        onChange={handelClickPage}
                                        size="large"
                                    />
                                </Stack>
                            </div>
                        )
                    }
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadProducts());
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadBrands());
        await store.dispatch(startLoadTags());
        await store.dispatch(startLoadAdministrableLogo());

    })

export default Products;

