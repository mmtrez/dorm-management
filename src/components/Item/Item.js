import Paper from "@mui/material/Paper";

const Item = ({ children }) => {
    return (
        <Paper elevation={10} sx={{ height: '100%', position: 'relative' }}>
            {children}
        </Paper>
    );
};

export default Item;