import React, { useState, useEffect } from "react";
import Link from "../../utils/ActiveLink";
import { handleLogout, getUser } from "../../utils/auth";
import Axios from "axios";
import Notifier from "../../utils/Notifier";
import baseUrl from "../../utils/baseUrl";
const Navbar = () => {
  const USER = getUser();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getAllNotifications();
  }, []);
  const getAllNotifications = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/notifications`,
      });

      setNotifications(response.data.notifications);
    } catch (err) {
      if (err.response) {
        Notifier(err.response.data.message, "error");
      }
    }
  };
  return (
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link href="/">
          <a className="navbar-brand brand-logo-mini">
            <img src="assets/images/logo-mini.svg" alt="logo" />
          </a>
        </Link>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu" />
        </button>
        <ul className="navbar-nav w-100">
          <li className="nav-item w-100">
            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
              <input
                type="text"
                className="form-control"
                placeholder="Search products"
              />
            </form>
          </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown d-none d-lg-block">
            <a
              className="nav-link btn btn-success create-new-button"
              id="createbuttonDropdown"
              data-toggle="dropdown"
              aria-expanded="false"
              href="#"
            >
              + Create New Project
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="createbuttonDropdown"
            >
              <h6 className="p-3 mb-0">Projects</h6>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-file-outline text-primary" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Software Development
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-web text-info" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    UI Development
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-layers text-danger" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Software Testing
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <p className="p-3 mb-0 text-center">See all projects</p>
            </div>
          </li>

          <li className="nav-item dropdown border-left">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="messageDropdown"
              href="#"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="mdi mdi-email" />
              <span className="count bg-success" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="messageDropdown"
            >
              <h6 className="p-3 mb-0">Messages</h6>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="assets/images/faces/face4.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Mark send you a message
                  </p>
                  <p className="text-muted mb-0"> 1 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="assets/images/faces/face2.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Cregh send you a message
                  </p>
                  <p className="text-muted mb-0"> 15 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="assets/images/faces/face3.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Profile picture updated
                  </p>
                  <p className="text-muted mb-0"> 18 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <p className="p-3 mb-0 text-center">4 new messages</p>
            </div>
          </li>
          <li className="nav-item dropdown border-left">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <i className="mdi mdi-bell" />
              <span className="count bg-danger" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <h6 className="p-3 mb-0">Notifications</h6>
              <div className="dropdown-divider" />
              <div className="h-64 overflow-y-auto">
                {USER &&
                  USER.role == "Admin" &&
                  notifications &&
                  notifications.map((notify) => (
                    <>
                      <a className="dropdown-item preview-item">
                        {/* <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar text-success" />
                      </div>
                    </div> */}
                        <div className="preview-item-content">
                          <p className="preview-subject mb-1">{notify.title}</p>
                          <p className="text-muted ellipsis mb-0">
                            {notify.description}
                          </p>
                        </div>
                      </a>
                      <div className="dropdown-divider" />
                    </>
                  ))}
              </div>
              <div className="dropdown-divider" />

              {/* <div className="dropdown-divider" /> */}
              {/* <p className="p-3 mb-0 text-center">See all notifications</p> */}
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-format-line-spacing" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
