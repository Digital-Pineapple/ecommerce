import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { startLoadCategories } from '../../src/actions/categoryActions';
import { Newsletter } from '../../src/components/home';
import Layout from '../../src/components/Layouts';
import { CardProduct } from '../../src/components/ui';
import { BannerImage } from '../../src/components/ui/bannerImage';
import client from '../../src/config/axiosConfig';
import { wrapper } from '../../src/store';

const Categories = () => {
    const history = useRouter();
    const {categories} = useSelector((state)=>state.categories);

    const handleClickCard = (url) =>{
        history.push(`/categorias/${url}`)
    }

    return (
        <Layout 
          title="Wapizima - Categorias"
          robots="noindex"
        >
           <BannerImage
              title="Colecciones"
           />
                <section className="container mx-auto relative mt-20 max-w-[1290px]">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6'>
                    {categories?.map((category) => (
                        <CardProduct
                          key={category?._id}
                          image={category.imageWeb}
                          name={category?.name}
                          url={category?.url}
                          titleButton="Ver más..."
                          handleClickCard={handleClickCard}
                          height={300}
                          width={400}
                        />
                    ))}
                    </div>
                </section>
            <Newsletter/>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadAdministrableLogo());
    return{
        revalidate:3600
    }
});


export default Categories;