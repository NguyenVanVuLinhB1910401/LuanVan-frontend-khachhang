import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import ImageSlider from "../../components/ImageSlider";
const slides = [
  { url: "http://localhost:3002/assets/image1.png",},
  { url: "http://localhost:3002/assets/image2.png",},
  { url: "http://localhost:3002/assets/image3.png",},
  { url: "http://localhost:3002/assets/image4.png",},
  { url: "http://localhost:3002/assets/image5.png",},
];
const TrangChu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);
  const [spMoi, setSPMoi] = useState([]);
  const [spNoiBat, setSPNoiBat] = useState([]);
  const navigate = useNavigate();
  const getAllSanPhamMoi = () => {
    axios
      .get('http://localhost:3000/api/sanphams/spmoi', {
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
          setSPMoi(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllSanPhamNoiBat = () => {
    axios
      .get('http://localhost:3000/api/sanphams/spnoibat', {
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
          setSPNoiBat(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllSanPhamMoi();
    getAllSanPhamNoiBat();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box p="0px 100px">
      <ImageSlider slides={slides} />
      <Box display="flex" alignItems="center" justifyContent="center" p="10px"><Typography fontSize="50px" fontWeight="bold">Sản Phẩm Mới</Typography></Box>
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        sx={{
          '& > div': 'span 5',
        }}
      >
        <>
          {spMoi.map((pro) => {
            return (
              <div key={pro._id} sx={{ gridColumn: 'span 1' }} onClick={() => navigate("/chitietsanpham?idSP="+pro._id)}>
                <Stack>
                  <Box height="250px" width="100%">
                    <img
                      width="100%"
                      height="100%"
                      src={`http://localhost:3000/assets/${pro.anhDaiDien}`}
                      alt=""
                    />
                  </Box>
                  <Box>
                    <Typography fontSize="20px" fontWeight="bold" textAlign="center">{pro.tenSanPham}</Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="15px" sx={{textDecorationLine: "line-through"}} color="red" fontWeight="bold" textAlign="center">{parseInt(pro.giaGoc).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="20px" fontWeight="bold" textAlign="center">{parseInt(pro.giaBan).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Typography>
                  </Box>
                </Stack>
              </div>
            );
          })}
        </>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" p="10px"><Typography fontSize="50px" fontWeight="bold">Sản Phẩm Nổi Bật</Typography></Box>
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        sx={{
          '& > div': 'span 5',
        }}
      >
        <>
          {spNoiBat.map((pro) => {
            return (
              <div key={pro._id} sx={{ gridColumn: 'span 1' }} onClick={() => navigate("/chitietsanpham?idSP="+pro._id)}>
                <Stack>
                  <Box height="250px" width="100%">
                    <img
                      width="100%"
                      height="100%"
                      src={`http://localhost:3000/assets/${pro.anhDaiDien}`}
                      alt=""
                    />
                  </Box>
                  <Box>
                    <Typography fontSize="20px" fontWeight="bold" textAlign="center">{pro.tenSanPham + " " + pro.dungLuong+"GB"}</Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="15px" sx={{textDecorationLine: "line-through"}} color="red" fontWeight="bold" textAlign="center">{parseInt(pro.giaGoc).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="20px" fontWeight="bold" textAlign="center">{parseInt(pro.giaBan).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Typography>
                  </Box>
                </Stack>
              </div>
            );
          })}
        </>
      </Box>
    </Box>
  );
};
export default TrangChu;
