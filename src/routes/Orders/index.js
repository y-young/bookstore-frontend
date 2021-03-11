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
      <List
        itemLayout="horizontal"
        dataSource={items}
        footer={
          <>
            {items.length > 0 && (
              <Row justify="space-between">
                <p>共 {items.length} 个订单</p>
              </Row>
            )}
          </>
        }
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
              description={"编号：11111111111"}
              className={styles.orderBookItems}
            />
            <Col flex={1} className={styles.orderItemsCount}>
              <>{item.amount ? item.amount : 1} 件商品</>
            </Col>
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
    </>
  );
};

export default Orders;
