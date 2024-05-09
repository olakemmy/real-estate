import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../lib/graphql";
import FooterNav from "@/components/FooterNav";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import Header3 from "@/components/Headers/Header/Header3";

function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={pageProps.session}>
          <ApolloProvider client={client}>
            <Header3 />
            <Component {...pageProps} />
            <FooterNav />
            <Footer />
          </ApolloProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
