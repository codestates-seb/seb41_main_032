
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Stock from "./Page/Stock";

import Layout from "./Components/Style/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:id" element={<Stock />} />
      </Routes>
    </Layout>
  );
}

export default App;
