import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { startLoadCurrencies } from '../../src/actions/countryAcctions';
import { startLoadFaqsCategories } from '../../src/actions/faqsActions';
import { startSearchProduct } from '../../src/actions/productsAction';
import { wrapper } from '../../src/store';

import Layout from '../../src/components/Layouts';
import { ProductCard } from '../../src/components/ui';

import LoadingScreen from '../../src/components/LoadingScreen';
const Search = () => {

  const currency = Cookies.get('Currency') || 'MXN';

  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const loadQuery = async () => {
    setLoading(true);
    await dispatch(startSearchProduct(router.query.search, currency))
    setLoading(false);
  }
  useEffect(() => {
    loadQuery();
    console.log("Me ejecute")
  }, [router.query]);

  const { categories } = useSelector(state => state.faqs);
  const { searchedProducts } = useSelector(state => state.products);

  return (
    <Layout categories={categories}>
      <section className="min-h-screen font-Poppins container mx-auto">
        {loading && <LoadingScreen />}
        <div className="px-3 md:px-0">
          <h2 className="text-4xl mt-28 mb-10">Mostrando resultados para {router.query.search}</h2>
          <div className="flex flex-row-reverse text-gray-500">
            <p>{searchedProducts.length} {searchedProducts.length > 1 ? 'resultados' : 'resultado'} para tu busqueda</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 my-20">
          {
            searchedProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              
            ))
          }
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadCurrencies());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());

    return {
      revalidate: 3600
    }

  })
export default Search