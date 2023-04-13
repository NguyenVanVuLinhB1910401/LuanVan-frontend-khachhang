// Quan ly trong thai redux
// Co ba thanh phan: store, actions and reducers
//  - store la noi chua toan bo trang thai cua ung
//  - actions la su kien de gui du lieu tu ung dung den store. Cac actions duoc gui bang phuong thuc dispatch.
//  Action phai co thuoc tinh chi ra loai hanh dong va payload
//  - reducers la cac ham lay trang thai hien tai cua ung dung, thuc hien mot hanh dong va tra ve trang thai moi

import {createSlice} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const initialState = {
    user: null,
    token: null,
    cart: [],
    idCN: '',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
            toast.success("Đăng xuất thành công");
        },
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
              itemInCart.soLuong++;
              toast.success("Thêm sản phẩm thành công");
            } else {
              state.cart.push({ ...action.payload, soLuong: 1 });
              toast.success("Thêm sản phẩm thành công");
            }
          },
          incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            item.soLuong++;
          },
          decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item.soLuong === 1) {
              item.soLuong = 1
            } else {
              item.soLuong--;
            }
          },
          removeItem: (state, action) => {
            //console.log(action.payload);
            const removeItem = state.cart.filter((item) => item.id !== action.payload);
            state.cart = removeItem;
            toast.success("Xóa sản phẩm thành công");
          },
          removeAll: (state, action) => {            
            state.cart = [];
            //toast.success("Xóa tất cả sản phẩm thành công");
          },
          setIdCN: (state, action) => {
            state.idCN = action.payload.idCN;
          }
    }
});

export const { setLogin, setLogout, addToCart, incrementQuantity, decrementQuantity, removeItem, removeAll, setIdCN } = authSlice.actions;
export default authSlice.reducer;