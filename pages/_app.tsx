import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/layout/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="font-body">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
