import useRequest from "@umijs/use-request";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./index.less";

const Footer = () => {
  const history = useHistory();
  const isHome = history.location.pathname === "/";
  const { data, loading } = useRequest("/statistics/updatePageView", {
    ready: isHome,
  });

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
      {isHome && !loading && (
        <>
          <br />
          访问量：{data}
        </>
      )}
    </Layout.Footer>
  );
};

export default Footer;
