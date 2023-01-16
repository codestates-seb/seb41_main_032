import React from "react";
import styled from "styled-components";
import Header from "../Global/Header/index";
import Sidebar from "../Global/Sidebar/index";
import Footer from "../Global/Footer/index";

const Div = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 63px 15px auto 15px 250px;
  grid-template-columns: 112px auto;
  grid-template-areas:
    "header header"
    ". ."
    "side main"
    ". ."
    "footer footer";
`;

const Wrapper = styled.main`
  display: grid;
  grid-area: main;
`;

const Layout = ({ children }) => {
  return (
    <Div>
      <Header />
      <Sidebar />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Div>
  );
};

export default Layout;
