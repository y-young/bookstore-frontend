import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Affix, Avatar, Col, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./index.less";

const Header = () => {
  const history = useHistory();

  return (
    <Affix offsetTop={0} className={styles.headerAffix}>
      <header className={styles.header}>
        <Row
          style={{ height: "100%", maxWidth: "782pt", margin: "0 auto" }}
          gutter={16}
          align="middle"
          justify="space-around"
        >
          <Col span={6}>
            <img
              style={{ width: 40, height: 40 }}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="Ant Design"
              onClick={() => history.push("/")}
            />
            <Typography.Title level={3} className={styles.logoText}>
              Book Store
            </Typography.Title>
          </Col>
          <Col span={1} offset={16}>
            <ShoppingCartOutlined
              className={styles.cartIcon}
              onClick={() => history.push("/cart")}
            />
          </Col>
          <Col span={1}>
            <Avatar icon={<UserOutlined />} />
          </Col>
        </Row>
      </header>
    </Affix>
  );
};

export default Header;
