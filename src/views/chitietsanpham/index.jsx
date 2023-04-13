import { Box, Stack, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { addToCart } from '../../state';
//import ReactHtmlParser from "react-html-parser";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FormDanhGia from './formdanhgia';
import Comments from './comments';
import Rating from '@mui/material/Rating';
const ChiTietSanPham = () => {
  const [searchParams] = useSearchParams();
  const idSP = searchParams.get('idSP');
  //console.log(idSP);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const getOneSanPham = () => {
    axios
      .get('http://localhost:3000/api/sanphamskh/' + idSP, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          // const data = response.data.result.map((res) => {
          //     return {id: res._id, tenLoaiSP: res.tenLoaiSP};
          // })
          const data = response.data.result;
          // console.log(data);
          setProduct(data);
          getAllDanhGia(data.sanpham?._id);
        }
      })
      .catch((err) => console.log(err));
  };
  const [soSao, setSoSao] = useState(0);
  const [tongSoDG, setTongSoDG] = useState(0);
  const getAllDanhGia = (id) => {
    axios
      .get('http://localhost:3000/api/danhgias/' + id)
      .then((response) => {
        if (response.status === 200) {
          // const data = response.data.result.map((res) => {
          //     return {id: res._id, tenLoaiSP: res.tenLoaiSP};
          // })
          const data = response.data;
          setSoSao(data.tongSoSao/data.tongSoDG);
          setTongSoDG(data.tongSoDG);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneSanPham();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" p="10px">
        <Typography fontSize="30px" fontWeight="bold">
          Chi Tiết Sản Phẩm
        </Typography>
      </Box>
      <Box
      display="flex"
      justifyContent="center"
      >
          <Box width="20%" marginRight="30px">
            {product.sanpham?.anhDaiDien && (<img
              width="100%"
              height="100%"
              src={`http://localhost:3000/assets/${product.sanpham?.anhDaiDien}`}
              alt="hình ảnh"
            />)   }       
          </Box>
          <Box width="30%">
            <Stack>
              <Box>
                <Typography fontSize="24px" fontWeight="bold">
                  {product.sanpham?.tenSanPham}
                </Typography>
              </Box>
              <Box display="flex"  alignItems="center">
                  
                  <Rating name="read-only" value={soSao} precision={0.5} readOnly />
                  
                  <Typography sx={{fontSize: "18px"}}>({tongSoDG} lượt đánh giá)</Typography>
                  {user && <FormDanhGia idSP={product.sanpham?._id} idUser={user._id}/>}
              </Box>
              <Box>
                <Typography
                  fontSize="20px"
                  sx={{ textDecorationLine: 'line-through' }}
                  color="red"
                  fontWeight="bold"
                >
                  {parseInt(product.sanpham?.giaGoc).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="24px" fontWeight="bold">
                  {parseInt(product.sanpham?.giaBan).toLocaleString('it-IT', {
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
                    width: '70%',
                    padding: '10px 0',
                    ":hover": {
                        background: "#3da58a",
                        color: "#fff"
                    }
                  }}
                  onClick={() => dispatch(addToCart({id: product.sanpham._id,tenSanPham: product.sanpham.tenSanPham,image:  product.sanpham.anhDaiDien,gia: product.sanpham.giaBan, idCN: product.idCN}))}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Stack>
          </Box>
          
      </Box>
      <Box>
      <Box
      p="10px 150px"
          >
            <Stack>
              <Box>
                <Typography paddingLeft="10px" fontSize="30px" fontWeight="bold">
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
                <Typography fontSize="20px">{product.sanpham?.manHinh}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">Hệ điều hành:</Typography>
                <Typography fontSize="20px">{product.sanpham?.heDieuHanh}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Camera sau:</Typography>
                <Typography fontSize="20px">{product.sanpham?.cameraSau}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">Camera trước:</Typography>
                <Typography fontSize="20px">{product.sanpham?.cameraTruoc}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Chip:</Typography>
                <Typography fontSize="20px">{product.sanpham?.chip}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">RAM:</Typography>
                <Typography fontSize="20px">{product.sanpham?.ram}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Dung lượng lưu trữ:</Typography>
                <Typography fontSize="20px">{product.sanpham?.dungLuong}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              >
                <Typography width="40%" fontSize="20px">SIM:</Typography>
                <Typography fontSize="20px">{product.sanpham?.sim}</Typography>
              </Box>
              <Box
              display="flex"
              padding="10px 15px"
              sx={{
                background: '#f2f0f0'
              }}
              >
                <Typography width="40%" fontSize="20px">Pin, Sạc:</Typography>
                <Typography fontSize="20px">{product.sanpham?.pin+" mAh" + " "+product.sanpham?.sac}</Typography>
              </Box>
            </Stack>
          </Box>
      </Box>
      {<Typography sx={{fontSize: '24px'}} dangerouslySetInnerHTML={{ __html: product.sanpham?.moTa }} />}
      <Box p="10px 0px">
        <Box><Typography fontSize="30px" fontWeight="bold">Bình luận sản phẩm</Typography></Box>
        <Box>
          <Comments currentUserId={user?._id} />
        </Box>
      </Box>
    </Box>
  );
};
export default ChiTietSanPham;
