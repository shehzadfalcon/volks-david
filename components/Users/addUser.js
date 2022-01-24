import React, { useEffect } from "react";
import Axios from "axios";
import Notifier from "../../utils/Notifier";
import baseUrl from "../../utils/baseUrl";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Create(props) {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Detail_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/create-user`,
          data: values,
        });
        props.setusersData(response.data.users);

        props.toggle();

        Notifier(response.data.message, "success");

        // router.push("/profile");
      } catch (err) {
        if (err.response) {
          Notifier(err.response.data.message, "error");
        }
      }
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length <= 11) {
        formik.setFieldValue(name, value.replace(/\D/g, ""));
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <div>
      <form className="w-full  ">
        <div className="lg:flex -mx-3 mb-2">
          <div className=" lg:w-1/2 md:w-full sm:w-full  px-3 mb-6 md:mb-0">
            {/* <label htmlFor="username">Username</label> */}
            <TextInput
              type="text"
              placeholder="First Name"
              id="firstname"
              label="First Name"
              name="firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />
            <div className="text-danger pt-1">
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="formikError">{formik.errors.firstname}</div>
              ) : null}
            </div>
          </div>
          <div className="lg:w-1/2 md:w-full sm:w-full  px-3 mb-6 md:mb-0">
            {/* <label htmlFor="username">Username</label> */}
            <TextInput
              type="text"
              placeholder="Last Name"
              id="lastname"
              label="Last Name"
              name="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
            <div className="text-danger pt-1">
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="formikError">{formik.errors.lastname}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="lg:flex no-wrap -mx-3 mb-3">
          <div className=" lg:w-1/2 md:w-full sm:w-full px-3">
            <TextInput
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="Email"
              label="Email"
              name="email"
              onChange={handleChange}
              value={formik.values.email}
            />
            <div className="text-danger ">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="lg:w-1/2 md:w-full sm:w-full px-3 mb-6 md:mb-0">
            <TextInput
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="phone"
              placeholder="Phone"
              label="Phone"
              name="phone"
              onChange={handleChange}
              value={formik.values.phone}
            />
            <div className="text-danger ">
              {formik.touched.phone && formik.errors.phone ? (
                <div>{formik.errors.phone}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="lg:flex no-wrap -mx-3 mb-0">
          <div className="w-full lg:w-1/2 md:w-full sm:w-full px-3">
            <TextInput
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              onChange={handleChange}
              value={formik.values.password}
            />
            <div className="text-danger ">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="w-full lg:w-1/2 md:w-full sm:w-full px-3 mb-6 md:mb-0">
            <TextInput
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              name="confirm_password"
              onChange={handleChange}
              value={formik.values.confirm_password}
            />
            <div className="text-danger ">
              {formik.touched.confirm_password &&
              formik.errors.confirm_password ? (
                <div>{formik.errors.confirm_password}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="row pb-2 mt-3 ">
          <div className="col-lg-12 text-right">
            <Button onClick={formik.handleSubmit} label="Create" />
          </div>
        </div>
      </form>
    </div>
  );
}

const Detail_YUP = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .min(11, "Phone number length should be 11")
    .required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters long")
    .required("Required"),
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
