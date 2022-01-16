import Document, { Html, Head, Main, NextScript } from "next/document"
const APP_NAME = "Westend"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zxx">
        <Head>
         
        
          <link
            rel="stylesheet"
            href="/assets/vendors/mdi/css/materialdesignicons.min.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendors/css/vendor.bundle.base.css"
          />

          <link
            rel="stylesheet"
            href="/assets/vendors/jvectormap/jquery-jvectormap.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendors/flag-icon-css/css/flag-icon.min.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendors/owl-carousel-2/owl.carousel.min.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendors/owl-carousel-2/owl.theme.default.min.css"
          />

          <link rel="stylesheet" href="/assets/css/style.css" />
          <link rel="shortcut icon" href="/assets/images/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        <script src="/assets/vendors/js/vendor.bundle.base.js"></script>
   
    <script defer src="/assets/vendors/chart.js/Chart.min.js"></script>
    <script defer src="/assets/vendors/progressbar.js/progressbar.min.js"></script>
    <script defer src="/assets/vendors/jvectormap/jquery-jvectormap.min.js"></script>
    <script defer src="/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
    <script defer src="/assets/vendors/owl-carousel-2/owl.carousel.min.js"></script>
   
    <script defer src="/assets/js/off-canvas.js"></script>
    <script defer src="/assets/js/hoverable-collapse.js"></script>
    <script defer src="/assets/js/misc.js"></script>
    <script defer src="/assets/js/settings.js"></script>
    <script defer src="/assets/js/todolist.js"></script>
   
    <script defer src="/assets/js/dashboard.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
