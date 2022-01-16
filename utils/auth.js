import cookie from "js-cookie"
import Router from "next/router"

export const handleLogin = (token, user, path) => {
  cookie.set("token", token)
  cookie.set("user", JSON.stringify(user))
  cookie.set("path", path)
  Router.push(path)
}

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

export const handleLogout = () => {
  cookie.remove("token")
  cookie.remove("user")
  cookie.remove("path")

  Router.push("/")
}
