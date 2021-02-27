import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Affix, Avatar, Col, Menu, Row, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
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
          <Col span={5}>
            <img
              className={styles.logo}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="Ant Design"
              onClick={() => history.push("/")}
            />
            <Typography.Title level={3} className={styles.logoText}>
              Book Store
            </Typography.Title>
          </Col>
          <Col span={14}>
            <Menu mode="horizontal">
              <Menu.Item key="home">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="books">
                <Link to="/books">书架</Link>
              </Menu.Item>
              <Menu.Item key="orders">订单</Menu.Item>
            </Menu>
          </Col>
          <Col span={5}>
            <Menu mode="horizontal">
              <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">购物车</Link>
              </Menu.Item>
              <Menu.SubMenu
                key="SubMenu"
                title={<Avatar icon={<UserOutlined />} />}
              >
                <Menu.Item key="login">
                  <Link to="/login">登录</Link>
                </Menu.Item>
                <Menu.Item key="register">
                  <Link to="/register">注册</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </header>
    </Affix>
  );
};

export default Header;
