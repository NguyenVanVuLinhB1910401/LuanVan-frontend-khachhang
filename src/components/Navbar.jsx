import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import './Navbar.css';
import FormLogin from '../views/login';
import FormRegister from '../views/register';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from '../state';

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      sx={{
        height: '8vh',
        background: "#4cceac",
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
            <Link to="/sanpham">Giới thiệu</Link>
          </li>
          <li className="nav-item">
            <Link to="/sanpham">Liên hệ</Link>
          </li>
          <li className="nav-item">
            <Link to="/giohang">Giỏ hàng</Link>
          </li>
          {token && (
            <li className="nav-item">
                <Link to="/lichsudathang">Lịch sử đặt hàng</Link>
            </li>
          )}
        </Box>
        <Box gap={2} className="nav-menu">
          {token ? (
            <li
              className="nav-item"
              onClick={() => {dispatch(setLogout()); navigate("/")}}
              style={{ fontSize: '16px', color: '#fff' }}
            >
              Đăng xuất ({user.hoTen})
            </li>
          ) : (
            <FormLogin />
          )}
          {!token && <FormRegister />}
        </Box>
      </Box>
    </Box>
  );
};
export default NavBar;
