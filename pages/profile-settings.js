import React, { useState, useEffect } from "react";
import { getUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import Notifier from "../utils/Notifier";
import Layout from "../components/_App/Layout";
import Router from "next/router";
import cookie from "js-cookie";

// import { DEFAULT_IMAGE } from "../utils/Globals/index";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
const EditProfile = () => {
  let USER = getUser();

  useEffect(() => {
    if (USER) {
      let { firstname, lastname, email, phone } = USER;
      formik.setFieldValue("firstname", firstname);
      formik.setFieldValue("lastname", lastname);
      formik.setFieldValue("email", email);
      formik.setFieldValue("phone", phone);
      // formik.setFieldValue("password", password);
    }
  }, []);
  const [loading, setloading] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: password ? PASSWORD_REGISTER_YUP : REGISTER_YUP,

    onSubmit: async (values) => {
      setloading(true);

      try {
        let response = await Axios.put(
          `${baseUrl}/edit-profile/${USER._id}`,
          values
        );
        cookie.set("user", JSON.stringify(response.data.user));

        setloading(false);
        Notifier(response.data.message, "success");
      } catch (err) {
        setloading(false);

        Notifier(err.response.data.message, "error");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "phone") {
      if (value.length <= 11) {
        formik.setFieldValue(name, value.replace(/\D/g, ""));
      }
    } else if (name === "password") {
      setPassword(value);
      formik.setFieldValue(name, value);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-200 h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-slate-100 sm:mx-0">
            <div className="flex flex-col w-full  p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <h1 className="text-4xl font--semibold text-center  text-black mb-2">
                  Update Profile
                </h1>
                <div className="w-full mt-4">
                  <form className="form-horizontal lg:w-3/4 md:w-full sm:w-full  mx-auto">
                    <div className="flex flex-col ">
                      <input
                        id="email"
                        type="text"
                        className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="firstname"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.firstname && formik.errors.firstname ? (
                          <div>{formik.errors.firstname}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <input
                        id="lastname"
                        type="text"
                        className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="lastname"
                        required
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.lastname && formik.errors.lastname ? (
                          <div>{formik.errors.lastname}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <input
                        id="phone"
                        type="text"
                        className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="phone"
                        required
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={formik.values.phone}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.phone && formik.errors.phone ? (
                          <div>{formik.errors.phone}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <input
                        id="email"
                        type="email"
                        className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="email"
                        required
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.email && formik.errors.email ? (
                          <div>{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <input
                        id="password"
                        type="text"
                        className="appearance-none block w-full  text-gray-700 rounded-3xl border-2 border-grey-400 py-2 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formik.values.password}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.password && formik.errors.password ? (
                          <div>{formik.errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <input
                        id="confirm_password"
                        type="text"
                        className="appearance-none block w-full  text-gray-700 rounded-3xl border-2 border-grey-400 py-2 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.confirm_password}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.confirm_password &&
                        formik.errors.confirm_password ? (
                          <div>{formik.errors.confirm_password}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <button
                        type="button"
                        onClick={formik.handleSubmit}
                        className="bg-gray-900 hover:bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl"
                      >
                        {loading ? "Submitting" : "Update"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </Layout>
  );
};

export default EditProfile;

const PASSWORD_REGISTER_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  firstname: Yup.string().max(255).required("Required"),
  lastname: Yup.string().max(255).required("Required"),
  phone: Yup.number()
    .min(11, "Phone number length should be 11")
    .required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters long")
    .required("This field is required"),
  confirm_password: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .min(6, "Must be 6 characters long")
    .required("Required"),
});
const REGISTER_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  firstname: Yup.string().max(255).required("Required"),
  lastname: Yup.string().max(255).required("Required"),
  phone: Yup.string()
    .min(11, "Phone number length should be 11")
    .required("Required"),
});
