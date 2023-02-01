import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import "./Navbar.css";
const NavBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
        display="flex"
        sx={{
            height: "50px",
            background: colors.blueAccent[300]
        }}
        >
        <img src={`../../logo.jpg`} width="150px" alt="logo" />
        <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        p="0px 30px"
        >
        <Box gap={2} className="nav-menu">
            <li className="nav-item"><Link to="/">Trang chủ</Link></li>
            <li className="nav-item"><Link to="/sanpham">Sản phẩm</Link></li>
            <li className="nav-item"><Link to="/sanpham">Giới thiệu</Link></li>
            <li className="nav-item"><Link to="/sanpham">Liên hệ</Link></li>
        </Box>
        <Box gap={2} className="nav-menu">
            <li className="nav-item"><Link to="/login">Đăng nhập</Link></li>
            <li className="nav-item"><Link to="/register">Đăng ký</Link></li>
        </Box>
        </Box>
        </Box>
    );
}
export default NavBar;