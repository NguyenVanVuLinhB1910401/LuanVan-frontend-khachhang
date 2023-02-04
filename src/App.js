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
import ImageSlider from "./components/ImageSlider";
import Footer from "./components/Footer";
function App() {
  const [theme, colorMode] = useMode();
  //console.log(useSelector((state) => state.token));
  // const isAuth = Boolean(useSelector((state) => state.token));
  const slides = [
    { url: "http://localhost:3002/assets/image1.png",},
    { url: "http://localhost:3002/assets/image2.png",},
    { url: "http://localhost:3002/assets/image3.png",},
    { url: "http://localhost:3002/assets/image4.png",},
    { url: "http://localhost:3002/assets/image5.png",},
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
          <ImageSlider slides={slides} />
            <NavBar />
            
            <Routes>
              <Route path="/" element={<TrangChu />} />
              <Route path="/sanpham" element={<SanPham />} />
              <Route path="/chitietsanpham" element={<ChiTietSanPham />} />
              <Route path="/giohang" element={<GioHang />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
