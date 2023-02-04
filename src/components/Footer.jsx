import { Box, Typography } from "@mui/material";

const Footer = () => {

    return (
        <Box
      sx={{
        width: "100%",
        height: "auto",
        padding: "20px 0px",
        background: "#4cceac"
      }}
    >
      <Typography textAlign="center" fontSize="20px">Copyright by Nguyen Van Vu Linh</Typography>
    </Box>
    );
}

export default Footer;