import { Box, Typography } from "@mui/material";
import theme from "../../theme";

const ItemHeader = ({ title }) => {
  return (
    <Box
      position="absolute"
      right={0}
      left={0}
      margin="auto"
      width={"70%"}
      top={"-1.25rem"}
      paddingY={"0.75rem"}
      bgcolor={theme.palette.primary.main}
      borderRadius
    >
      <Typography
        component="h2"
        variant="h6"
        textAlign="center"
        color={"white"}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default ItemHeader;
