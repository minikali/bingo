import React from "react";
import Layout from "./Layout";
import styles from "@/styles/LegalPage.module.css";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const LegalPage = ({ children, title }: Props) => {
  const router = useRouter();

  return (
    <Layout title={title}>
      <section className={styles.section}>
        <a className={styles.backBtn} onClick={() => router.back()}>{"< Back"}</a>
        {children}
      </section>
    </Layout>
  );
};

export default LegalPage;
