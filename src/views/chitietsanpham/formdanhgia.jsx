import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
  } from '@mui/material';
  import { useSelector } from 'react-redux';
  import { useTheme } from '@mui/material';
  import { tokens } from '../../theme';
  import { useState } from 'react';
  import { Formik } from 'formik';
  import * as yup from 'yup';
  import axios from "axios";
  import Rating from '@mui/material/Rating';
  import { toast } from 'react-toastify';
  const FormDanhGia = ({idSP, idUser}) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme);
    const token = useSelector((state) => state.token);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleHuy = () => {
      setOpen(false);
    };
  
    const [value, setValue] = useState(0);
    const [noiDung, setNoiDung] = useState("");
    
    const handleSubmit = () => {
        const data = {
            productId: idSP,
            userId: idUser,
            soSao: value,
            noiDung: noiDung,
            createdAt: new Date(),
        };
        axios
        .post(`http://localhost:3000/api/danhgias`, data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if(response.status === 200) {
            //console.log(response.data);
            toast.success("Đánh giá thành công");
            //console.log(backendComments);
            handleHuy();
          }
        })
        .catch((err) => console.log(err));
    };
    return (
      <Box>
        <Typography sx={{fontSize: "18px", marginLeft: "10px", ":hover": {
            color: "blue",
            cursor: "pointer"
        }}} onClick={handleClickOpen}>
          Đánh giá
        </Typography>
        <Dialog open={open}>
          <DialogTitle sx={{margin: "0 auto", fontWeight: "bold", fontSize: "24px"}}>ĐÁNH GIÁ SẢN PHẨM</DialogTitle>
          <DialogContent>
            <Box display="flex" justifyContent="center" alignItems="center">
                  <form>
                    <Box display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="center"><Rating
                        name="simple-controlled"
                        sx={{fontSize: "30px"}}
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    /></Box>
                    <TextField 
                        multiline
                        rows="4"
                        label="Nội dung đánh giá"
                        name="noiDung"
                        onChange={(event) => setNoiDung(event.target.value)}
                        sx={{
                            marginTop: "15px",
                            width: "300px"
                        }}
                      />
                      <Box display="flex" justifyContent="end" mt="15px">
                        <Button onClick={handleSubmit}>Lưu</Button>
                        <Button onClick={handleHuy}>Hủy</Button>
                      </Box>
                    </Box>
                  </form>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    );
  };
  
  export default FormDanhGia;
  