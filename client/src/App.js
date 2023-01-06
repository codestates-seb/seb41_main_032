import styled from "styled-components";

import Header from "./Page/Global/Header/index";
import Sidebar from "./Page/Global/Sidebar/index";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;
function App() {
  return (
    <div className="App">
      <Header />
      <Div>
        <Sidebar />
      </Div>
    </div>
  );
}

export default App;
