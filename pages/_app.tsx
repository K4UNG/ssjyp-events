import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
