import React from "react";
import Axios from "axios";
import Notifier from "../utils/Notifier";
import baseUrl from "../utils/baseUrl";
import Link from "next/link";
import Router from "next/router";

import { handleLogin } from "../utils/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const [loading, setloading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LOGIN_YUP,
    onSubmit: async (values) => {
      setloading(true);

      try {
        let response = await Axios.post(`${baseUrl}/login`, values);
        setloading(false);

        const { token, user } = response.data.result;
        Notifier(response.data.message, "success");
        handleLogin(token, user);
      } catch (err) {
        console.log(err, "err");
        setloading(false);

        Notifier(err.response.data.message, "error");
      }
    },
  });
  return (
    <div className="bg-slate-200 h-screen w-screen">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 bg-slate-100 sm:mx-0">
          <div className="flex flex-col w-full  p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl font--semibold text-center  text-black mb-2">
                Forgot Password
              </h1>
              <div className="w-full mt-4">
                <form className="form-horizontal w-3/4 mx-auto">
                  <div className="flex flex-col ">
                    <input
                      id="email"
                      type="text"
                      className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      name="email"
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

                  <div className="flex flex-col mt-4">
                    <button
                      type="button"
                      onClick={formik.handleSubmit}
                      className="bg-gray-900 hover:bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl"
                    >
                      {loading ? "Submiting.." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});