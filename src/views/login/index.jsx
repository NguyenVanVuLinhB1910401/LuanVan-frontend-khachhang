import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import { setLogin } from '../../state';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
const initialValues = {
  taiKhoan: '',
  matKhau: '',
};

const loginSchema = yup.object().shape({
  taiKhoan: yup.string().required('Tài khoản không được để trống.'),
  matKhau: yup.string().required('Mật khẩu không được để trống.'),
});

const FormDangNhap = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleHuy = () => {
    setOpen(false);
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    //console.log(values);
    axios
      .post('http://localhost:3000/api/users/loginKH', values)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setLogin({
              user: res.data.user,
              token: res.data.token,
            })
          );
          handleHuy();
          //navigate('/');
          toast.success("Đăng nhập thành công");
        }
      })
      .catch((res) => {
        if (res.response.status === 400) {
          toast.error(res.response.data.message);
        }
      });
    
  };
  
  return (
    <Box>
      <li style={{fontSize: "16px", color: "#fff"}} className="nav-item" onClick={handleClickOpen}>
        Đăng nhập
      </li>
      <Dialog open={open} >
        <Box sx={{
      backgroundImage: "linear-gradient(to right, #d0eef2, #a2ebf5)",
    }}>
        <DialogTitle>
          <Box display="flex" justifyContent="end">
            <ClearIcon onClick={handleHuy} />
          </Box>
        </DialogTitle>
        <DialogContent >
          <Box
            width="500px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              m="0 auto"
              width="100%"
              borderRadius="15px"
            >
              <Box textAlign="center" mb="20px">
                <Typography
                  fontWeight="bold"
                  fontSize="32px"
                  color={colors.greenAccent[500]}
                >
                  ĐĂNG NHẬP
                </Typography>
              </Box>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={loginSchema}
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
                    <Box gap="30px" display="flex" flexDirection="column">
                      <TextField
                        label="Tài khoản"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.taiKhoan}
                        name="taiKhoan"
                        error={
                          Boolean(touched.taiKhoan) && Boolean(errors.taiKhoan)
                        }
                        helperText={touched.taiKhoan && errors.taiKhoan}
                      />

                      <TextField
                        label="Mật khẩu"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.matKhau}
                        name="matKhau"
                        error={
                          Boolean(touched.matKhau) && Boolean(errors.matKhau)
                        }
                        helperText={touched.matKhau && errors.matKhau}
                      />

                      <Button
                        type="submit"
                        sx={{
                          m: '10px 0',
                          p: '20px',
                          borderRadius: '10px',
                          backgroundColor: colors.greenAccent[600],
                          '&:hover': {
                            backgroundColor: colors.greenAccent[500],
                          },
                        }}
                      >
                        <Typography variant="h5">Đăng nhập</Typography>
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};

export default FormDangNhap;
