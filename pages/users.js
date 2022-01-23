import React, { useEffect } from "react";
import Layout from "../components/_App/Layout";
import Table from "../components/Table";
import baseUrl from "../utils/baseUrl";
import Axios from "axios";
import { usersheadCells } from "../utils/Globals";
import AddIcon from "@mui/icons-material/Add";
import Button from "../components/Button";
import Modal from "../components/Modals";
import AddUser from "../components/Users/addUser";
import EditUser from "../components/Users/editUser";

import { useRouter } from "next/router";

export default function Users({ users }) {
  const Router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [editId, seteditId] = React.useState(false);
  const [editData, seteditData] = React.useState("");

  const [usersData, setusersData] = React.useState([]);

  const toggle = () => setModal(!modal);
  const editToggle = () => seteditModal(!editmodal);

  useEffect(() => {
    if (users && users.length > 0) {
      setusersData(users);
    }
  }, []);
  const handleDelete = async (id) => {
    if (id) {
      try {
        let response = await Axios({
          method: "delete",
          url: `${baseUrl}/delete-user/${id}`,
        });
        setusersData(response.data.users);

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
      let temp = usersData.find((dt) => dt._id === id);
      seteditData(temp);
    }
    editToggle();
  };
  return (
    <>
      <Modal
        size="lg"
        title="Add User"
        modal={modal}
        toggle={toggle}
        content={<AddUser toggle={toggle} setusersData={setusersData} />}
      />
      <Modal
        size="lg"
        title="Update User"
        modal={editmodal}
        toggle={editToggle}
        content={
          <EditUser
            toggle={editToggle}
            editId={editId}
            editData={editData}
            setusersData={setusersData}
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
                    <h1 className="card-title text-2xl">Users</h1>
                    <Button
                      icon={<AddIcon />}
                      onClick={toggle}
                      label="Create"
                    />
                  </div>
                  <div className="table-responsive">
                    {usersData && usersData.length > 0 ? (
                      <Table
                        data={usersData}
                        rows={usersheadCells}
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
    const res = await Axios.get(`${baseUrl}/users-list`);
    users = res.data.users;
  } catch (error) {
    users = [];
  }
  return {
    users,
  };
};
