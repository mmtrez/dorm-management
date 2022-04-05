import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/images/chamranLogo.png';
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import NavButtons from "../NavButtons/NavButtons";
import Stack from "@mui/material/Stack";


const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: '64px',
        marginLeft: 4
    }
}))

const Header = ({ auth, setAuth, setRole }) => {
    const classes = useStyles();
    const [openUserMenu, setOpenUserMenu] = useState(null);

    const handleOpenUserMenu = (event) => {
        setOpenUserMenu(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setOpenUserMenu(null);
    };

    const logout = () => {
        setAuth(false);
        setRole(undefined);
        localStorage.setItem('auth', '0');
        localStorage.setItem('role', undefined);
        handleCloseUserMenu();
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack direction="row" sx={{ flexDirection: { xs: 'row-reverse', md: 'row' }, justifyContent: { xs: 'flex-end' } }} flexGrow={1}>
                        {auth && <img src={Logo} alt="university logo" className={classes.logo} />}
                        <NavButtons auth={auth} />
                    </Stack>
                    {auth &&
                        <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={openUserMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(openUserMenu)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">پروفایل</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Typography textAlign="center">خروج</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;