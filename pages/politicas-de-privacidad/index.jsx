import Link from 'next/link';
import Layout from '../../src/components/Layouts';
import { wrapper } from '../../src/store';

import { useSelector } from "react-redux";

import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadCurrencies } from "../../src/actions/countryAcctions";
import { startLoadPolicies } from '../../src/actions/administrableActions';


import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Grid, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Policies = () => {

    const {  policie } = useSelector((state) => state.administrable);

    return (
        <div className="container mx-auto my-20 px-5 lg:px-24 min-h-screen">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<NavigateNextIcon fontSize="small" />}
                >
                    <Link href="/" passHref>
                        <div className="flex items-center justify-between cursor-pointer">
                            <HomeIcon />
                            <span className="text-lg font-Poppins ml-3 ">Inicio</span>
                        </div>
                    </Link>
                    <Typography variant="subtitle1" className="text-base font-Poppins text-[#e91e63]">
                        Politicas de privacidad
                    </Typography>
                </Breadcrumbs>
            </Grid>
            <div>
                <hr className='w-full h-2 my-8 bg-rose-500 border-0' />
                <h3 className='text-center  text-3xl font-bold'>{policie.title}</h3>

                <div
                    className='text-justify mx-4'
                    dangerouslySetInnerHTML={{ __html: policie.text }}></div>
            </div>
        </div>
    )
}

Policies.getLayout = function getLayout(page) {
    return (
        <Layout
            title="Wapizima - Politicas de Privacidad"
            robots="index, follow"
            keywords={`Wapizima, politicas, privacidad, terminos`}
            ogTitle="Wapizima - Politicas de Privacidad"
            ogType="website"
        >
            {page}
        </Layout>
    );
};

export const getStaticProps = wrapper.getStaticProps(
    (store) => async () => {
        await store.dispatch(startLoadPolicies(2));
        await store.dispatch(startLoadCurrencies());
        await store.dispatch(startLoadAdministrableLogo());
        return {
            revalidate: true
        }
    }
);
export default Policies;
