import React from "react";
import Layout from "../components/_App/Layout";
import Table from "../components/Table";
import baseUrl from "../utils/baseUrl";
import Axios from "axios";
import { customersheadCells } from "../utils/Globals";
export default function Users({ users }) {
  return (
    <Layout>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Customers</h1>
                <p className="card-description"></p>
                <div className="table-responsive">
                  {users && users.length > 0 ? (
                    <Table data={users} rows={customersheadCells} />
                  ) : (
                    "no data found"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
Users.getInitialProps = async ({ Component, ctx, ...values }) => {
  let users = [];
  try {
    const res = await Axios.get(`${baseUrl}/customers`);
    users = res.data.customers;
  } catch (error) {
    users = [];
  }
  return {
    users,
  };
};
