import { Layout } from "antd";
import styles from "./index.less";

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      &copy; Copyright 2021{" "}
      <a
        href="https://github.com/y-young"
        target="_blank"
        rel="noreferrer"
        className={styles.footerLink}
      >
        Googleplex
      </a>
    </Layout.Footer>
  );
};

export default Footer;
