import {
  Box,
  Typography,
  FormControl,
  Select,
  InputBase,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import './Navbar.css';
import FormLogin from '../views/login';
import FormRegister from '../views/register';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogout, setIdCN } from '../state';
import { Formik } from 'formik';
import * as yup from 'yup';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 3,
    border: `2px solid #db4f4a`,
    background: "#db4f4a",
    //padding: '0 4px',
  },
}));

let initialValues = {
  hoTen: '',
  email: '',
  sdt: '',
  diaChi: '',
};
const userSchema = yup.object().shape({
  hoTen: yup.string().required('Không được để trống'),
  email: yup.string().required('Không được để trống'),
  sdt: yup.string().required('Không được để trống'),
  // diaChi: yup.string().required('Không được để trống'),
});
const NavBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  
  initialValues.hoTen = user?.hoTen;
  initialValues.email = user?.email;
  initialValues.sdt = user?.sdt;
  initialValues.diaChi = user?.diaChi;
  //console.log(user);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleHuy = () => {
    setOpen(false);
  };
  const handleFormSubmit = (values) => {
    // console.log(values);
    handleHuy();
  };
  const [dsChiNhanh, setDSChiNhanh] = useState([]);
  const idCN = useSelector((state) => state.idCN);
  const getAllChiNhanh = async () => {
    const response = await axios.get('http://localhost:3000/api/chinhanhs');
    if (response.status === 200) {
      const data = response.data.result;
      setDSChiNhanh(data);
      setIdCN(data[0]._id)
    }
  };

  useEffect(() => {
    getAllChiNhanh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box
      display="flex"
      sx={{
        height: '8vh',
        background: '#4cceac',
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
          <li className="nav-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="nav-item">
            <Link to="/sanpham">Sản phẩm</Link>
          </li>
          <li className="nav-item">
            <Link to="/giohang"><Box>Giỏ hàng
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon sx={{ color: "#fff" }} />
                </StyledBadge>
              </IconButton></Box>
            </Link>
          </li>
          {token && (
            <li className="nav-item">
              <Link to="/lichsudathang">Lịch sử đặt hàng</Link>
            </li>
          )}
          {/* <li className="nav-item">
            <Link to="">Giới thiệu</Link>
          </li>
          <li className="nav-item">
            <Link to="">Liên hệ</Link>
          </li> */}
          <Typography sx={{ color: "#fff", fontSize: "16px" }}>Xem giá, tồn kho tại:</Typography>
          <Box display="flex" alignItems="center">
            <TextField
              select
              label="Chi nhánh"
              value={idCN}
              onChange={(e) => dispatch(setIdCN({idCN: e.target.value}))}
              sx={{
                width: "250px",
                color: "#fff"
              }}
            >
              {dsChiNhanh.map((chiNhanh) => (
                <MenuItem key={`${chiNhanh._id}`} value={chiNhanh._id}>
                  {chiNhanh.tenChiNhanh +
                    '( địa chỉ: ' +
                    chiNhanh.diaChiChiNhanh +
                    ' )'}
                </MenuItem>
              ))}
            </TextField>
          </Box>

        </Box>
        <Box gap={2} className="nav-menu">
          {token ? (
            // <li
            //   className="nav-item"
            //   onClick={() => {dispatch(setLogout()); navigate("/")}}
            //   style={{ fontSize: '16px', color: '#fff' }}
            // >
            //   Đăng xuất ({user.hoTen})
            // </li>
            <FormControl
              variant="standard"
              value={user.hoTen}
              sx={{ minWidth: '150px' }}
            >
              <Select
                value={user.hoTen}
                sx={{
                  backgroundColor: '#70d8bd',
                  color: '#fff',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                    color: '#fff',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: '#70d8bd',
                    color: '#fff',
                  },
                }}
                input={<InputBase sx={{ fontSize: '20px' }} />}
              >
                <MenuItem value={user.hoTen} onClick={handleClickOpen}>
                  <Typography>{user.hoTen}</Typography>
                </MenuItem>

                <MenuItem onClick={() => dispatch(setLogout())}>
                  Đăng xuất
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            <FormLogin />
          )}
          {!token && <FormRegister />}
        </Box>
      </Box>
      {user !== null && (<Box>
        <Dialog open={open}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            THÔNG TIN CÁ NHÂN
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="15px"
            >
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="flex"
                      gap={3}
                      flexDirection="column"
                      width="500px"
                    >
                      <TextField
                        label="Họ tên"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hoTen}
                        name="hoTen"
                        error={Boolean(touched.hoTen) && Boolean(errors.hoTen)}
                        helperText={touched.hoTen && errors.hoTen}
                      />
                      <TextField
                        label="Số điện thoại"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.sdt}
                        name="sdt"
                        error={Boolean(touched.sdt) && Boolean(errors.sdt)}
                        helperText={touched.sdt && errors.sdt}
                      />

                      <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <TextField
                        label="Địa chỉ"
                        multiline
                        rows={2}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.diaChi}
                        name="diaChi"
                        error={
                          Boolean(touched.diaChi) && Boolean(errors.diaChi)
                        }
                        helperText={touched.diaChi && errors.diaChi}
                      />
                      <Box display="flex" justifyContent="end" mt="15px">
                        {/* <Button type="submit">Cập nhật</Button> */}
                        <Button onClick={handleHuy}>Hủy</Button>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>)}
    </Box>
  );
};
export default NavBar;
