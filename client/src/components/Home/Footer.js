import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

//local imports
import { phone } from "../helpers/mediaQueries";
// import { FacebookIcon, TwitterIcon, GithubIcon } from "../../static/Icons";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const FooterWrapper = styled.div`
  background-image: linear-gradient(#fafbfc 0, #fff 36px);
`;

const FooterStyle = styled.div`
  -webkit-font-smoothing: antialiased;

  box-sizing: border-box;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  padding: 144px 0 72px;
  ${phone(css`
    flex-direction: column;
    padding: 40px 0 40px;
  `)};
`;

const FooterLeftStyle = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  flex: 2;
  margin: 0;
  padding: 0;
  text-align: left;
  ${phone(css`
    padding: 0px 0px 20px 0px;
    text-align: center;
  `)};
`;

const FooterRightStyle = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  display: flex;
  flex: 3;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const FooterRightItemsGroupStyle = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: left;
  &:last-child {
    text-align: center;
  }
`;

const FooterItemsStyle = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #1c1d1e;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.75em;
  margin: 0;
  opacity: 0.85;
  padding: 0;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  &:first-child {
    font-weight: bold;
    opacity: 1;
  }
  &:nth-child(2) {
    margin: 12px 0 0;
  }
`;

const LogoStyle = styled.p`
  font-weight: 700;
  font-size: 1.4rem;
  cursor: pointer;
`;

const ALinkStyle = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterStyle>
        <FooterLeftStyle>
          <StyledLink href="/">
            {/* <LogoStyle>iprhub</LogoStyle> */}
          </StyledLink>
          <FooterItemsStyle>
            © Copyright 2019 iprhub. All rights reserved.
          </FooterItemsStyle>
        </FooterLeftStyle>
        <FooterRightStyle>
          <FooterRightItemsGroupStyle>
            <FooterItemsStyle>Company</FooterItemsStyle>
            <StyledLink to="/">
              <FooterItemsStyle>Home</FooterItemsStyle>
            </StyledLink>
            <StyledLink to="/contact">
              <FooterItemsStyle>Contact</FooterItemsStyle>
            </StyledLink>
            <StyledLink to="/about">
              <FooterItemsStyle>About</FooterItemsStyle>
            </StyledLink>
            <ALinkStyle href="/dashboard">
              <FooterItemsStyle>Sign in</FooterItemsStyle>
            </ALinkStyle>
          </FooterRightItemsGroupStyle>
          <FooterRightItemsGroupStyle>
            <FooterItemsStyle>Legal</FooterItemsStyle>
            <FooterItemsStyle>Privacy Policy</FooterItemsStyle>
            <FooterItemsStyle>TnCs</FooterItemsStyle>
          </FooterRightItemsGroupStyle>
          <FooterRightItemsGroupStyle>
            <FooterItemsStyle>Stay in Touch</FooterItemsStyle>
            {/* <FooterItemsStyle>
              <FacebookIcon size="24" />
            </FooterItemsStyle>
            <FooterItemsStyle>
              <TwitterIcon size="24" />
            </FooterItemsStyle>
            <FooterItemsStyle>
              <GithubIcon size="24" />
            </FooterItemsStyle> */}
          </FooterRightItemsGroupStyle>
        </FooterRightStyle>
      </FooterStyle>
    </FooterWrapper>
  );
};

export default Footer;
