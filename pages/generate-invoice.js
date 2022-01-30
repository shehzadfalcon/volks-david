import React, { useState } from "react";
import Layout from "../components/_App/Layout";
import EditableTable from "../components/EditableTable";
import { useFormik } from "formik";
import Axios from "axios";
import baseUrl from "../utils/baseUrl";
import * as Yup from "yup";
export default function GenerateInvoice() {
  const formik = useFormik({
    initialValues: {
      from_name: "",
      from_email: "",
      from_phone: "",
      from_address: "",
      from_ntnNum: "",
      from_incNum: "",
      from_invoiceNum: "",
      from_logo: "",
      to_name: "",
      to_email: "",
      to_phone: "",
      to_address: "",
      to_payment: "",
      to_accountTitle: "",
      to_accountNum: "",
      from_sign: "",
    },
    validationSchema: Detail_YUP,
    onSubmit: async (values) => {
      // setsubmitting(true);
    },
  });
  const hiddenFileInput = React.useRef(null);
  const [showImage, setShowImage] = useState(
    "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
  );
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChangeImage = async (event) => {
    const fileUploaded = event.target.files[0];
    let form_data = new FormData();
    form_data.append("file", fileUploaded);
    try {
      let response = await Axios({
        method: "post",
        url: `${baseUrl}/fileUploader`,
        data: form_data,
      });

      formik.setFieldValue("from_logo", response.data.uri);
      var reader = new FileReader();
      reader.readAsDataURL(fileUploaded);
      reader.onload = function (e) {
        // console.log(reader.result);
        setShowImage(reader.result);
      };
    } catch (error) {
      console.log(error);
    }
  };
  const hiddenSignInput = React.useRef(null);
  const [showSign, setShowSign] = useState(
    "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
  );
  const handleSignClick = (event) => {
    hiddenSignInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChangeSign = async (event) => {
    const fileUploaded = event.target.files[0];
    let form_data = new FormData();
    form_data.append("file", fileUploaded);
    try {
      let response = await Axios({
        method: "post",
        url: `${baseUrl}/fileUploader`,
        data: form_data,
      });

      formik.setFieldValue("from_sign", response.data.uri);
      var reader = new FileReader();
      reader.readAsDataURL(fileUploaded);
      reader.onload = function (e) {
        // console.log(reader.result);
        setShowSign(reader.result);
      };
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "from_phone" ||
      name == "to_phone" ||
      name === "to_accountNum"
    ) {
      if (value.length <= 11) {
        formik.setFieldValue(name, value.replace(/\D/g, ""));
      }
    } else if (
      name === "from_ntnNum" ||
      name === "from_incNum" ||
      name === "from_invoiceNum"
    ) {
      formik.setFieldValue(name, value.replace(/\D/g, ""));
    } else {
      formik.setFieldValue(name, value);
    }
  };
  return (
    <Layout>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-2xl">From</h2>

                  <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      placeholder="Name"
                      name="from_name"
                      onChange={formik.handleChange}
                      value={formik.values.from_name}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_name && formik.errors.from_name ? (
                        <div className="formikError">
                          {formik.errors.from_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      name="from_email"
                      onChange={formik.handleChange}
                      value={formik.values.from_email}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_email && formik.errors.from_email ? (
                        <div className="formikError">
                          {formik.errors.from_email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">Phone</label>
                    <input
                      type="text"
                      name="from_phone"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={formik.values.from_phone}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_phone && formik.errors.from_phone ? (
                        <div className="formikError">
                          {formik.errors.from_phone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Address"
                      name="from_address"
                      onChange={formik.handleChange}
                      value={formik.values.from_address}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_address &&
                      formik.errors.from_address ? (
                        <div className="formikError">
                          {formik.errors.from_address}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">NTN</label>
                    <input
                      type="text"
                      name="from_ntnNum"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="NTN Number"
                      onChange={handleChange}
                      value={formik.values.from_ntnNum}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">INC</label>
                    <input
                      type="text"
                      name="from_incNum"
                      onChange={handleChange}
                      value={formik.values.from_incNum}
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="INC Number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Invoice No"
                      name="from_invoiceNum"
                      onChange={formik.handleChange}
                      value={formik.values.from_invoiceNum}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_invoiceNum &&
                      formik.errors.from_invoiceNum ? (
                        <div className="formikError">
                          {formik.errors.from_invoiceNum}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Upload Logo</label>
                    <img
                      onClick={handleClick}
                      src={showImage}
                      alt=""
                      style={{
                        width: "80px",
                        objectFit: "fill",
                        height: "80px",
                        borderRadius: "5px",
                      }}
                    />
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleChangeImage}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_logo && formik.errors.from_logo ? (
                        <div className="formikError">
                          {formik.errors.from_logo}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Upload Sign</label>
                    <img
                      onClick={handleSignClick}
                      src={showSign}
                      alt=""
                      style={{
                        width: "80px",
                        objectFit: "fill",
                        height: "80px",
                        borderRadius: "5px",
                      }}
                    />
                    <input
                      type="file"
                      ref={hiddenSignInput}
                      onChange={handleChangeSign}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.from_sign && formik.errors.from_sign ? (
                        <div className="formikError">
                          {formik.errors.from_sign}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-2xl">To</h2>

                  <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      placeholder="Name"
                      name="to_name"
                      onChange={formik.handleChange}
                      value={formik.values.to_name}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_name && formik.errors.to_name ? (
                        <div className="formikError">
                          {formik.errors.to_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      name="to_email"
                      onChange={formik.handleChange}
                      value={formik.values.to_email}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_email && formik.errors.to_email ? (
                        <div className="formikError">
                          {formik.errors.to_email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">Phone</label>
                    <input
                      type="text"
                      name="to_phone"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={formik.values.to_phone}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_phone && formik.errors.to_phone ? (
                        <div className="formikError">
                          {formik.errors.to_phone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Address"
                      name="to_address"
                      onChange={handleChange}
                      value={formik.values.to_address}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_address && formik.errors.to_address ? (
                        <div className="formikError">
                          {formik.errors.to_address}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">
                      Payment Method
                    </label>
                    <input
                      type="text"
                      name="to_payment"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="JazzCash"
                      onChange={formik.handleChange}
                      value={formik.values.to_payment}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_payment && formik.errors.to_payment ? (
                        <div className="formikError">
                          {formik.errors.to_payment}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">
                      Account Title
                    </label>
                    <input
                      type="text"
                      name="to_accountTitle"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Account Title"
                      onChange={formik.handleChange}
                      value={formik.values.to_accountTitle}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_accountTitle &&
                      formik.errors.to_accountTitle ? (
                        <div className="formikError">
                          {formik.errors.to_accountTitle}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">
                      Account No
                    </label>
                    <input
                      type="text"
                      name="to_accountNum"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Account Number"
                      onChange={handleChange}
                      value={formik.values.to_accountNum}
                    />
                    <div className="text-danger pt-1">
                      {formik.touched.to_accountNum &&
                      formik.errors.to_accountNum ? (
                        <div className="formikError">
                          {formik.errors.to_accountNum}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="table-responsive">
                  <EditableTable formik={formik} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Detail_YUP = Yup.object({
  from_name: Yup.string().required("Required"),
  from_email: Yup.string().email("Invalid email address").required("Required"),
  from_phone: Yup.string()
    .min(11, "Phone number length should be 11")
    .required("Required"),
  from_address: Yup.string().required("Required"),

  from_invoiceNum: Yup.string().required("Required"),
  to_name: Yup.string().required("Required"),
  to_email: Yup.string().email("Invalid email address").required("Required"),
  to_phone: Yup.string()
    .min(11, "Phone number length should be 11")
    .required("Required"),
  to_address: Yup.string().required("Required"),
  to_payment: Yup.string().required("Required"),
  to_accountTitle: Yup.string().required("Required"),
  to_accountNum: Yup.string()
    .min(11, "Account number length should be 11")
    .required("Required"),
  from_logo: Yup.string().required("Required"),
  from_sign: Yup.string().required("Required"),
});
