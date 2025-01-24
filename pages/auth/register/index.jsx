import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions'
import { startLoadCurrencies } from '../../../src/actions/countryAcctions'

import FormSignUp from '../../../src/components/auth/FormSignUp'
import Layout from '../../../src/components/Layouts'
import { wrapper } from '../../../src/store'

const Register = () => {

  return (
    <Layout>
      <section className="min-h-screen container mx-auto font-Poppins">
        <div className="grid grid-cols-1 lg:grid-cols-2 my-32 lg:my-40">
          <div className="px-10 lg:px-28">
            <h1 className="uppercase font-bold text-3xl mb-5 text-wapicolor-600 ">Crear Cuenta</h1>
            <h2>Entérate primero que nadie de ofertas especiales, novedades, eventos y más</h2>
            <FormSignUp />
          </div>
          <div className="hidden lg:block bg-register bg-no-repeat bg-cover relative mr-20">
            <div className="text-center bg-gray-900 w-full h-full opacity-50">
            </div>
            <h3 className="inset-y-1/3 px-20 text-4xl font-bold opacity-100 absolute z-20 text-white text-center">Obtén acceso privilegiado a ofertas, nuevos modelos y más.
            </h3>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadCurrencies());
    return {
      revalidate: 3600
    }
  });


export default Register