import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableAbout, startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts";
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";

import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { startLoadCurrencies } from "../../src/actions/countryAcctions";

const AboutPage = () => {

  const { aboutUs, mission } = useSelector((state) => state.administrable);

  return (
    <>
      <BannerImage title="Acerca de Nosotros" banner="bg-banner9" />
      <section className="min-h-screen container mx-auto px-5 md:px-0">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-20 gap-4">
            <div className="col-span-2">
              <div className="flex">
                <span className="bg-gray-100 uppercase font-Poppins w-full py-4 text-center text-2xl mb-5">
                  Nuestra Historia
                </span>
              </div>
              <div
                className="font-Poppins text-sm leading-7 text-[#888] pb-6"
                dangerouslySetInnerHTML={{ __html: aboutUs.aboutThat }}
              ></div>
            </div>
            <div className="">
              <img
                src={aboutUs.image}
                className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.02]"
                width={100}
                height={100}
                alt="acerca de nosotros"
                layout="responsive"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10">
            <div className="hidden lg:block">
              <img
                src={mission.image}
                className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.02] "
                width={100}
                height={100}
                alt="acerca de nosotros"
                layout="responsive"
              />
            </div>
            <div className="col-span-2">
              <div className="flex">
                <span className="bg-gray-100 uppercase font-Poppins w-full py-4 text-center text-2xl mb-5">
                  Nuestra Misión
                </span>
              </div>
              <div className="font-Poppins text-sm leading-7 text-[#888] pb-6" dangerouslySetInnerHTML={{ __html: mission.mission }}></div>
            </div>
            <div className="block lg:hidden">
              <img
                src={mission.image}
                className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.02]"
                width={100}
                height={100}
                alt="acerca de nosotros"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

AboutPage.getLayout = function getLayout(page, categories) {
  return (
    <Layout
      title="Wapizima - Acerca de"
      robots="noindex"
      categories={categories}
    >
      {page}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(startLoadCurrencies());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadAdministrableAbout());
    await store.dispatch(startLoadFaqsCategories());
  }
);

export default AboutPage;
