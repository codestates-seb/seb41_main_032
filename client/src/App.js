import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import Stock from './Page/Stock';

import styled from 'styled-components';

import Header from './Page/Global/Header/index';
import Sidebar from './Page/Global/Sidebar/index';

const Div = styled.div`
    display: flex;
    flex-direction: row;
`;

/**
 * @todo 사이드바와 컨텐츠 ui가 겹처서 보입니다 수정해주세요
 */
function App() {
    return (
        <div className="App">
            <Header />

            {/* <Div>
                <Sidebar />
            </Div> */}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stock/:id" element={<Stock />} />
            </Routes>
        </div>
    );
}

export default App;
