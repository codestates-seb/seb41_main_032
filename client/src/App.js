import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./Components/Style/Layout";
import AssetManagement from "./Page/AssetManagement";
import Board from "./Page/Board/ArticleList";
import Article from "./Page/Board/Detail";
import NewArticle from "./Page/Board/NewArticle";
import EditArticle from "./Page/Board/Edit/index";
import Home from "./Page/Home";
import AddBookMarks from "./Page/Stock/AddBookMarks";
import StockAllList from "./Page/Stock/AllList";
import StockDetail from "./Page/Stock/Detail";
import StockTopList from "./Page/Stock/TopList";
import Login from "./Page/User/Login";
import MyPage from "./Page/User/MyPage";
import SignUp from "./Page/User/SignUp/index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock/:id" element={<StockDetail />} />
            <Route path="/stock/top" element={<StockTopList />} />
            <Route path="/stock/List" element={<StockAllList />} />
            <Route path="/stock/AddBookMarks" element={<AddBookMarks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/new" element={<NewArticle />} />
            <Route path="/board/detail/:num" element={<Article />} />
            <Route path="/board/edit/:num" element={<EditArticle />} />
            <Route path="/users/:id" element={<MyPage />} />
            <Route path="/AssetManagement" element={<AssetManagement />} />
          </Routes>
        </Layout>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
