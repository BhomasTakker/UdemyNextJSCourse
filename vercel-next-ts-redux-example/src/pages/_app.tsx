import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";

import store from "../app/store";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </SessionProvider>
  );
}
