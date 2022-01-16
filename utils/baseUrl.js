const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://westendnodejs.herokuapp.com"
    : "http://localhost:5000"

export default baseUrl
