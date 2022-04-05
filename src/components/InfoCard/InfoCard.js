// IMPORT
import Item from "../Item/Item";
import ItemHeader from "../ItemHeader/ItemHeader";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TodayIocn from "@mui/icons-material/Today";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcom from "@mui/icons-material/Apartment";
import NumbersIcon from "@mui/icons-material/Numbers";
import BadgeIcon from "@mui/icons-material/Badge";

const InfoCard = ({ userInfo }) => {
  return (
    <Item>
      <ItemHeader title="اطلاعات حساب" />
      <List sx={{ padding: "3rem 0.5rem 0.5rem 0.5rem" }}>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>{userInfo.fullName}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TodayIocn />
          </ListItemIcon>
          <ListItemText>
            <Typography>{userInfo.birthDate}</Typography>
          </ListItemText>
        </ListItem>
        {userInfo.room && (
          <ListItem>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>{`اتاق ${userInfo.room}`}</Typography>
            </ListItemText>
          </ListItem>
        )}
        {userInfo.dormName && (
          <ListItem>
            <ListItemIcon>
              <ApartmentIcom />
            </ListItemIcon>
            <ListItemText>
              <Typography>{`خوابگاه ${userInfo.dormName}`}</Typography>
            </ListItemText>
          </ListItem>
        )}
        <ListItem>
          <ListItemIcon>
            <NumbersIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>
              {userInfo.studentId
                ? userInfo.studentId
                : userInfo.workId
                ? userInfo.workId
                : ""}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>{`${userInfo.socialId}`}</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Item>
  );
};

export default InfoCard;
