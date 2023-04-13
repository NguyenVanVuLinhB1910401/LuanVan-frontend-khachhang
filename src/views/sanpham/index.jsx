import { Box, Typography, IconButton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../state';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const SanPham = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dsLoai, setDSLoai] = useState([]);
  const [dsHang, setDSHang] = useState([]);
  const [hangDT, setHangDT] = useState('');
  const [loaiDT, setLoaiDT] = useState('');
  const [dsSanPham, setDSSanPham] = useState([]);
  const idCN = useSelector((state) => state.idCN);
  let nf = new Intl.NumberFormat('vi-VN');
  const getALLLoaiSP = () => {
    axios
      .get('http://localhost:3000/api/loaisanphams')
      .then((res) => {
        if (res.status === 200) {
          setDSLoai(res.data.result);
        }
      })
      .catch((res) => console.log(res));
  };
  const getALLHangDT = () => {
    axios
      .get('http://localhost:3000/api/hangdienthoais')
      .then((res) => {
        if (res.status === 200) {
          setDSHang(res.data.result);
        }
      })
      .catch((res) => console.log(res));
  };
  const getALLSanPham = () => {
    axios
      .get(`http://localhost:3000/api/sanphamskhtheocn/${idCN}`)
      .then((res) => {
        if (res.status === 200) {
          setDSSanPham(res.data.result);
        }
      })
      .catch((res) => console.log(res));
  };
  const getALLSanPhamFilter = () => {
    if(loaiDT !== '' || hangDT !== '') {
      axios
      .get(`http://localhost:3000/api/sanphamskhtheocn/${idCN}?idLoai=${loaiDT}&&idHang=${hangDT}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setDSSanPham(res.data.result);
        }
      })
      .catch((res) => console.log(res));
    }
  };
  useEffect(() => {
    getALLLoaiSP();
    getALLHangDT();
    getALLSanPham();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getALLSanPham();
  }, [idCN]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box sx={{ background: '#fff' }}>
      <Box display="flex" justifyContent="center" margin="10px 0px" p="5px" sx={{background: "#fbfbfb"}}>
        <Typography fontSize="30px" fontWeight="bold">
          DANH SÁCH SẢN PHẨM
        </Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        sx={{
          '& > div': 'span 12',
        }}
      >
        <>
          <Box
            sx={{
              gridColumn: 'span 2',
            }}
          >
            <Box
              sx={{
                padding: '10px',
                background: '#fbfbfb',
              }}
            >
              <Box>
                <Typography fontSize="18px" fontWeight="bold">
                  Loại điện thoại
                </Typography>
                <hr />
              </Box>
              {dsLoai.map((loai) => (
                <Box
                  m="5px 0px"
                  display="flex"
                  justifyContent="space-between"
                  key={loai._id}
                  onClick={() => setLoaiDT(loai._id !== loaiDT ? loai._id : "")}
                >
                  <Box display="flex" alignItems="center">
                    <Typography fontSize="16px">{loai.tenLoaiSP}</Typography>
                  </Box>
                  {loai._id === loaiDT ? (
                    <IconButton>
                      <CheckBoxIcon />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <CheckBoxOutlineBlankIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                marginTop: '10px',
                padding: '10px',
                background: '#fbfbfb',
              }}
            >
              <Box>
                <Typography fontSize="18px" fontWeight="bold">
                  Hãng điện thoại
                </Typography>
                <hr />
              </Box>
              {dsHang.map((hang) => (
                <Box key={hang._id}>
                  <Box
                    m="5px 0px"
                    display="flex"
                    justifyContent="space-between"
                    key={hang._id}
                    onClick={() => setHangDT(hang._id !== hangDT ? hang._id : "")}
                  >
                    <Typography>{hang.tenHang}</Typography>
                    {hang._id === hangDT ? (
                      <IconButton>
                        <CheckBoxIcon />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <CheckBoxOutlineBlankIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box marginTop="15px">
              <Button
                sx={{
                  width: '100%',
                  background: '#70d8bd',
                  ':hover': {
                    background: '#4cceac',
                  },
                }}
                onClick={()=> getALLSanPhamFilter()}
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: 'span 10',
            }}
          >
            {dsSanPham.length > 0 ? (
              <Box
                display="grid"
                gap="5px"
                justifyContent="center"
                m="0px 15px 15px 15px"
                gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                sx={{
                  '& > div': 'span 12',
                }}
              >
                <>
                  {dsSanPham.map((data) => (
                    <Box
                      key={data._id}
                      sx={{
                        gridColumn: 'span 3',
                        // border: "1px solid black",
                        position: 'relative',
                        background: '#fbfbfb',
                      }}
                    >
                      <Box
                        onClick={() =>
                          navigate('/chitietsanpham?idSP=' + data._id)
                        }
                      >
                        <img
                          width="100%"
                          height="100%"
                          src={`http://localhost:3000/assets/${data.sanpham.anhDaiDien}`}
                          alt="hình ảnh"
                        />
                      </Box>
                      <Box
                        onClick={() =>
                          navigate('/chitietsanpham?idSP=' + data._id)
                        }
                      >
                        <Typography
                          fontSize="20px"
                          fontWeight="bold"
                          textAlign="center"
                        >
                          {data.sanpham.tenSanPham}
                        </Typography>
                      </Box>
                      <Box
                        onClick={() =>
                          navigate('/chitietsanpham?idSP=' + data._id)
                        }
                      >
                        <Typography
                          fontSize="15px"
                          sx={{ textDecorationLine: 'line-through' }}
                          color="red"
                          fontWeight="bold"
                          textAlign="center"
                        >
                          {nf.format(data.sanpham.giaBan) + ' VNĐ'}
                        </Typography>
                      </Box>
                      <Box
                        onClick={() =>
                          navigate('/chitietsanpham?idSP=' + data._id)
                        }
                      >
                        <Typography
                          fontSize="20px"
                          fontWeight="bold"
                          textAlign="center"
                        >
                          {nf.format(data.sanpham.giaBan * (1 - data.sanpham.khuyenMai/100)) + ' VNĐ'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '1%',
                          right: '1%',
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(
                              addToCart({
                                id: data.sanpham._id,
                                tenSanPham: data.sanpham.tenSanPham,
                                image: data.sanpham.anhDaiDien,
                                gia: data.sanpham.giaBan * (1 - data.sanpham.khuyenMai/100),
                                idCN: data.idCN,
                              })
                            )
                          }
                          sx={{
                            ':hover': {
                              background: 'yellow',
                            },
                          }}
                        >
                          <LocalMallIcon
                            sx={{ fontSize: '30px', color: '#3da58a' }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </>
              </Box>
            ) : (
              <Typography>Không có sản phẩm nào</Typography>
            )}
          </Box>
        </>
      </Box>
    </Box>
  );
};
export default SanPham;
