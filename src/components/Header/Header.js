import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  MenuItem,
  Stack,
} from "@mui/material";
import Logo from "../../assets/images/chamranLogo.png";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import NavButtons from "../NavButtons/NavButtons";
import ChangePassDialog from "../ChangePassDialog/ChangePassDialog";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "64px",
    marginLeft: 4,
  },
}));

const Header = ({ auth, setAuth, setRole, userInfo }) => {
  const classes = useStyles();
  const [openUserMenu, setOpenUserMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenUserMenu = (event) => {
    setOpenUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(null);
  };

  const logout = () => {
    setAuth(false);
    setRole(undefined);
    localStorage.setItem("auth", "0");
    localStorage.setItem("role", undefined);
    handleCloseUserMenu();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            sx={{
              flexDirection: { xs: "row-reverse", md: "row" },
              justifyContent: { xs: "flex-end" },
            }}
            flexGrow={1}
          >
            {auth && (
              <img src={Logo} alt="university logo" className={classes.logo} />
            )}
            <NavButtons auth={auth} />
          </Stack>
          {auth && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={openUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(openUserMenu)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleOpenDialog}>
                  <Typography textAlign="center">تغییر رمز</Typography>
                </MenuItem>
                <ChangePassDialog
                  openDialog={openDialog}
                  handleCloseDialog={handleCloseDialog}
                  userInfo={userInfo}
                />
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">خروج</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
