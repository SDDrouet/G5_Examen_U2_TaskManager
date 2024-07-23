import '../styles/globals.css'

import { ReactElement, ComponentType } from 'react';

function MyApp({ Component, pageProps }: { Component: ComponentType<any>, pageProps: any }): ReactElement {
    return <Component {...pageProps} />;
}

export default MyApp;