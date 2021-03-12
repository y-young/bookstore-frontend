import books from "@/assets/books";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Empty,
  Image,
  Input,
  List,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import { useHistory } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Orders = () => {
  const items = books;
  const history = useHistory();

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          订单
        </Typography.Title>
        <Col style={{ textAlign: "end" }}>
          <Space>
            <Input.Search placeholder="搜索图书" />
            <RangePicker />
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16} className={styles.statistics}>
        <Col span={8}>
          <Statistic title="订单数量" value={items.length} />
        </Col>
        <Col span={8}>
          <Statistic title="商品数量" value={11} />
        </Col>
        <Col span={8}>
          <Statistic title="总金额" value={1128} precision={2} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={20}>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => history.push("/order")}>
                    查看详情
                  </Button>,
                ]}
                className={styles.orderListItem}
              >
                <List.Item.Meta
                  avatar={
                    <Space>
                      <Image src={item.cover} width={60} height={60} />
                      <Image src={item.cover} width={60} height={60} />
                      <Image src={item.cover} width={60} height={60} />
                      <div className={styles.booksExtra}>+3</div>
                    </Space>
                  }
                  title={"时间：2021-03-11 11:11:11"}
                  description={
                    String(item.amount ? item.amount : 1) + " 件商品"
                  }
                  className={styles.orderBookItems}
                />
                <Col flex="1 1 50px" className={styles.orderTotal}>
                  {currencyFormat(item.price)}{" "}
                </Col>
              </List.Item>
            )}
            locale={{
              emptyText: (
                <Empty
                  description={
                    <span style={{ fontSize: "26px" }}>您还没有订单</span>
                  }
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => history.push("/")}
                  >
                    去购物
                  </Button>
                </Empty>
              ),
            }}
          />
        </Col>
        <Col>
          <Divider type="vertical" className={styles.divider} />
        </Col>
        <Col span={3}>
          <Row gutter={8} className={styles.bookStatistics}>
            <Col span={18}>外国文学</Col>
            <Col span={6}>10</Col>
            <Col span={18}>科幻小说</Col>
            <Col span={6}>23</Col>
            <Col span={18}>计算机</Col>
            <Col span={6}>3</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Orders;
