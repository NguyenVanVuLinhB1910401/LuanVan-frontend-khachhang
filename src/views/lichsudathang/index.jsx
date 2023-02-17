import { Box, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DetailsIcon from '@mui/icons-material/Details';
import { useNavigate } from 'react-router-dom';
const LichSuDatHang = () => {
  const [dsDonHang, setDSDonHang] = useState([]);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  
  const getALLDonHangDaMua = () => {
    axios
      .get('http://localhost:3000/api/donhangs', {
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
          const data = response.data.result;
          //console.log(data);
          setDSDonHang(data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLDonHangDaMua();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box 
    display="flex"
    alignItems="center"
    justifyContent="center" minHeight="84vh" m="0 135px" sx={{background: "#fff"}}>
        <Box>
        <Box display="flex" justifyContent="center" margin="10px 0px">
        <Typography fontSize="30px" fontWeight="bold">
          DANH SÁCH ĐƠN HÀNG ĐÃ MUA
        </Typography>
      </Box>
      <Box>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          sx={{
            padding: '10px 20px',
            '& > div': 'span 12',
            background: "#94e2cd"
          }}
        >
          <>
            <Typography
              fontSize="18px"
              fontWeight="bold"
              // textAlign="center"
              sx={{ gridColumn: 'span 3' }}
            >
              Mã đơn hàng
            </Typography>
            <Typography
              fontSize="18px"
              fontWeight="bold"
              sx={{ gridColumn: 'span 2', textAlign: 'center' }}
            >
              Ngày đặt mua
            </Typography>

            <Typography
              fontSize="18px"
              fontWeight="bold"
              textAlign="end"
              sx={{ gridColumn: 'span 2' }}
            >
              Tổng tiền
            </Typography>

            <Typography
              fontSize="18px"
              fontWeight="bold"
              textAlign="center"
              sx={{ gridColumn: 'span 2' }}
            >
              Trạng thái
            </Typography>
            <Typography
              fontSize="18px"
              fontWeight="bold"
              sx={{ gridColumn: 'span 2', textAlign: 'center' }}
            >
              Hình thức thanh toán
            </Typography>
            <Box sx={{ gridColumn: 'span 1' }}></Box>
          </>
        </Box>
        {dsDonHang.map((dh, index) => {
          return (
            <Box
              key={dh._id}
              display="grid"
              gap="15px"
              
              gridTemplateColumns="repeat(12, minmax(0, 1fr))"
              sx={{
                padding: '10px 20px',
                background: index % 2 === 0 ? "#fff" : "#f0f0f0",
                '& > div': 'span 12',
              }}
            >
              <>
                <Typography
                  fontSize="18px"
                  // fontWeight="bold"
                  // textAlign="center"
                  sx={{ gridColumn: 'span 3' }}
                >
                  {dh._id}
                </Typography>
                <Typography
                  fontSize="18px"
                  // fontWeight="bold"
                  sx={{ gridColumn: 'span 2', textAlign: 'center' }}
                >
                  {dh.ngayDat}
                </Typography>

                <Typography
                  fontSize="18px"
                  textAlign="end"
                  // fontWeight="bold"
                  sx={{ gridColumn: 'span 2' }}
                >
                  {dh.total}
                </Typography>

                <Typography
                  fontSize="18px"
                  fontWeight="bold"
                  sx={{ gridColumn: 'span 2', textAlign: 'center' }}
                >
                  {dh.status}
                </Typography>
                <Typography
                  fontSize="18px"
                  fontWeight="bold"
                  sx={{ gridColumn: 'span 2', textAlign: 'center' }}
                >
                  {dh.httt}
                </Typography>
                <Box sx={{ gridColumn: 'span 1' }}>
                  <IconButton onClick={() => navigate("/chitietdonhang/"+dh._id)}>
                    <DetailsIcon />
                  </IconButton>
                </Box>
              </>
            </Box>
          );
        })}
      </Box>
        </Box>
    </Box>
  );
};

export default LichSuDatHang;
