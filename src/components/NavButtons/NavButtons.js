import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import Collapse from "@mui/material/Collapse";
import { List, ListItemText, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const NavButtons = ({ auth }) => {
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const [openButtonMenu, setOpenButtonMenu] = useState(null);

    const handleOpenNavMenu = (event) => {
        setOpenNavMenu(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setOpenNavMenu(false);
    };

    const handleCloseButtonMenu = () => {
        setOpenButtonMenu(null)
    };
    const handleOpenButtonMenu = (event) => {
        setOpenButtonMenu(event.currentTarget);
    };
    const handleChangeButtonMenu = () => {
        setOpenButtonMenu(!openButtonMenu);
    }

    return (
        <>
            {/* Mobile */}
            <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon style={{ color: 'white'}} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={openNavMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={openNavMenu}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <Link to="/"> 
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" variant="h6">
                                {auth ? 'داشبورد' : 'ورود'}
                            </Typography>
                        </MenuItem>
                    </Link>   
                    <Link to="/announcements"> 
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" variant="h6">اطلاعیه ها</Typography>
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={handleChangeButtonMenu} sx={{ display: 'block', flexDirection: 'column'}}>
                        <Typography textAlign="right" variant="h6">دیگر سامانه ها</Typography>
                        <Collapse in={openButtonMenu}>
                            <List onClick={handleCloseNavMenu}>
                                <a href="http://reg.scu.ac.ir">
                                    <ListItem>
                                        <ListItemText>
                                            سامانه سما
                                        </ListItemText>
                                    </ListItem>
                                </a>
                                <a href="https://food.scu.ac.ir/cullinan/">
                                    <ListItem>
                                        <ListItemText>
                                            سامانه تغذیه
                                        </ListItemText>
                                    </ListItem>
                                </a>
                                <a href="https://lms.scu.ac.ir/">
                                    <ListItem>
                                        <ListItemText>
                                            سامانه آموزش مجازی
                                        </ListItemText>
                                    </ListItem>
                                </a>
                            </List>
                        </Collapse>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" variant="h6">درباره ما</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            {/* Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link to="/">
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px' }}
                    >
                        {auth ? 'داشبورد' : 'ورود'}
                    </Button>
                </Link>
                <Link to="/announcements">
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px' }}
                    >
                        اطلاعیه ها
                    </Button>
                </Link>
                <Button
                    onClick={handleOpenButtonMenu}
                    sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px' }}
                >
                    دیگر سامانه ها
                </Button>
                <Menu
                    sx={{ mt: '10px', display: { xs: 'none', md: 'flex' }}}
                    id="menu-appbar"
                    anchorEl={openButtonMenu}
                    open={Boolean(openButtonMenu)}
                    onClose={handleCloseButtonMenu}
                >
                    <a href="https://reg.scu.ac.ir">
                        <MenuItem onClick={handleCloseButtonMenu}>
                            <Typography textAlign="center">سامانه سما</Typography>
                        </MenuItem>
                    </a>
                    <a href="https://food.scu.ac.ir/cullinan/">
                        <MenuItem onClick={handleCloseButtonMenu}>
                            <Typography textAlign="center">سامانه تغذیه</Typography>
                        </MenuItem>
                    </a>
                    <a href="https://lms.scu.ac.ir/">
                        <MenuItem onClick={handleCloseButtonMenu}>
                            <Typography textAlign="center">سامانه آموزش مجازی</Typography>
                        </MenuItem>
                    </a>
                </Menu>
            </Box>
        </>
    );
};

export default NavButtons;