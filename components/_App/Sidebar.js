import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <Link href="/dashboard">
          <a className="sidebar-brand brand-logo text-white">VolksAndDavid</a>
        </Link>
        <Link href="/dashboard">
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <img src="assets/images/logo-mini.svg" alt="logo" />
          </a>
        </Link>
      </div>
      <ul className="nav">
        {/* <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle "
                  src="assets/images/faces/face15.jpg"
                  alt=""
                />
                <span className="count bg-success" />
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">Henry Klein</h5>
                <span>Gold Member</span>
              </div>
            </div>
            <a href="#" id="profile-dropdown" data-toggle="dropdown">
              <i className="mdi mdi-dots-vertical" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
              aria-labelledby="profile-dropdown"
            >
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-primary" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">
                    Account settings
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-onepassword  text-info" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">
                    Change Password
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-calendar-today text-success" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">
                    To-do list
                  </p>
                </div>
              </a>
            </div>
          </div>
        </li> */}
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>
        <li className="nav-item menu-items">
          <Link href="/dashboard">
            <a className="nav-link" href="index.html">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer" />
              </span>
              <span className="menu-title">Dashboard</span>
            </a>
          </Link>
        </li>
        <li className="nav-item menu-items">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#auth"
            aria-expanded="false"
            aria-controls="auth"
          >
            <span className="menu-icon">
              <i className="mdi mdi-security" />
            </span>
            <span className="menu-title">Invoice</span>
            <i className="menu-arrow" />
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link href="/customers">
                  <a
                    className="nav-link"
                    href="../../pages/samples/blank-page.html"
                  >
                    {" "}
                    Customers
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link href="/generate-invoice">
                  <a
                    className="nav-link"
                    href="../../pages/samples/error-404.html"
                  >
                    {" "}
                    Generate Invoice
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link href="/invoice-list">
                  <a
                    className="nav-link"
                    href="../../pages/samples/error-500.html"
                  >
                    {" "}
                    Invoice List
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item menu-items">
          <Link href="/users">
            <a
              className="nav-link"
              href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html"
            >
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box" />
              </span>
              <span className="menu-title">Users</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
