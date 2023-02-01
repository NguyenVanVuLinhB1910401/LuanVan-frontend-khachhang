import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import axios from 'axios';
// import { useDispatch } from 'react-redux';


const initialValues = {
  hoTen: '',
  taiKhoan: '',
  matKhau: '',
  nhapLaiMK: '',
  email: '',
  sdt: '',
  diaChi: ''
};

const registerSchema = yup.object().shape({
  hoTen: yup.string().required('Họ tên không được để trống.'),
  taiKhoan: yup.string().required('Tài khoản không được để trống.'),
  matKhau: yup.string().required('Mật khẩu không được để trống.'),
  nhapLaiMK: yup.string().required('Không được để trống.'),
  email: yup.string().required('Email không được để trống.'),
  sdt: yup.string().required('Số điện thoại không được để trống.'),
  diaChi: yup.string().required('Địa chỉ không được để trống.'),
});
const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleFormSubmit = async (values, onSubmitProps) => {
    //console.log(values);
    if (values.matKhau === values.nhapLaiMK) {
        axios
      .post('http://localhost:3000/api/users/register', values)
      .then((res) => {
        if (res.status === 201) {
            alert("Đăng ký thành công");
            navigate(`/login`);
        }
      })
      .catch((res) => {
        if (res.response.status === 400) {
          alert(res.response.data.message);
        }
      });
    } else {
        alert("Mật khẩu không khớp");
    }
  };
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        m="0 auto"
        p="30px"
        width="60%"
        borderRadius="15px"
        sx={{
          background: colors.grey[900],
        }}
      >
        <Box textAlign="center" mb="20px">
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color={colors.greenAccent[500]}
          >
            ĐĂNG KÝ TÀI KHOẢN
          </Typography>
        </Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={registerSchema}
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
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  '& > div': 'span 2',
                }}
              >
                <>
                  <TextField
                    label="Họ tên"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.hoTen}
                    name="hoTen"
                    error={
                      Boolean(touched.hoTen) && Boolean(errors.hoTen)
                    }
                    helperText={touched.hoTen && errors.hoTen}
                    sx={{ gridColumn: 'span 1' }}
                  />

                <TextField
                  label="Tài khoản"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.taiKhoan}
                  name="taiKhoan"
                  error={Boolean(touched.taiKhoan) && Boolean(errors.taiKhoan)}
                  helperText={touched.taiKhoan && errors.taiKhoan}
                  sx={{ gridColumn: 'span 1' }}
                />

                <TextField
                  label="Mật khẩu"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.matKhau}
                  name="matKhau"
                  error={Boolean(touched.matKhau) && Boolean(errors.matKhau)}
                  helperText={touched.matKhau && errors.matKhau}
                  sx={{ gridColumn: 'span 1' }}
                />
                <TextField
                  label="Email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: 'span 1' }}
                />
                <TextField
               
                  label="Nhập lại mật khẩu"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nhapLaiMK}
                  name="nhapLaiMK"
                  error={Boolean(touched.nhapLaiMK) && Boolean(errors.nhapLaiMK)}
                  helperText={touched.nhapLaiMK && errors.nhapLaiMK}
                  sx={{ gridColumn: 'span 1' }}
                />
                
                
                <TextField
                  label="Số điện thoại"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sdt}
                  name="sdt"
                  error={Boolean(touched.sdt) && Boolean(errors.sdt)}
                  helperText={touched.sdt && errors.sdt}
                  sx={{ gridColumn: 'span 1' }}
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
                    sx={{ gridColumn: 'span 2' }}
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
                    gridColumn: 'span 2'
                  }}
                >
                  <Typography variant="h5">Đăng ký</Typography>
                </Button>
                  
                </>
              </Box>

                
              
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
