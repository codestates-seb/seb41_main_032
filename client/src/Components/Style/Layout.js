import React from "react";
import styled from "styled-components";
import Header from "../Global/Header";
import Sidebar from "../Global/Sidebar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .content {
    margin-left: 120px;
  }
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Wrapper>
        <Sidebar />
        <div className="content">{children}</div>
      </Wrapper>
    </div>
  );
};

export default Layout;
