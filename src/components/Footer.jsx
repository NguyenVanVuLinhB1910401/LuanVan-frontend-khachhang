import { Box, Typography } from "@mui/material";

const Footer = () => {

    return (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      sx={{
        width: "100%",
        height: "8vh",
        // padding: "20px 0px",
        background: "#4cceac"
      }}
    >
      <Typography textAlign="center" fontSize="20px">Copyright by Nguyen Van Vu Linh</Typography>
    </Box>
    );
}

export default Footer;