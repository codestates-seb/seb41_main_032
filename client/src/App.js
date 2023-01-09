import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Style/Layout";
import Home from "./Page/Home";
import Stock from "./Page/Stock";
import Login from "./Page/User/Login";
import SignUp from "./Page/User/SignUp/index";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:id" element={<Stock />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Layout>
  );
}

export default App;
