import React from "react";
import styled from "styled-components";
import Header from "../Global/Header/index";
import Sidebar from "../Global/Sidebar/index";
import Footer from "../Global/Footer/index";

const Div = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;

  height: auto;
  position: relative;
  min-height: 100%;
  padding-bottom: 250px;
  .content {
    margin-top: 100px;
    margin-left: 120px;
    width: 100%;
  }
`;

const Layout = ({ children }) => {
  return (
    <Div>
      <Header />
      <Wrapper>
        <Sidebar />
        <section className="content">{children}</section>
      </Wrapper>
      <Footer />
    </Div>
  );
};

export default Layout;
