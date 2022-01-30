const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://volksanddavid.herokuapp.com"
    : "http://localhost:5000";

export default baseUrl;
