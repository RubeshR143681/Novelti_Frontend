import { Divider } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/user.actions";
import { useState, useEffect } from "react";
import axios from "axios";

const UserEdit = ({ setEdit, editData }) => {
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  console.log("hi ia editData==>", editData);

  const initialValues = {
    first_name: editData.first_name,
    last_name: editData.last_name,
    email_id: editData.email_id,
    mobile_no: editData.mobile_no.substring(editData.mobile_no.indexOf(" ") + 1),
    address_1: editData.address_1,
    country: editData.country,
    state: editData.state,
    zip_code: editData.zip_code,
    country_code: editData.mobile_no.substring(0,editData.mobile_no.indexOf(" ")),
  };

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJydWJlc2hyODFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibUlfd0txTm1KYjdXLTNWMzY1clZETTZ0RlEwbmtvYVdYbE1uVTdPQmFxZHpYd1VpeVVNVFYyMUI4ZFAzZ1h1aVdnUSJ9LCJleHAiOjE3MDI3ODY4Mzh9.XePstgFEYV7pFgT-T0pQTp8RHfxchQb-3OPt1FHhi0M`,
    },
  };

  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/countries/", config)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries", error);
      });
  }, []);

  const handleCountryChange = (contrycode) => {
    if (contrycode) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${contrycode}`,
          config
        )
        .then((response) => {
          setStates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching states", error);
        });
    } else {
      setStates([]); 
    }
  };

  const UserSchema = Yup.object().shape({
    first_name: Yup.string().min(5).required("Firstname is required"),
    last_name: Yup.string().min(5).required("Lastname is required"),
    email_id: Yup.string()
      .email("Email is wrong formate")
      .required("Email Id is required"),
    address_1: Yup.string().required("Address is reqired"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string()
      .matches(/^[0-9]+$/, "Zip code must contain only numbers")
      .required("Zip code is required"),
    country: Yup.string().required("Country is required"),
    mobile_no: Yup.string()
      .min(10)
      .matches(/^[0-9]+$/, "Mobile Number contain only numbers"),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: UserSchema,
    onSubmit: (val) => {
      const formattedMobileNo = `${val.country_code} ${val.mobile_no}`;
      setFieldValue("mobile_no", formattedMobileNo);
      console.log("this is the alll value", val);
      dispatch(
        updateUser({ ...val, mobile_no: formattedMobileNo }, editData.id)
      );
      setEdit(false);
    },
  });


  useEffect(() => {
    axios
      .get(
        `https://www.universal-tutorial.com/api/states/${values.country}`,
        config
      )
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      });
  }, []);

  

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="text-[18px] font-bold">Edit User</div>
            <div className="flex flex-col lg:flex lg:flex-row gap-[10px]">
              <button
                type="submit"
                className="bg-blue-500 text-white h-[30px] w-[70px] hover:bg-blue-600 rounded font-semibold">
                Submit
              </button>
              <button
                onClick={() => setEdit(false)}
                className="bg-transparent border border-red-400  text-red-400 h-[30px] w-[70px] hover:text-white hover:bg-red-500 rounded font-semibold">
                Cancle
              </button>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col lg:flex lg:flex-row lg:gap-[40px] lg:justify-between">
            <div>
              <div className="lg:mb-8 mb-[-20px]  flex flex-col ">
                <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="First Name"
                  type="text"
                  autoComplete="off"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border lg:w-[400px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}
                />
                {errors.first_name && touched.first_name && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.first_name}
                  </span>
                )}
              </div>
              <div className="mb-8  flex flex-col ]">
                <label className="form-label mt-[50px]  font-semibold text-darktext-[14px] lg:text-[16px]">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Name"
                  type="text"
                  autoComplete="off"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border lg:w-[400px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}
                />
                {errors.last_name && touched.last_name && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.last_name}
                  </span>
                )}
              </div>
              <div className="mb-8 flex flex-col ]">
                <label className="form-label font-semibold text-darktext-[14px] lg:text-[16px]">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Email Id"
                  type="text"
                  autoComplete="off"
                  name="email_id"
                  value={values.email_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border lg:w-[400px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}
                />
                {errors.email_id && touched.email_id && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.email_id}
                  </span>
                )}
              </div>
              <div className="mb-8 flex flex-col ]">
                <label className="form-label font-semibold text-darktext-[14px] lg:text-[16px]">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <div className="w-auto flex justify-between items-center gap-[5px]">
                  <div>
                    <select
                      id="country_code"
                      name="country_code"
                      onChange={handleChange}
                      value={values.country_code}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border w-auto  h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}>
                      {countries.map((con) => (
                        <option
                          key={con.country_short_name}
                          value={con.country_phone_code}>
                          {con.country_phone_code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      placeholder="Mobile No"
                      type="text"
                      autoComplete="off"
                      name="mobile_no"
                      value={values.mobile_no.substring(
                        values.mobile_no.indexOf(" ") + 1
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border w-[100%] lg:w-[330px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                  </div>
                </div>

                {errors.mobile_no && touched.mobile_no && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.mobile_no}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-8 flex flex-col ]">
                <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  Address 1<span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Address"
                  type="text"
                  autoComplete="off"
                  name="address_1"
                  value={values.address_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border h-[90px] outline-none lg:w-[400px]  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                {errors.address_1 && touched.address_1 && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.address_1}
                  </span>
                )}
              </div>
              <div className="mb-8">
                <p className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  country <span className="text-red-500">*</span>
                </p>
                <select
                  id="country"
                  name="country"
                  onChange={(e) => {
                    handleChange(e);
                    handleCountryChange(e.target.value);
                  }}
                  value={values.country}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border w-full  h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}>
                  <option value="">Select a country</option>
                  {countries.map((con) => (
                    <option key={con.country_name} value={con.country_name}>
                      {con.country_name}
                    </option>
                  ))}
                </select>
                {errors.country && touched.country && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.country}
                  </span>
                )}
              </div>
              <div className="mb-8">
                <p className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  State <span className="text-red-500">*</span>
                </p>
                <select
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border w-full h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}>
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state.state_name} value={state.state_name}>
                      {state.state_name}
                    </option>
                  ))}
                </select>
                {errors.state && touched.state && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.state}
                  </span>
                )}
              </div>
              <div className="mb-8 flex flex-col ]">
                <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="First Name"
                  type="text"
                  autoComplete="off"
                  name="zip_code"
                  value={values.zip_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border lg:w-[400px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}
                />
                {errors.zip_code && touched.zip_code && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.zip_code}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserEdit;
