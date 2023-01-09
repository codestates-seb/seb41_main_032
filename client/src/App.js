import { Route, Routes } from "react-router-dom";
import Header from "./Page/Global/Header/index";
// import Sidebar from "./Page/Global/Sidebar/index";
import Home from "./Page/Home";
import Stock from "./Page/Stock";
import SignUp from "./Page/User/SignUp/index";

/**
 * @todo 사이드바와 컨텐츠 ui가 겹처서 보입니다 수정해주세요
 */
function App() {
  return (
    <div className="App">
      <Header />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:id" element={<Stock />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
