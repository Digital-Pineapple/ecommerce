import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { startLoginEmailPassword } from "../../actions/authActions";
import { startLoginGoogle } from "../../actions/authActions";
import LoadingScreen from "../LoadingScreen";

import { GoogleLogin } from 'react-google-login';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Error as ErrorIcon, Visibility, VisibilityOff } from '@mui/icons-material';

import { helpers } from '../../helpers';
import { startShoppingCartFussion } from "../../actions/shoppingCartActions";



export const FormSignIn = () => {

    const router = useRouter()
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { cart } = useSelector(state => state.cart);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = (type) => {
        setShowPassword(!showPassword)
    };

    const handleLoginUser = async (formData) => {

        setLoading(true)
        const { hasError, token } = await dispatch(startLoginEmailPassword(formData));

        if (hasError) {
            setError(true);
            setTimeout(() => setError(false), 4000);
            setLoading(false);
            return;
        }

        const products = await helpers.prepareProductsToFussion(cart);
        await dispatch(startShoppingCartFussion(products, token))

        const destination = router.query.p?.toString() || '';
        const newRoute = helpers.getLastRoute(destination);
        router.replace(newRoute);
        setLoading(false);
        localStorage.removeItem('cart');
    }

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = {
        email: Yup.string().email("La dirección de correo no es valida").required("El correo es requerido"),
        password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida")
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleLoginUser(formData);
        }
    });

    const responseGoogle = async ({ tokenId }) => {

        setLoading(true);
        const { hasError, token } = await dispatch(startLoginGoogle(tokenId));

        if (hasError) {
            setError(true);
            setTimeout(() => setError(false), 4000);
            setLoading(false);
            return;
        }

        const products = helpers.prepareProductsToFussion(cart);
        await dispatch(startShoppingCartFussion(products, token));

        const destination = router.query.p?.toString() || '';
        const newRoute = helpers.getLastRoute(destination);
        router.replace(newRoute);
        setLoading(false);
        localStorage.removeItem('cart');
    }

    return (
        <>
            {loading && <LoadingScreen />}
            <form onSubmit={formik.handleSubmit}>
                <div className="pb-3">
                    <label className="uppercase my-5 block">Correo electronico</label>
                    <TextField
                        type="email"
                        name="email"
                        required={true}
                        label="Correo electrónico"
                        onChange={formik.handleChange}
                        placeholder="Correo electronico"
                        fullWidth
                        error={formik.touched.email && formik.errors.email ? true : false}
                        helperText={formik.touched.email && formik.errors.email && formik.errors.email}

                    />

                </div>
                <div className="pb-3">
                    <label className="uppercase my-5 w-full block">Contraseña</label>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required={true}
                        label="Contraseña"
                        onChange={formik.handleChange}
                        placeholder="Contraseña"
                        fullWidth
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={formik.touched.password && formik.errors.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton className="flex justify-end"
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}


                    />
                </div>
                {
                    error &&
                    (
                        <span className="flex items-center mt-1">
                            <ErrorIcon
                                className="text-red-600 mr-1"
                            />
                            <p className="text-red-600 text-sm">Correo electrónico o contraseña incorrectos, intenta de nuevo.</p>
                        </span>
                    )
                }
                <div className="text-right text-gray-500 text-sm font-semibold my-3">
                    <Link href='/auth/forgot-password'>
                        <a className="hover:text-gray-900 transition-all duration-700 ease-out">¿Has olvidado la contraseña?</a>
                    </Link>
                </div>
                <div>
                    <button className=" bg-luz w-full text-wapicolor-700 py-4 uppercase hover:bg-wapicolor-600 hover:text-luz border border-l-2 border-b-4 border-wapicolor-600  transition-all duration-700 ease-in-out rounded-md"
                        type="submit"
                    >
                        Iniciar Sesion
                    </button>
                </div>
                <div className="my-5">
                    <div className="flex items-center">
                        <hr className="w-full h-0.5 bg-gray-200 mr-2" />
                        <p className="text-gray-200 font-semibold">O</p>
                        <hr className="w-full h-0.5 bg-gray-200 ml-2" />
                    </div>
                    <GoogleLogin
                        clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
                        buttonText="Iniciar con Google"
                        className="w-full mt-5 py-3"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </form>
        </>
    );
}