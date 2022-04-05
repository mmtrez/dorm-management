import {createTheme} from "@mui/material";
import { faIR } from "@mui/material/locale";

const theme = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: '"yekan","Roboto"'
    },
    palette: {
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "1.75rem",

                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    textAlign: "right"
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: "unset",
                    marginLeft: 8
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    padding : '0 24px',
                    fontWeight: '800',
                    fontSize: '0.95rem'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#42a5f5',
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
                },
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    textAlign: 'right'
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '20px 24px !important'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                startIcon: {
                    marginLeft: '4px',
                    marginRight: '-4px'
                }
            }
        }
    },
}, faIR)

export default theme;