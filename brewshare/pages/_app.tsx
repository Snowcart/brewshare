import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../globals.css";
import styles from "@/src/app/page.module.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
            <main className={styles.main}>
                <Component {...pageProps} />
            </main>
    </SessionProvider>
  );
}

export default MyApp;
