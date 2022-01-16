import React from 'react'
import Axios from "axios"
import Notifier from "../utils/Notifier"
import baseUrl from "../utils/baseUrl"

import { handleLogin } from "../utils/auth"
import { useFormik } from "formik"
import * as Yup from "yup"
export default function Login() {
    const [loading, setloading] = React.useState(false)
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LOGIN_YUP,
      onSubmit: async (values) => {
        setloading(true)

        try {
          let response = await Axios.post(`${baseUrl}/login`, values)
          setloading(false)

          const { token, user } = response.data.data

        //   let path='/'
         

        //   handleLogin(token, user, path)
         
          Notifier(response.data.message, "success")
        } catch (err) {
          setloading(false)

          Notifier(err.response.data.message, "error")
        }
      },
    })
    return (
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div
            className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 bg-transparent sm:mx-0"
            style={{ height: "500px" }}
          >
            <div className="flex flex-col w-full  p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <h1 className="text-4xl font-bold text-center font-thin text-white">
                  Login
                </h1>
                <div className="w-full mt-4">
                  <form className="form-horizontal w-3/4 mx-auto">
                    <div className="flex flex-col mt-4">
                      <input
                        id="email"
                        type="text"
                        className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
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
                      <input
                        id="password"
                        type="password"
                        className="appearance-none block w-full  text-gray-700 rounded-2xl border-2 border-grey-400 py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div className="text-danger pt-1">
                        {formik.touched.password && formik.errors.password ? (
                          <div>{formik.errors.password}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col mt-8">
                      <button
                        type="button"
                        onClick={formik.handleSubmit}
                        className="bg-fuchsia-700 hover:bg-fuchsia-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl"
                      >
                        {loading ? "Loging" : "Login"}
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-4">
                    <a
                      className="no-underline hover:underline text-blue-dark text-xs"
                      href="{{ route('password.request') }}"
                    >
                      Forgot Your Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().max(255).required("Required"),
})