import { Box, Button, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import CartItem from "./CartItem";
import { incrementQuantity, decrementQuantity, removeItem } from '../../state';
const GioHang = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box m="0px 135px" sx={{ minHeight: '84vh', background: '#fff' }}>
      <Box>
        <Typography textAlign="center" fontSize="50px" fontWeight="bold">
          Giỏ Hàng
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid #e0e0e0',
          padding: '10px',
          margin: '0px 10px',
          background: '#fbfbfb',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="50px"
          //   padding="5px"
        >
          <Box>
            <Typography fontSize="20px" fontWeight="bold" textAlign="center">
              STT
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100px"
        >
          <Box>
            <Typography fontSize="20px" fontWeight="bold">
              Hình ảnh
            </Typography>
          </Box>
        </Box>
        <Box
          width="300px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box>
            <Typography fontSize="20px" fontWeight="bold">
              Tên sản phẩm
            </Typography>
          </Box>
        </Box>
        <Box
          width="120px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography fontSize="20px" fontWeight="bold">
              Số lượng
            </Typography>
          </Box>
        </Box>
        <Box
          width="150px"
          display="flex"
          flexDirection="column"
          alignItems="end"
          justifyContent="center"
        >
          <Box>
            <Typography fontSize="20px" fontWeight="bold">
              Giá
            </Typography>
          </Box>
        </Box>
        <Box
          width="150px"
          display="flex"
          flexDirection="column"
          alignItems="end"
          justifyContent="center"
        >
          <Box>
            <Typography fontSize="20px" fontWeight="bold">
              Thành tiền
            </Typography>
          </Box>
        </Box>
        <Box
          width="50px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        ></Box>
      </Box>
      {cart !== undefined &&
        cart.map((sp, index) => {
          return (
            <Box
              key={sp.id}
              display="flex"
              justifyContent="space-between"
              sx={{
                borderBottom: '1px solid #e0e0e0',
                padding: '10px',
                margin: '0px 10px',
                background: '#fbfbfb',
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="50px"
              >
                <Box>
                  <Typography fontSize="20px" textAlign="center">
                    {index + 1}
                  </Typography>
                </Box>
              </Box>
              <Box width="100px" height="100px">
                <img
                  width="100%"
                  height="100%"
                  src={`http://localhost:3000/assets/${sp.image}`}
                  alt="hình ảnh"
                />
              </Box>
              <Box
                width="300px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box>
                  <Typography fontSize="20px">{sp.tenSanPham}</Typography>
                </Box>
              </Box>
              <Box
                width="120px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box display="flex">
                  <IconButton
                    onClick={() => dispatch(decrementQuantity(sp.id))}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography fontSize="30px">{sp.soLuong}</Typography>
                  <IconButton
                    onClick={() => dispatch(incrementQuantity(sp.id))}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                width="150px"
                display="flex"
                flexDirection="column"
                alignItems="end"
                justifyContent="center"
              >
                <Box>
                  <Typography fontSize="20px">{sp.gia}</Typography>
                </Box>
              </Box>
              <Box
                width="150px"
                display="flex"
                flexDirection="column"
                alignItems="end"
                justifyContent="center"
              >
                <Box>
                  <Typography fontSize="20px">{sp.gia * sp.soLuong}</Typography>
                </Box>
              </Box>
              <Box
                width="50px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton onClick={() => dispatch(removeItem(sp.id))}>
                  <DeleteIcon sx={{ color: 'red', fontSize: '30px' }} />
                </IconButton>
              </Box>
            </Box>
          );
        })}

      <Box display="flex" justifyContent="center" m="10px">
        <Box marginRight="20px">
          <Button
            sx={{
              width: '300px',
              padding: '10px',
              background: '#4cceac',
              ':hover': {
                background: '#3da58a',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/sanpham')}
          >
            Tiếp tục mua hàng
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => {
              if (user !== null) {
                navigate('/thanhtoan');
              } else {
                alert('Vui lòng đăng nhập trước khi thanh toán!!!');
              }
            }}
            sx={{
              width: '300px',
              padding: '10px',
              background: '#4cceac',
              ':hover': {
                background: '#3da58a',
                color: '#fff',
              },
            }}
          >
            Thanh toán
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GioHang;
