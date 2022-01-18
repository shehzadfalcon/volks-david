import React from "react";
import Head from "next/head";

import Router from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preloader from "./Preloader";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const { children, user } = props;
  const [loader, setLoader] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  Router.events.on("routeChangeStart", () => {
    setLoader(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoader(false);
  });
  Router.events.on("routeChangeError", () => {
    setLoader(false);
  });

  return (
    <React.Fragment>
      <Head>
        <title>VolksAndDavid</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Westend Educorp - We fund your study abroad dreams"
        />
        <meta
          name="og:title"
          property="og:title"
          content="Westend Educorp - We fund your study abroad dreams"
        ></meta>
        <meta
          name="twitter:card"
          content="Westend Educorp - We fund your study abroad dreams"
        ></meta>
        <link rel="canonical" href="https://westend.co.in"></link>
      </Head>

      {loader && <Preloader />}

      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Navbar user={user} />

          {children}
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
