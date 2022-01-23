import React, { useEffect } from "react";
import Layout from "../components/_App/Layout";
import Table from "../components/Table";
import baseUrl from "../utils/baseUrl";
import Axios from "axios";
import Button from "../components/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import Modal from "../components/Modals";
import AddCustomer from "../components/Customers/addCustomer";
import EditCustomer from "../components/Customers/editCustomer";

import { customersheadCells } from "../utils/Globals";
export default function Users({ users }) {
  const Router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [customersData, setcustomersData] = React.useState([]);
  const [editmodal, seteditModal] = React.useState(false);
  const [editId, seteditId] = React.useState(false);
  const [editData, seteditData] = React.useState("");

  const toggle = () => setModal(!modal);
  const editToggle = () => seteditModal(!editmodal);

  useEffect(() => {
    if (users && users.length > 0) {
      setcustomersData(users);
    }
  }, [modal]);
  const handleDelete = async (id) => {
    if (id) {
      try {
        let response = await Axios({
          method: "delete",
          url: `${baseUrl}/delete-customer/${id}`,
        });
        Router.reload();

        Notifier(response.data.message, "success");

        // router.push("/profile");
      } catch (err) {
        if (err.response) {
          Notifier(err.response.data.message, "error");
        }
      }
    }
  };
  const handleEdit = (id) => {
    if (id) {
      seteditId(id);
      let temp = customersData.find((dt) => dt._id === id);
      seteditData(temp);
    }
    editToggle();
  };
  return (
    <>
      <Modal
        size="lg"
        title="Add Customer"
        modal={modal}
        toggle={toggle}
        content={<AddCustomer toggle={toggle} />}
      />
      <Modal
        size="lg"
        title="Add User"
        modal={editmodal}
        toggle={editToggle}
        content={
          <EditCustomer
            toggle={editToggle}
            editId={editId}
            editData={editData}
          />
        }
      />
      <Layout>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="flex px-2 place-content-between flex-wrap">
                    <h1 className="card-title text-2xl">Customers</h1>
                    <Button
                      icon={<AddIcon />}
                      onClick={toggle}
                      label="Create"
                    />
                  </div>
                  <div className="table-responsive">
                    {customersData && customersData.length > 0 ? (
                      <Table
                        data={customersData}
                        rows={customersheadCells}
                        onDelete={handleDelete}
                        onEdit={handleEdit}

                      />
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
    </>
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
