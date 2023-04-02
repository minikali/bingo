import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "@/styles/Layout.module.css";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: Props) => {
  const defaultTitle = "Bingo Draw App";
  return (
    <>
      <Head>
        <title>{title ?? defaultTitle}</title>
        <meta
          name="description"
          content="A real-time bingo draw application to liven up your evenings with friends or family. Generate random bingo numbers and keep track of all the drawn numbers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className={styles.layout}>
        <Header className={styles.header} />
        <div className={styles.content}>{children}</div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export default Layout;
