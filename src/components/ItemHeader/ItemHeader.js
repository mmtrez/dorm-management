import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
// import makeStyles from "@mui/styles/makeStyles";

// const useStyles = makeStyles((theme) => ({
//     gradient: {
//         background: 'linear-gradient(to right, #42a5f5, #1565c0, #42a5f5)'
//     }
// }))
// linear-gradient(to right, #42a5f5, #1976d2, #1565c0)
const ItemHeader = ({ title }) => {
    // const classes = useStyles();

    return (
        <Box position="absolute" right={0} left={0} margin="auto" width={'70%'} top={'-1.25rem'} paddingY={'0.75rem'} bgcolor={theme.palette.primary.main} borderRadius>
            <Typography component="h2" variant="h6" textAlign="center" color={'white'}>
                {title}
            </Typography>
        </Box>
    );
};

export default ItemHeader;