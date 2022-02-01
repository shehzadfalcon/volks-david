import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (token, user) => {
  cookie.set("token", token);
  cookie.set(
    "user",
    JSON.stringify({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    })
  );
  Router.push("/dashboard");
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const getUser = () => {
  let USER = cookie.get("user");
  if (USER) {
    return JSON.parse(USER);
  }
};
export const getToken = () => {
  let token = cookie.get("token");
  console.log("tokennwee", token);
  if (token) {
    return token;
  }
};

export const handleLogout = () => {
  cookie.remove("token");
  cookie.remove("user");

  Router.push("/");
};
