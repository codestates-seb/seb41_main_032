import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './Components/Style/Layout';
import Board from './Page/Board/ArticleList';
import Article from './Page/Board/Detail';
import NewArticle from './Page/Board/NewArticle';
import Home from './Page/Home';
import StockAllList from './Page/Stock/AllList';
import StockDetail from './Page/Stock/Detail';
import StockTopList from './Page/Stock/TopList';
import EditProfile from './Page/User/Edit/index';
import Login from './Page/User/Login';
import MyPage from './Page/User/MyPage';
import SignUp from './Page/User/SignUp/index';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stock/:id" element={<StockDetail />} />
                    <Route path="/stock/top" element={<StockTopList />} />
                    <Route path="/stock/List" element={<StockAllList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/board/new" element={<NewArticle />} />
                    <Route path="/board/detail/:num" element={<Article />} />
                    <Route path="/users/:id" element={<MyPage />} />
                    <Route path="/users/:id/edit" element={<EditProfile />} />
                </Routes>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}

export default App;
