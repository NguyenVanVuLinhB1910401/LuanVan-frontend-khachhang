import { ColorModeContext, useMode} from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route,  } from "react-router-dom";
// import { Box } from "@mui/material";
//import { useSelector} from "react-redux";
import NavBar from "./components/Navbar";
import TrangChu from "./views/trangchu/";
import DangKy from "./views/register";
import DangNhap from "./views/login";
import SanPham from "./views/sanpham";
import "./App.css";
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
            <div className="slide">
              <div className="show-image">
                <img src={`../assets/image1.png`} className="img-feature" alt=""/>
                <div className="control prev">Prev</div>
                <div className="control next">Next</div>
              </div>
              <div className="list-image">
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
                  <div><img src={`../assets/image1.png`} alt=""/></div>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<TrangChu />} />
              <Route path="/login" element={<DangNhap />} />
              <Route path="/register" element={<DangKy />} />
              <Route path="/sanpham" element={<SanPham />} />
              {/* <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
              <Route path="/" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/loaisp" element={isAuth ? <LoaiSanPham /> : <Navigate to="/login" />} />
              <Route path="/sanpham" element={isAuth ? <SanPham /> : <Navigate to="/login" />} />
              <Route path="/sanpham/them" element={isAuth ? <FormSanPham /> : <Navigate to="/login" />} />
              <Route path="/hangdt" element={isAuth ? <HangDienThoai /> : <Navigate to="/login" />} />
              <Route path="/chinhanh" element={isAuth ? <ChiNhanh /> : <Navigate to="/login" />} /> */}
            </Routes>
            
          
          </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
