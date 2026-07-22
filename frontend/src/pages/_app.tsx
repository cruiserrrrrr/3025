import "@/styles/globals.scss";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
