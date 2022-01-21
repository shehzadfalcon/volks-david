import React ,{useEffect}from "react";
import Layout from "../components/_App/Layout";
import Table from "../components/Table";
import baseUrl from "../utils/baseUrl";
import Axios from "axios";
import { usersheadCells } from "../utils/Globals";
import AddIcon from '@mui/icons-material/Add';
import Button from '../components/Button'
import Modal from '../components/Modals'
import AddUser from '../components/Users/addUser'
export default function Users({ users }) {
  const [modal, setModal] = React.useState(false);
  const [usersData, setusersData] = React.useState([]);

  const toggle = () => setModal(!modal);
useEffect(() => {
 if(users && users.length>0){
  setusersData(users)
 }
}, [users,modal])
  return (
    <>
    <Modal
        size="lg"
        title="Add User"
        modal={modal}
        toggle={toggle}
        content={
          <AddUser toggle={toggle}  />
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
              icon={<AddIcon/>}
              onClick={toggle}
              label="Create"
              />
              </div>
                <div className="table-responsive">
                
                  {usersData && usersData.length > 0 ? (
                    <Table data={usersData} rows={usersheadCells} />
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
