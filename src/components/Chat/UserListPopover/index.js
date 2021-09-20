import { Button, Popover } from "antd";
import UserAvatar from "../UserAvatar";
import styles from "./index.less";

const UserListPopover = ({ userList }) => {
  return (
    <Popover
      placement="bottom"
      content={
        userList && userList.length > 0 ? (
          userList.map((user, index) => (
            <div key={index}>
              <UserAvatar size="small" username={user} /> {user}
            </div>
          ))
        ) : (
          <div>当前无人在线</div>
        )
      }
      trigger="click"
    >
      <Button type="link" className={styles.statistics}>
        {userList.length} 人在线
      </Button>
    </Popover>
  );
};

export default UserListPopover;
