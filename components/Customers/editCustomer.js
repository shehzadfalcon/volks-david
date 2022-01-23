import React, { useEffect } from "react";
import Axios from "axios";
import Notifier from "../../utils/Notifier";
import baseUrl from "../../utils/baseUrl";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function Create(props) {
  const Router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Detail_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/edit-customer/${props.editId}`,
          data: values,
        });
        Router.reload();

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
      formik.setFieldValue(name, value.replace(/\D/g, ""));
    } else {
      formik.setFieldValue(name, value);
    }
  };
  useEffect(() => {
    if (props.editData) {
      Object.keys(props.editData).map((dt) =>
        formik.setFieldValue(dt, props.editData[dt])
      );
    }
  }, []);
  return (
    <div>
      <form className="w-full  ">
        <div className="lg:flex  -mx-3 mb-2">
          <div className=" lg:w-1/2 md:w-full  px-3 mb-6 md:mb-0">
            {/* <label htmlFor="username">Username</label> */}
            <TextInput
              type="text"
              placeholder=" Name"
              id="name"
              label=" Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div className="text-danger pt-1">
              {formik.touched.name && formik.errors.name ? (
                <div className="formikError">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

          <div className=" lg:w-1/2 md:w-full px-3">
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
        </div>
        <div className="lg:flex no-wrap -mx-3 mb-0">
          <div className=" lg:w-1/2 md:w-full px-3 mb-6 md:mb-0">
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
          <div className=" lg:w-1/2 md:w-full px-3 mb-6 md:mb-0">
            <TextInput
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="address"
              placeholder="Address"
              label="Address"
              name="address"
              onChange={handleChange}
              value={formik.values.address}
            />
            <div className="text-danger ">
              {formik.touched.address && formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="row pb-2 mt-3 ">
          <div className="col-lg-12 text-right">
            <Button onClick={formik.handleSubmit} label="Update" />
          </div>
        </div>
      </form>
    </div>
  );
}

const Detail_YUP = Yup.object({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.number()
    .min(11, "Phone number length should be 11")
    .required("Required"),
});
