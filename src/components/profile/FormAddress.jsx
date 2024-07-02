import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  clearDirection,
  getMinicipilitesPerState,
  getMinicipilitesPerStateToProfile,
  getStates,
  startSaveNewAddress,
  startUpdateAddress,
} from "../../actions/profileActions";
import { errorNotify, successNotify } from "../../helpers/helpers";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import Input, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

const FormAddress = ({ setShowForm, direction, isEditing }) => {
  const dispatch = useDispatch();
  const { country: countrySelected } = useSelector((state) => state.countries);

  const handleKeyPress = (e) => {
    let key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  };

  // const phoneRegex = RegExp(
  //     /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  // );

  const postalCodeRegex = RegExp(/^[A-Za-z0-9\s]+$/g);

  const [states, setStates] = useState(null);
  const [municipalities, setMunicipalities] = useState(null);
  const [country, setCountry] = useState();

  useEffect(() => {
    loadStates();
    if (isEditing) {
      loadMunicipalities(direction?.state?._id);
    }
  }, []);

  const loadStates = async () => {
    const _states = await getStates();
    setStates(_states);
  };

  const loadMunicipalities = async (_id) => {
    const _municipalities = await getMinicipilitesPerState(_id);
    setMunicipalities(_municipalities);
  };

  const handleSaveNewAddress = async (formData) => {
    const { hasError, message } = await dispatch(startSaveNewAddress(formData));

    if (hasError) {
      errorNotify(message);
      return;
    }
    successNotify(message);
    setShowForm(false);
  };

  const handleUpdateAddress = async (formData) => {
    const { hasError, message } = await dispatch(
      startUpdateAddress(formData, direction._id)
    );

    if (hasError) {
      errorNotify(message);
      return;
    }
    successNotify(message);
    setShowForm(false);
  };

  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <FormControl fullWidth required className="w-4/12">
      <InputLabel id="demo">Código</InputLabel>
      <Select
        label="Código *"
        {...rest}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          formik.handleChange(event);
        }}
        labelId="demo"
        id="demo-simple-select-required"
        name="prefix"
        placeholder="Código"
        className="mr-2"
      >
        {getCountries().map((country) => (
          <MenuItem key={country} value={country}>
            {labels[country]} +{getCountryCallingCode(country)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const initialValues = {
    name: direction.name,
    street: direction.street,
    between_street: direction.between_street,
    postalcode: direction.postalcode,
    city: direction.city,
    references: direction.references,
    no_int: direction.no_int,
    no_ext: direction.no_ext,
    ...(countrySelected.name !== "México" && {
      country: direction.country,
    }),
    state: direction?.state?.name,
    municipality: direction?.municipality?.name,
    colony: direction.colony,
    phone_number: direction.phone_number,
    type_direction: countrySelected.name === "México" ? 1 : 2,
    prefix:
      getCountries().find(
        (country) => getCountryCallingCode(country) === direction.prefix
      ) || "",
  };

  const validationSchema = {
    name: Yup.string().required("La nombre de la dirección es requerido"),
    street: Yup.string().required("La calle es requerida"),
    between_street: Yup.string().required("El campo es requerido"),
    postalcode: Yup.string()
      .required("el código postal es requerido")
      .matches(postalCodeRegex, "El código postal no es valido"),
    city: Yup.string().required("La ciudad es requerida"),
    references: Yup.string().required("Las referencias son requeridas"),
    no_ext: Yup.string().required("El número exterior es requerido"),
    no_int: Yup.string(),
    ...(countrySelected.name !== "México" &&
      direction.type_direction !== 1 && {
        country: Yup.string().required("El país es requerido"),
      }),
    state: Yup.string().required("El estado es requerido"),
    municipality: Yup.string().required("El municipio es requerido"),
    colony: Yup.string().required("El municipio es requerido"),
    phone_number: Yup.string()
      .min(10, "El número telefónico debe ser mayor o igual a 10 dígitos")
      .max(10, "El número telefónico no pueder ser mayor a 10 dígitos")
      .required("El numero de telefono es requerido"),
    prefix: Yup.string().required("El código de país es requerido"),
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData) => {
      const { prefix, ...data } = formData;
      const newFormDAta = { ...data, prefix: getCountryCallingCode(prefix) };
      if (isEditing) {
        handleUpdateAddress(newFormDAta);
      } else {
        handleSaveNewAddress(newFormDAta);
      }
      closeModal();
    },
  });

  const handleChangeState = async (e) => {
    const name = e.target.value;
    const _municipalities = await getMinicipilitesPerStateToProfile(name);
    setMunicipalities(_municipalities);
    formik.setFieldValue("municipality", "");
  };
  return (
    <div className="overflow-hidden mx-auto py-8 px-5 bg-white mt-5 animate__animated animate__fadeIn font-Poppins">
      <div className="flex items-center justify-between">
        {!isEditing ? (
          <h2 className="font-bold text-xl mb-10">Nueva Dirección</h2>
        ) : (
          <h2 className="font-bold text-xl mb-10">Editar Dirección</h2>
        )}
        <p
          onClick={() => {
            setShowForm(false);
            dispatch(clearDirection());
          }}
          className="cursor-pointer"
        >
          cancelar
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                label="Nombre"
                required={true}
                variant="outlined"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Nombre"
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.name}
                </span>
              ) : null}
            </FormControl>
          </div>
          {countrySelected.name !== "México" &&
          direction.type_direction !== 1 ? (
            <div className="md:mx-1 mt-4">
              <FormControl fullWidth>
                <TextField
                  label="País"
                  variant="outlined"
                  required={true}
                  name="country"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  placeholder="País"
                />
                {formik.touched.country && formik.errors.country ? (
                  <span className="text-red-500 text-sm">
                    {formik.errors.country}
                  </span>
                ) : null}
              </FormControl>
            </div>
          ) : (
            <></>
          )}
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth required>
              {countrySelected.name === "México" ||
              direction.type_direction === 1 ? (
                <>
                  <InputLabel id="demo-simple-select-required-label">
                    Estado
                  </InputLabel>
                  <Select
                    label="Estado *"
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    name="state"
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleChangeState(e);
                    }}
                    placeholder="Estado"
                    fullWidth
                    value={formik.values.state}
                  >
                    {states?.map((state) => (
                      <MenuItem key={state._id} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  label="Estdo"
                  variant="outlined"
                  required={true}
                  name="state"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  placeholder="Estado"
                />
              )}
              {formik.touched.state && formik.errors.state ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.state}
                </span>
              ) : null}
            </FormControl>
          </div>
          {states && (
            <div className="mt-4 md:mx-1">
              <FormControl fullWidth required>
                {countrySelected.name === "México" ||
                direction.type_direction === 1 ? (
                  <>
                    <InputLabel id="demo-simple-select-required-label1">
                      Municipio
                    </InputLabel>
                    <Select
                      label="Municipio *"
                      labelId="demo-simple-select-required-label1"
                      id="demo-simple-select-municipalities"
                      name="municipality"
                      required={true}
                      onChange={formik.handleChange}
                      placeholder="Municipio"
                      fullWidth
                      value={formik.values.municipality}
                    >
                      {municipalities?.map((municipality) => (
                        <MenuItem
                          key={municipality._id}
                          value={municipality.name}
                        >
                          {municipality.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <TextField
                    label="Municipio"
                    variant="outlined"
                    required={true}
                    name="municipality"
                    onChange={formik.handleChange}
                    value={formik.values.municipality}
                    placeholder="Municipio"
                  />
                )}
                {formik.touched.municipality && formik.errors.municipality ? (
                  <span className="text-red-500 text-sm">
                    {formik.errors.municipality}
                  </span>
                ) : null}
              </FormControl>
            </div>
          )}
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                label="Calle"
                variant="outlined"
                required={true}
                name="street"
                onChange={formik.handleChange}
                value={formik.values.street}
                placeholder="Calle"
              />
              {formik.touched.street && formik.errors.street ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.street}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="between_street"
                onChange={formik.handleChange}
                value={formik.values.between_street}
                placeholder="Entre calle y calle"
                required={true}
                label="Entre calle y calle"
                variant="outlined"
              />
              {formik.touched.between_street && formik.errors.between_street ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.between_street}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="postalcode"
                required={true}
                onChange={formik.handleChange}
                value={formik.values.postalcode}
                placeholder="Código postal"
                label="Código postal"
              />
              {formik.touched.postalcode && formik.errors.postalcode ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.postalcode}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1 flex">
            <CountrySelect
              labels={en}
              value={formik.values.prefix}
              onChange={setCountry}
            />
            <FormControl fullWidth>
              <TextField
                name="phone_number"
                required={true}
                onChange={formik.handleChange}
                onKeyPress={handleKeyPress}
                value={formik.values.phone_number}
                placeholder="Número telefónico"
                label="Número telefónico"
              />
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.phone_number}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="colony"
                required={true}
                onChange={formik.handleChange}
                value={formik.values.colony}
                placeholder="Colonia"
                label="Colonia"
              />
              {formik.touched.colony && formik.errors.colony ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.colony}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="city"
                label="Ciudad"
                onChange={formik.handleChange}
                value={formik.values.city}
                placeholder="ciudad"
                required={true}
              />
              {formik.touched.city && formik.errors.city ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.city}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="references"
                onChange={formik.handleChange}
                value={formik.values.references}
                placeholder="Referencias"
                label="Referencias"
                required={true}
              />
              {formik.touched.references && formik.errors.references ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.references}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="no_ext"
                onChange={formik.handleChange}
                value={formik.values.no_ext}
                placeholder="No. Exterior"
                onKeyPress={handleKeyPress}
                required={true}
                label="No.exterior"
              />
              {formik.touched.no_ext && formik.errors.no_ext ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.no_ext}
                </span>
              ) : null}
            </FormControl>
          </div>
          <div className="mt-4 md:mx-1">
            <FormControl fullWidth>
              <TextField
                name="no_int"
                onChange={formik.handleChange}
                placeholder="No. Interior"
                onKeyPress={handleKeyPress}
                value={formik.values.no_int}
                label="No. Interior"
              />
              {formik.touched.no_int && formik.errors.int ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.int}
                </span>
              ) : null}
            </FormControl>
          </div>
        </div>
        {!isEditing ? (
          <button
            className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
            type="submit"
          >
            Guardar Dirección
          </button>
        ) : (
          <button
            className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
            type="submit"
          >
            Actualizar Dirección
          </button>
        )}
      </form>
    </div>
  );
};

export default FormAddress;
