import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const initialValues = {
  hoTen: '',
  sdt: '',
  email: '',
  diaChi: '',
  ghiChu: 'Giao buổi trưa nha hihihi',
  idCN: '',
  httt: 'Khi nhận hàng',
};

const thanhToanSchema = yup.object().shape({
  hoTen: yup.string().required('Không được để trống'),
  sdt: yup.string().required('Không được để trống'),
  email: yup.string().required('Không được để trống'),
  diaChi: yup.string().required('Không được để trống'),
  idCN: yup.string().required('Không được để trống'),
  httt: yup.string().required('Không được để trống'),
});
const ThanhToan = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += parseInt(item.soLuong);
      totalPrice += parseInt(item.gia) * parseInt(item.soLuong);
    });
    return { totalPrice, totalQuantity };
  };
  const [dsChiNhanh, setDSChiNhanh] = useState([]);
  const getAllChiNhanh = () => {
    axios
      .get('http://localhost:3000/api/chinhanhs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.result;
          setDSChiNhanh(data);
        }
      })
      .catch((err) => console.log(err));
  };
  const dateTime = () => {
    var today = new Date();
    var date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    values.cart = cart;
    values.total = getTotal().totalPrice;
    values.idKH = user._id;
    values.ngayDat = dateTime();
    // console.log(values);
    axios
      .post(`http://localhost:3000/api/thanhtoans/thanhtoan`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          //console.log(response.data.result);
          alert('Đặt hàng thành công.');
        }
        if (response.status === 200) {
          console.log(response.data);
          window.location = response.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //onSubmitProps.resetForm();
  };

  useEffect(() => {
    getAllChiNhanh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box
      m="0px 100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="84vh"
      sx={{ background: '#fff' }}
    >
      <Box display="flex" p="10px" width="100%" gap={2}>
        <Box
          sx={{
            width: '30%',
            padding: '10px',
            border: '1px solid #e0e0e0',
            background: '#fbfbfb',
          }}
        >
          <Box>
            <Typography fontSize="30px" fontWeight="bold">
              Thông tin đặt hàng
            </Typography>
          </Box>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={thanhToanSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Họ tên"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hoTen}
                  name="hoTen"
                  error={Boolean(touched.hoTen) && Boolean(errors.hoTen)}
                  helperText={touched.hoTen && errors.hoTen}
                  sx={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                />
                <TextField
                  label="Số điện thoại"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sdt}
                  name="sdt"
                  error={Boolean(touched.sdt) && Boolean(errors.sdt)}
                  helperText={touched.sdt && errors.sdt}
                  sx={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                />
                <TextField
                  label="Địa chỉ"
                  multiline
                  rows="2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.diaChi}
                  name="diaChi"
                  error={Boolean(touched.diaChi) && Boolean(errors.diaChi)}
                  helperText={touched.diaChi && errors.diaChi}
                  sx={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                />
                <TextField
                  select
                  fullWidth
                  label="Chi nhánh"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.idCN}
                  name="idCN"
                  error={Boolean(touched.idCN) && Boolean(errors.idCN)}
                  helperText={touched.idCN && errors.idCN}
                  sx={{ gridColumn: 'span 1' }}
                >
                  <MenuItem value="">
                    <em>Chọn chi nhánh đặt hàng</em>
                  </MenuItem>
                  {dsChiNhanh.map((chiNhanh) => (
                    <MenuItem key={`${chiNhanh._id}`} value={chiNhanh._id}>
                      {chiNhanh.tenChiNhanh +
                        '( địa chỉ: ' +
                        chiNhanh.diaChiChiNhanh +
                        ' )'}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '10px 0px',
                  }}
                >
                  <Box display="flex" gap={3} alignItems="center">
                    <FormLabel>Hình thức thanh toán:</FormLabel>
                    <Field
                      as={RadioGroup}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.httt}
                      name="httt"
                    >
                      <Box display="flex">
                        <FormControlLabel
                          value="Khi nhận hàng"
                          control={<Radio />}
                          label="Khi nhận hàng"
                        />
                        <FormControlLabel
                          value="VNPAY"
                          control={<Radio />}
                          label="VNPAY"
                        />
                      </Box>
                    </Field>
                  </Box>
                </FormControl>
                <Button
                  sx={{
                    width: '100%',
                    padding: '10px 0px',
                    fontSize: '15px',
                    background: '#4cceac',
                    ':hover': {
                      background: '#3da58a',
                      color: '#fff',
                    },
                  }}
                  type="submit"
                >
                  Thanh toán
                </Button>
              </form>
            )}
          </Formik>
        </Box>
        <Box
          sx={{
            width: '70%',
            padding: '10px',
            border: '1px solid #e0e0e0',
            background: '#fbfbfb',
          }}
        >
          <Box>
            <Typography fontSize="30px" fontWeight="bold">
              Danh sách sản phẩm
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              borderBottom: '1px solid #e0e0e0',
              padding: '10px',
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width="100px"
            >
              <Box>
                <Typography fontSize="20px">Hình ảnh</Typography>
              </Box>
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
            </Box>
          </Box>
          {cart !== undefined &&
            cart.map((sp) => {
              return (
                <Box
                key={sp.id}
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
                    width="100px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
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
                      <Typography fontSize="20px">
                        {sp.gia * sp.soLuong}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          <Box display="flex" justifyContent="end" p="10px">
            <Box display="flex" justifyContent="space-between" width="250px">
              <Box>
                <Typography fontSize="20px" fontWeight="bold">
                  Tổng tiền:{' '}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="20px">{getTotal().totalPrice}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThanhToan;
