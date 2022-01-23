import React from "react";
import Axios from "axios";
import Notifier from "../utils/Notifier";
import baseUrl from "../utils/baseUrl";
import Link from "next/link";

import { handleLogin } from "../utils/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const [loading, setloading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOGIN_YUP,
    onSubmit: async (values) => {
      setloading(true);

      try {
        let response = await Axios.post(`${baseUrl}/login`, values);

        const { token, user } = response.data.result;
        handleLogin(token, user);
        Notifier(response.data.message, "success");

        setTimeout(() => {
          setloading(false);
        }, 2000);
      } catch (err) {
        console.log(err, "err");
        setloading(false);

        Notifier(err.response.data.message, "error");
      }
    },
  });
  return (
    <div className="bg-slate-200 h-screen w-screen ">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 bg-slate-100  sm:mx-0">
          <div className="flex flex-col w-full  p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl font--semibold text-center  text-black mb-2">
                Login
              </h1>
              <div className="w-full mt-4">
                <form className="form-horizontal lg:w-3/4 md:w-full sm:w-full mx-auto">
                  <div className="flex flex-col mb-3">
                    <input
                      id="email"
                      type="text"
                      className="appearance-none block w-full bg-gray  text-gray-700 rounded-3xl border-2 border-grey-500 py-2 px-4  leading-tight  focus:outline-none focus:bg-white"
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <div className="text-danger ">
                      {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col mb-1">
                    <input
                      id="password"
                      type="password"
                      className="appearance-none block w-full  text-gray-700 rounded-3xl border-2 border-grey-400 py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                      name="password"
                      required
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div className="text-danger ">
                      {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm">
                      <Link href="forgot-password">
                        <a
                          href="#"
                          className="font-medium text-indigo-500 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <button
                      type="button"
                      onClick={formik.handleSubmit}
                      className="bg-gray-900 hover:bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl"
                    >
                      {loading ? "Loading.." : "Login"}
                    </button>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <h5 className="text-black">OR</h5>
                  </div>
                  <div className="flex flex-col text-center mt-2">
                    <Link href="/register">
                      <a className="bg-gray-900 hover:bg-gray-900 hover:no-underline text-white text-sm font-semibold py-2 px-4 rounded-2xl">
                        Register
                      </a>
                    </Link>
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
  password: Yup.string().max(255).required("Required"),
});
