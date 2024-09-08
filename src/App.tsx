import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/footer/Footer.tsx";
import Header from "./layout/header/Header.tsx";
// import SingleProduct from "./layout/singleproduct/SingleProduct.tsx";

import Home from "./pages/home/Home.tsx";
import Search from "./pages/search/Search.tsx";
import SingleProduct from "./layout/singleproduct/SingleProduct.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
      <Footer />
      {/*  */}
      {/* <SingleProduct /> */}
    </BrowserRouter>
  );
}

export default App;
