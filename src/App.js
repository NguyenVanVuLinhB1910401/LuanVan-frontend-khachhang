import { ColorModeContext, useMode} from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route,  } from "react-router-dom";
// import { Box } from "@mui/material";
//import { useSelector} from "react-redux";
import NavBar from "./components/Navbar";
import TrangChu from "./views/trangchu/";
import SanPham from "./views/sanpham";
import ChiTietSanPham from "./views/chitietsanpham";
import GioHang from "./views/cart";
import ThanhToan from "./views/thanhtoan";
import LichSuDatHang from "./views/lichsudathang";
import ChiTietDonHang from "./views/lichsudathang/chitietdonhang";
import Footer from "./components/Footer";
function App() {
  const [theme, colorMode] = useMode();
  //console.log(useSelector((state) => state.token));
  // const isAuth = Boolean(useSelector((state) => state.token));
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <NavBar />
            <Routes>
              <Route path="/" element={<TrangChu />} />
              <Route path="/sanpham" element={<SanPham />} />
              <Route path="/chitietsanpham" element={<ChiTietSanPham />} />
              <Route path="/giohang" element={<GioHang />} />
              <Route path="/thanhtoan" element={<ThanhToan />} />
              <Route path="/lichsudathang" element={<LichSuDatHang />} />
              <Route path="/chitietdonhang/:id" element={<ChiTietDonHang />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
