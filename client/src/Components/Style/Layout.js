import React from "react";
import styled from "styled-components";
import Header from "../Global/Header/index";
import Sidebar from "../Global/Sidebar/index";
import Footer from "../Global/Footer/index";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
  padding-bottom: 50px;
  .content {
    margin-top: 100px;
    margin-left: 120px;
  }
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Wrapper>
        <Sidebar />
        <section className="content">{children}</section>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default Layout;
