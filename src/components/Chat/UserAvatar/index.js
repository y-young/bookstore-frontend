import { Avatar } from "antd";
import { colorMapping } from "utils/helpers";

const UserAvatar = ({ username, ...props }) => {
  const avatarLetter = username[0].toUpperCase();

  return (
    <Avatar
      className={`ant-tag-${colorMapping(avatarLetter.charCodeAt(0))}`}
      {...props}
    >
      {avatarLetter}
    </Avatar>
  );
};

export default UserAvatar;
