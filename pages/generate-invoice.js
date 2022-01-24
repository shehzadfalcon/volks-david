import React from "react";
import Layout from "../components/_App/Layout";
import EditableTable from "../components/EditableTable";
export default function GenerateInvoice() {
  return (
    <Layout>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-2xl">From</h2>
                  {/* <p className="card-description"> Basic form layout </p> */}

                  <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputConfirmPassword1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-2xl">To</h4>
                  <p className="card-description"> Horizontal form layout </p>
                  <div className="form-group row">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputUsername2"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail2"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="exampleInputMobile"
                      className="col-sm-3 col-form-label"
                    >
                      Mobile
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputMobile"
                        placeholder="Mobile number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="exampleInputPassword2"
                      className="col-sm-3 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="exampleInputConfirmPassword2"
                      className="col-sm-3 col-form-label"
                    >
                      Re Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputConfirmPassword2"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-2xl">From</h2>
                  <EditableTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
