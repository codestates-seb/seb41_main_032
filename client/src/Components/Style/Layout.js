import React from "react";
import styled from "styled-components";
import Header from "../Global/Header/index";
import Sidebar from "../Global/Sidebar/index";
import Footer from "../Global/Footer/index";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
  padding-bottom: 50px;
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
      <Footer />
    </div>
  );
};

export default Layout;
