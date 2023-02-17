import { Box, Typography, IconButton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DetailsIcon from '@mui/icons-material/Details';
import { useNavigate, useParams } from 'react-router-dom';

const ChiTietDonHang = () => {
  const [donHang, setDonHang] = useState({});
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const getOneDonHang = () => {
    axios
      .get('http://localhost:3000/api/donhangs/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // const data = response.data.result.map((res) => {
          //     return {id: res._id, tenLoaiSP: res.tenLoaiSP};
          // })
          const data = response.data;
          //console.log(data);
          setDonHang(data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOneDonHang();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box
      minHeight="84vh"
      m="0 135px"
      p="20px 200px"
      sx={{ background: '#fff' }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography fontSize="30px" fontWeight="200">
            CHI TIẾT ĐƠN HÀNG #{donHang.donHang?._id}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize="20px">Trạng thái: </Typography>
          <Typography fontSize="20px" sx={{ color: '#4cceac' }}>
            {donHang.donHang?.status}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        sx={{
          borderBottom: '1px solid #e0e0e0',
          padding: '5px 10px 10px 0px',
        }}
      >
        <Typography fontSize="20px">Mua tại: </Typography>
        <Typography fontSize="20px">
          {donHang.donHang?.idCN?.tenChiNhanh},{' '}
        </Typography>
        <Typography fontSize="20px"> địa chỉ: </Typography>
        <Typography fontSize="20px">
          {donHang.donHang?.idCN?.diaChiChiNhanh},{' '}
        </Typography>
      </Box>
      {donHang.dsSanPham !== undefined && donHang.dsSanPham.map((sp) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              borderBottom: '1px solid #e0e0e0',
              padding: '10px',
            }}
          >
            <Box width="100px" height="100px">
              <img
                width="100%"
                height="100%"
                src={`http://localhost:3000/assets/${sp.idSP?.anhDaiDien}`}
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
                <Typography fontSize="20px">Tên sản phẩm</Typography>
              </Box>
              <Box>
                <Typography fontSize="20px">{sp.idSP?.tenSanPham}</Typography>
              </Box>
            </Box>
            <Box
              width="100px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                <Typography fontSize="20px">Số lượng</Typography>
              </Box>
              <Box>
                <Typography fontSize="20px">{sp.soLuong}</Typography>
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
                <Typography fontSize="20px">Giá</Typography>
              </Box>
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
                <Typography fontSize="20px">Thành tiền</Typography>
              </Box>
              <Box>
                <Typography fontSize="20px">{sp.gia * sp.soLuong}</Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box
        display="flex"
        justifyContent="end"
        sx={{
          //borderBottom: '1px solid #e0e0e0',
          padding: '5px 10px 10px 0px',
        }}
      >
        <Box display="flex" justifyContent="space-between" width="300px">
          <Box>
            <Typography fontSize="20px" fontWeight="bold">
              Tổng tiền:{' '}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="20px">{donHang.donHang?.total}</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="end"
        sx={{
          borderBottom: '1px solid #e0e0e0',
          padding: '5px 10px 10px 0px',
        }}
      >
        <Button fontSize="20px" sx={{background: " #ff6666",':hover': {
                background: '#ff3333',
                color: '#fff',
              }}}>Hủy đơn hàng</Button>
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          padding: '5px 10px 10px 0px',
        }}
      >
        <Box>
          <Typography fontSize="20px" fontWeight="bold">
            Địa chỉ và thông tin nhận hàng:
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="20px">
            {donHang.donHang?.hoTen}-{donHang.donHang?.sdt}-
            {donHang.donHang?.email}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="20px">
            Nơi nhận hàng: {donHang.donHang?.diaChi}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="20px">
            Hình thức thanh toán: {donHang.donHang?.httt}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="20px">
            Ngày mua: {donHang.donHang?.ngayDat}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" m="10px 0px">
        <Box>
          <Button
            sx={{
              padding: '10px 100px',
              fontSize: '20px',
              background: '#b7ebde',
              ':hover': {
                background: '#3da58a',
                color: '#fff',
              },
            }}
            onClick={() => navigate("/lichsudathang")}
          >
            Quay lại danh sách đơn hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChiTietDonHang;
