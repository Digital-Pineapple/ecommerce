import { startLoadMaintainment } from "../../src/actions/administrableActions"

const Maintainment = () => {

    return (
        <main className="mx-auto min-h-screen font-Poppins bg-maintainment bg-center bg-fixed bg-cover">
            <section className="grid grid-cols-1 md:grid-cols-2 h-full h-full">
                <div className="px-10 py-20 rounded-md text-white flex flex-col items-center">
                    <img
                        src="https://static.wixstatic.com/media/30417d_cf1dc42d05374f218c197ca48871d66a~mv2.png/v1/fill/w_460,h_184,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/30417d_cf1dc42d05374f218c197ca48871d66a~mv2.png"
                        layout="intrinsic"
                        width={300}
                        height={300}
                    />
                    <h1 className="text-6xl pb-5">Vuelve pronto</h1>
                    <h2 className="text-4xl pb-2">¡El sitio web esta en matenimiento!</h2>
                    <p className="text-lg py-1">Estamos trabajando para crear algo sorprendente para tí</p>
                </div>
            </section>
        </main>
    )
}

export async function getServerSideProps() {
    const maintainment = await startLoadMaintainment();

    if (!maintainment) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

export default Maintainment;