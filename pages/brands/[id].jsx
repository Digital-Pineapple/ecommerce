import { useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import { startLoadBrand } from '../../src/actions/brandsActions';
import { startLoadCategories } from '../../src/actions/categoryActions';
import Layout from '../../src/components/Layouts';
import CategoriesList from '../../src/components/categories/CategoriesList';
import Card from '../../src/components/Layouts/Card';
import { useDispatch } from 'react-redux';
import { removeCategory, clearAll } from '../../src/actions/productsAction';

const Show = () => {

    const { brand } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.categories);
    const { categoriesSelected } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    const handleRemoveCategory = (category) => {
        dispatch(removeCategory(category));
    }
    const handleClearFilters = () => {
        dispatch(clearAll());
    }
    const products = [
        { id: "1", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "2", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "3", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "4", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "5", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "6", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "7", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "8", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "9", name: "hola mundo", short_description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
    ];

    return (
        <Layout>
            <section>
                <h1 className="text-center uppercase text-2xl bg-gray-50 py-3 mt-10 font-bold container mx-auto my-10">{brand.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="p-5">
                        <div className="p-4 md:h-screen w-full">
                            <div className="mb-5">
                                <p className="uppercase font-bold text-xl">Seleccion actual</p>
                                <div className="flex flex-row-reverse text-xs">
                                    <span className="inline-flex text-gray-500 hover:text-black cursor-pointer items-center"
                                        onClick={handleClearFilters}
                                    >
                                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                                        <p>Limpiar todo</p>
                                    </span>
                                </div>
                                <div>
                                    {
                                        categoriesSelected?.map((param) => (
                                            <span className="hover:border-black hover:text-black cursor-pointer 
                            mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                                                key={param?._id}
                                            >
                                                {param?.name}
                                                <CloseIcon className="hover:text-red-500" sx={{ fontSize: 15 }} onClick={() => handleRemoveCategory(param)} />
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                            <CategoriesList categories={categories} />
                        </div>
                    </div>
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {
                            products.map(product => (
                                <Card product={product} key={product.id} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadBrand(ctx.query.id));
        await store.dispatch(startLoadCategories());
    })

export default Show;