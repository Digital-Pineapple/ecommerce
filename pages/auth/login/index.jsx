import { useRouter } from 'next/router';

import Link from 'next/link';
import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions';

import { FormSignIn } from '../../../src/components/auth/FormSignIn';
import Layout from '../../../src/components/Layouts';

import { wrapper } from '../../../src/store';

import { startLoadCurrencies } from "../../../src/actions/countryAcctions";


const Login = () => {

  const router = useRouter();

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen mt-24 font-Poppins">
          <div className="px-7">
            <h1 className=" py-4 bg-wapicolor-600 text-luz text-center uppercase font-bold mb-10 md:mt-10">Iniciar Sesión</h1>
            <FormSignIn />
          </div>
          <div className="px-7 mb-44">
            <h1 className="py-4 bg-wapicolor-600 text-luz text-center uppercase font-bold my-10">Nuevo Cliente</h1>
            <h2 className="font-bold my-3 text-lg text-wapicolor-500">Crear una cuenta</h2>
            <p className="text-left font-light">
              Regístrese para obtener una cuenta gratuita en nuestra tienda. Registrarse es facil y rapido. Le permite poder hacer pedidos en nuestra tienda. Para comenzar a comprar, haga clic en crear cuenta.
            </p>
            <Link
              href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
            >
              <a type="submit" className="mt-10 cursor-pointer bg-luz w-5/12 text-wapicolor-600 py-4 uppercase hover:bg-wapicolor-600  transition-all hover:text-luz duration-700 ease-in-out text-center border border-l-2 border-b-4 border-wapicolor-600 rounded-md">Crear cuenta</a>
            </Link>
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
    return{
      revalidate: 3600
    }
  });



export default Login