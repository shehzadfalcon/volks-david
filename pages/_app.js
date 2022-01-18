import "../styles/globals.css";
import Layout from "../components/_App/Layout";
import { parseCookies } from "nookies";
import { redirectUser } from "../utils/auth";
import { Toaster } from "react-hot-toast";
import React from "react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Toaster />
    </React.Fragment>
  );
};

export default MyApp;

MyApp.getInitialProps = async ({ Component, ctx, ...values }) => {
  // console.log("ctx: ", ctx);
  // console.log("values: ", values);
  const { token, user } = parseCookies(ctx);
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!token) {
    // if a user not logged in then user can't access those pages
    const isProtectedRoute =
      ctx.pathname === "/" || ctx.pathname === "/dashboard";

    if (isProtectedRoute) {
      redirectUser(ctx, `/login`);
    }
  } else {
    const isProtectedRoute =
      ctx.pathname === "/login" ||
      ctx.pathname === "/register" ||
      ctx.pathname === "/";

    if (isProtectedRoute) {
      redirectUser(ctx, "/dashboard");
    }
  }

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    pageProps,
  };
};
