import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from "../../state";
const CartItem = ({ id, tenSanPham, image, gia, soLuong }) => {
  const dispatch = useDispatch();
  let nf = new Intl.NumberFormat('vi-VN');
  return (
    <Box
      key={id}
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(20, minmax(0, 1fr))"
      sx={{
        padding: '10px 5px',
        margin: '10px 100px',
        '& > div': 'span 20',
        background: '#e1e2fe',
        border: '1px solid black',
        borderRadius: "20px"
      }}
    >
      <>
        <Box
          fontSize="18px"
          sx={{
            gridColumn: 'span 2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            width="100%"
            height="100%"
            src={`http://localhost:3000/assets/${image}`}
            alt="hình ảnh"
          />
        </Box>
        <Box
          sx={{
            gridColumn: 'span 6',
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          <Typography fontSize="30px">{tenSanPham}</Typography>
        </Box>

        <Box
          fontSize="18px"
          sx={{
            gridColumn: 'span 2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box display="flex" justifyContent="center">
          <IconButton onClick={() => dispatch(decrementQuantity(id))}>
              <RemoveIcon />
            </IconButton>
            <Typography fontSize="30px">{soLuong}</Typography>
            <IconButton onClick={() => dispatch(incrementQuantity(id))}>
              <AddIcon />
            </IconButton>
            
          </Box>
        </Box>
        <Box
          fontSize="18px"
          sx={{
            gridColumn: 'span 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize="30px">{nf.format(gia)}</Typography>
        </Box>
        <Box
          fontSize="18px"
          sx={{
            gridColumn: 'span 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize="30px">{nf.format(gia*soLuong)}</Typography>
        </Box>
        <Box
          fontSize="18px"
          sx={{
            gridColumn: 'span 1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton onClick={() => dispatch(removeItem(id))} ><DeleteIcon /></IconButton>
        </Box>
      </>
    </Box>
  );
};

export default CartItem;
