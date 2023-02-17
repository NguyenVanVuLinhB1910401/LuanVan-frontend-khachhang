import { Box, Stack, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { addToCart } from '../../state';
//import ReactHtmlParser from "react-html-parser";
const ChiTietSanPham = () => {
  const [searchParams] = useSearchParams();
  const idSP = searchParams.get('idSP');
  //console.log(idSP);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const getOneSanPham = () => {
    axios
      .get('http://localhost:3000/api/sanphams/' + idSP, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // const data = response.data.result.map((res) => {
          //     return {id: res._id, tenLoaiSP: res.tenLoaiSP};
          // })

          const data = response.data.result;
          // console.log(data);
          setProduct(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneSanPham();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box p="0px 100px">
      <Box display="flex" alignItems="center" justifyContent="center" p="10px">
        <Typography fontSize="50px" fontWeight="bold">
          Chi Tiết Sản Phẩm
        </Typography>
      </Box>
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
        sx={{
          '& > div': 'span 10',
        }}
      >
        <>
          <Box sx={{ gridColumn: 'span 3', height: '400px', width: '100%' }}>
            {product.anhDaiDien && (<img
              width="100%"
              height="100%"
              src={`http://localhost:3000/assets/${product.anhDaiDien}`}
              alt="hình ảnh"
            />)   }       
            </Box>
          <Box sx={{ gridColumn: 'span 3' }}>
            <Stack>
              <Box>
                <Typography fontSize="40px" fontWeight="bold">
                  {product.tenSanPham + ' ' + product.dungLuong + 'GB'}
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontSize="25px"
                  sx={{ textDecorationLine: 'line-through' }}
                  color="red"
                  fontWeight="bold"
                >
                  {parseInt(product.giaGoc).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="30px" fontWeight="bold">
                  {parseInt(product.giaBan).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Typography>
              </Box>
              <Box paddingTop="10px">
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: '20px',
                    background: '#b7ebde',
                    width: '100%',
                    padding: '15px 0',
                    ":hover": {
                        background: "#3da58a",
                        color: "#fff"
                    }
                  }}
                  onClick={() => dispatch(addToCart({id: product._id,tenSanPham: product.tenSanPham,image:  product.anhDaiDien,gia: product.giaBan}))}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Stack>
          </Box>
          <Box
          sx={{ gridColumn: 'span 4' }}>
            <Stack>
              <Box>
                <Typography paddingLeft="10px" fontSize="40px" fontWeight="bold">
                  Thông tin cấu hình
                </Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Màn hình:</Typography>
                <Typography fontSize="20px">{product.manHinh}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">Hệ điều hành:</Typography>
                <Typography fontSize="20px">{product.heDieuHanh}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Camera sau:</Typography>
                <Typography fontSize="20px">{product.cameraSau}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">Camera trước:</Typography>
                <Typography fontSize="20px">{product.cameraTruoc}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Chip:</Typography>
                <Typography fontSize="20px">{product.chip}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">RAM:</Typography>
                <Typography fontSize="20px">{product.ram}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Dung lượng lưu trữ:</Typography>
                <Typography fontSize="20px">{product.dungLuong}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">SIM:</Typography>
                <Typography fontSize="20px">{product.sim}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Pin, Sạc:</Typography>
                <Typography fontSize="20px">{product.pin+" mAh"+" "+product.sac}</Typography>
              </Box>
            </Stack>
          </Box>
        </>
      </Box>
      {<div dangerouslySetInnerHTML={{ __html: product.moTa }} />}
      <Box p="10px 0px"><Typography fontSize="40px" fontWeight="bold">Thông tin sản phẩm</Typography></Box>
      <Box>
        <Typography textAlign="justify"  fontSize="25px">{product.moTa}</Typography>
      </Box>
      <Box p="10px 0px"><Typography fontSize="40px" fontWeight="bold">Đánh giá sản phẩm</Typography></Box>
      <Box p="10px 0px"><Typography fontSize="40px" fontWeight="bold">Bình luận sản phẩm</Typography></Box>
    </Box>
  );
};
export default ChiTietSanPham;
