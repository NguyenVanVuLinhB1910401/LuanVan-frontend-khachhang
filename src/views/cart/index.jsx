import {Box, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
const GioHang = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <Box>
            <Box>
                <Typography textAlign="center" fontSize="50px" fontWeight="bold">Giỏ Hàng</Typography>
            </Box>
            {cart.map((item, index) => <CartItem key={item.id} id={item.id} tenSanPham={item.tenSanPham} image={item.image} gia={item.gia} soLuong={item.soLuong} />)}
        </Box>
    );
}

export default GioHang;