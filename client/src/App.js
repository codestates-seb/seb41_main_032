import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Style/Layout";
import StockTopList from "./Page/Stock/TopList";
import StockDetail from "./Page/Stock/Detail";
import StockAllList from "./Page/Stock/AllList";
import Login from "./Page/User/Login";
import SignUp from "./Page/User/SignUp/index";
import Board from "./Page/Board/ArticleList";
import NewArticle from "./Page/Board/NewArticle";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StockTopList />} />
        <Route path="/stock/:id" element={<StockDetail />} />
        <Route path="/stock/List" element={<StockAllList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/new" element={<NewArticle />} />
      </Routes>
    </Layout>
  );
}

export default App;
