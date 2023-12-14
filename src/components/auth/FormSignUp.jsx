import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { startLoginGoogle } from "../../actions/authActions";

import { GoogleLogin } from "react-google-login";

import { startRegister } from "../../actions/authActions";
import LoadingScreen from "../LoadingScreen";

import {
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";

import helpers from "../../helpers/helpers";
import {
  Error as ErrorIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { startShoppingCartFussion } from "../../actions/shoppingCartActions";

const FormSignUp = () => {
  const [loading, setLoading] = useState();

  const { cart } = useSelector((state) => state.cart);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [checked, setChecked] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (type) => {
    if (type === 1)
      return setShowPassword({
        ...showPassword,
        password: !showPassword.password,
      });
    setShowPassword({
      ...showPassword,
      confirmPassword: !showPassword.confirmPassword,
    });
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const handelRegisterUser = async (formData) => {
    setLoading(true);

    const { hasError, message, token } = await dispatch(
      startRegister(formData)
    );

    if (hasError) {
      setError(true);
      setMessageError(message);
      setTimeout(() => setError(false), 4000);
      setLoading(false);
      return;
    }

    const products = await helpers.prepareProductsToFussion(cart);
    await dispatch(startShoppingCartFussion(products, token));

    const destination = router.query.p?.toString() || "";
    const newRoute = helpers.getLastRoute(destination);
    router.replace(newRoute);
    setLoading(false);
    localStorage.removeItem("cart");
  };

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    policies: false,
  };

  const validationSchema = {
    fullname: Yup.string()
      .min(8, "El nombre debe contener al menos 8 caracteres")
      .required("El nombre es requerido"),
    email: Yup.string()
      .email("El correo no tiene un valido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe contener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    passwordConfirmation: Yup.string()
      .required("Confirma la contraseña")
      .oneOf(
        [Yup.ref("password"), null],
        "Las contraseñas no coinciden. vuelve a intentarlo"
      ),
    policies: Yup.bool()
      .required(
        "Es necesario aceptar las políticas para poder continuar con el registro"
      )
      .required("Las políticas son requeridas"),
    // phone: Yup.string().matches(phoneRegex, "El número de telefono no es valido").required("El numero de telefono es requerido")
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData) => {
      const data = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      };
      handelRegisterUser(data);
    },
  });

  // const [phoneNumber, setPhoneNumber] = useState();
  // const [country, setCountry] = useState();

  const responseGoogle = async ({ tokenId }) => {
    setLoading(true);
    const { hasError, message, token } = await dispatch(
      startLoginGoogle(tokenId)
    );

    if (hasError) {
      setError(true);
      setMessageError(message);
      setTimeout(() => setError(false), 4000);
      setLoading(false);
      return;
    }

    const products = await helpers.prepareProductsToFussion(cart);
    await dispatch(startShoppingCartFussion(products, token));

    const destination = router.query.p?.toString() || "";
    const newRoute = helpers.getLastRoute(destination);
    router.replace(newRoute);
    setLoading(false);
    localStorage.removeItem("cart");
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="mx-auto mt-10">
          <div className="">
            <label className="uppercase mb-5 block">Nombre Completo</label>
            <TextField
              type="text"
              name="fullname"
              onChange={formik.handleChange}
              placeholder="Tú Nombre"
              label="Tu Nombre"
              fullWidth
              required={true}
              error={
                formik.touched.fullname && Boolean(formik.errors.fullname)
                  ? true
                  : undefined
              }
              helperText={
                formik.touched.fullname &&
                formik.errors.fullname &&
                formik.errors.fullname
              }
              autoComplete="off"
            />
          </div>
          <div className="">
            <label className="uppercase my-5 block">Correo Electronico</label>
            <TextField
              type="email"
              name="email"
              label="Correo electrónico"
              required={true}
              onChange={formik.handleChange}
              placeholder="Correo electronico"
              fullWidth
              error={
                formik.touched.email && Boolean(formik.errors.email)
                  ? true
                  : undefined
              }
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                formik.errors.email
              }
              autoComplete="off"
            />
          </div>
          <div className="">
            <label className="uppercase my-5 block">Contraseña</label>
            <TextField
              type={showPassword.password ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              label="Contraseña"
              required={true}
              placeholder="Tú contraseña"
              fullWidth
              error={
                formik.touched.password && Boolean(formik.errors.password)
                  ? true
                  : undefined
              }
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                formik.errors.password
              }
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword(1)}
                    >
                      {showPassword.password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="">
            <label className="uppercase my-5 block">Confirmar Contraseña</label>
            <TextField
              type={showPassword.confirmPassword ? "text" : "password"}
              name="passwordConfirmation"
              onChange={formik.handleChange}
              label="Confirmar contraseña"
              required={true}
              placeholder="Tú contraseña"
              fullWidth
              error={
                formik.touched.passwordConfirmation &&
                Boolean(formik.errors.passwordConfirmation)
                  ? true
                  : undefined
              }
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="flex justify-end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword.confirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {error && (
            <span className="flex items-center mt-10 justify-center">
              <ErrorIcon className="text-red-600 mr-1" />
              <p className="text-red-600 text-sm">{messageError}</p>
            </span>
          )}

          <div className="flex flex-col">
            <FormControlLabel
              control={
                <Checkbox
                  required={true}
                  checked={checked}
                  onChange={(event) => {
                    formik.handleChange(event);
                    setChecked(!checked);
                  }}
                  error={
                    formik.touched.policies && Boolean(formik.errors.policies)
                      ? true
                      : undefined
                  }
                />
              }
              label={
                <>
                  Acepto las{" "}
                  <Link href="/Politicas_de_privacidad.pdf">
                    Políticas de privacidad
                  </Link>
                </>
              }
            />
            {formik.touched.policies && formik.errors.policies ? (
              <span className="text-red-500 text-sm">
                {formik.errors.policies}
              </span>
            ) : null}
          </div>

          <div className="mt-10">
            <button
              className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out"
              type="submit"
            >
              Crear Cuenta
            </button>
            <div className="text-center text-gray-500 text-sm font-semibold my-3">
              <Link
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : "/auth/login"
                }
              >
                <a className="hover:text-gray-900 transition-all duration-700 ease-out">
                  ¿Ya tienes Cuenta?
                </a>
              </Link>
            </div>
          </div>
          <div className="my-5">
            <div className="flex items-center">
              <hr className="w-full h-0.5 bg-gray-200 mr-2" />
              <p className="text-gray-200 font-semibold">O</p>
              <hr className="w-full h-0.5 bg-gray-200 ml-2" />
            </div>
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
              buttonText="Registrarme con Google"
              className="w-full mt-5 py-3"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormSignUp;
