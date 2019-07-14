import React from "react";
import styled, { css } from "styled-components";
import { Button } from "rimble-ui";
//local imports
// import { HomeDesign } from "../static/ProductIllustrations";
import { phone } from "../helpers/mediaQueries";
// import { BulbIcon, TMIcon, DesignIcon } from "../static/CommonIcons";
import rem from "../helpers/rem";
import Footer from "./Footer";
import Header from "../Header/Header";
import { CardMeta } from "semantic-ui-react";
// import { PlusIcon } from "../../static/Icons";

const LogoStyle = styled.p`
  font-weight: 800;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
  &::selection {
    color: inherit;
  }
`;

const HomeWrapper = styled.div`
  min-height: 766px;
  display: grid;
  grid-gap: 10vh;
`;
const MainLanding = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1152px;
  padding: 20px 15%;
  text-align: center;
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* min-height: 766px; */
  /* display: grid;
  grid-auto-flow: column;
  grid-template-columns: 2.5fr 3fr;
  grid-gap: 3.5vw; */
  /* flex-direction: row; */ /* align-items: center; */
  /* ${phone(css`
    padding: 70px 24px;
  `)}; */
`;

const StrongText = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-size: ${rem(60)};
  font-weight: 500;
  margin: 0 auto;
  max-width: 750px;
  align-self: center;
  line-height: ${rem(65)};
  ${phone(css`
    font-size: ${rem(35)};
    font-weight: 500;
  `)};
`;

const StrongText2 = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-size: ${rem(35)};
  font-weight: 500;
  margin: 0 auto;
  max-width: 750px;
  text-align: center;
  ${phone(css`
    font-size: ${rem(24)};
    font-weight: 500;
  `)};
`;

const IllustrationsWrapper = styled.div`
  width: 40vw;
  ${phone(css`
    width: 80vw;
    align-self: center;
  `)};
`;

const CardsWrapper = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 60px;
  ${phone(css`
    justify-items: center;
    flex-direction: column;
    align-items: space-between;
    margin-bottom: 5vh;
    margin-left: 5vw;
    margin-right: 5vw;
  `)};
`;
const CardContainer = styled.div`
  box-sizing: border-box;
  flex-basis: 33%;
  float: left;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
  width: 33.3333%;
  ${phone(css`
    box-sizing: content-box;
    flex-basis: auto;
    width: auto;
    margin-top: 3vh;
  `)};
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 3px;
  box-shadow: #d8d8d8 0 3px 0 inset, rgba(0, 0, 0, 0.08) 0 5px 9px;
  box-sizing: border-box;
  /* color: #707b7b; */
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 35px 39px 39px;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease-out;
  will-change: transform;
  align-items: center;

  &:hover {
    box-shadow: #6d48e5 0 4px 0 inset, rgba(0, 0, 0, 0.08) 0 8px 14px;
    transform: translateY(-5px);
    /* color: #6d48e5; */
  }
`;

const CardHeader = styled.div`
  box-sizing: border-box;
  font-size: ${rem(30)};
  font-weight: 500;
  margin-top: 8px;
  ${phone(css`
    box-sizing: content-box;
    font-size: ${rem(24)};
  `)};
`;

const CardContent = styled.p`
  text-align: center;
  line-height: 1.5rem;
  font-weight: 300;
`;

const PrimaryButton = styled.a`
  background-color: #3fda97;
  border: 1px solid transparent;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: ${rem(20)};
  font-weight: 600;
  line-height: 1.42857;
  margin-bottom: 0;
  min-width: 8px;
  padding: 8px 16px;
  position: relative;
  text-align: center;
  transition-delay: 0s, 0s, 0s;
  transition-duration: 0.1s, 0.1s, 50ms;
  &:hover {
    background-color: #25c17e;
    outline: 0;
  }
  ${phone(css`
    margin-top: auto;
    margin-bottom: 2vh;
  `)};
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SmallText = styled.p`
  font-size: ${rem(21)};
  line-height: 1.9rem;
  font-weight: 300;
  ${phone(css`
    font-size: ${rem(18)};

    margin-top: 2vh;
    line-height: 1.4rem;
  `)};
`;

const OurPlatformStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* align-self: center; */
`;

const PlatformPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 35%;
  /* justify-content: center; */
`;

const ALinkStyle = styled.a`
  text-decoration: none;
  color: inherit;
  align-self: center;
  &:hover{
    color: inherit;
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Header />
      <MainLanding>
        <CenterWrapper>
          <StrongText>Trademarks on the blockchain, simplified</StrongText>
          <SmallText>
            Blockpied is a Trademark prior use registration platform for
            protecting marks. Minimal cost, Tamper proof and Time stamped.
          </SmallText>
          <ALinkStyle href="/dashboard">
          <Button mainColor="black"> Get Started </Button>
          </ALinkStyle>
        </CenterWrapper>

        {/* <IllustrationsWrapper><HomeDesign /></IllustrationsWrapper> */}
      </MainLanding>

      <PlatformPage>
        <StrongText2>Our Platform</StrongText2>
        <SmallText>Register your Intellectual Property on Blockchain</SmallText>

        <OurPlatformStyle>
          <LogoStyle>BLOCKPIED</LogoStyle>
          <img
            alt=""
            width="160px"
            height="160px"
            src="https://theme.zdassets.com/theme_assets/2313093/ea2a7a1391be00c66d006290df37177233bd1467.png"
          />
        </OurPlatformStyle>
        <ALinkStyle href="https://metamask.io/" target="_blank">
          <Button.Outline>Download Metamask</Button.Outline>
        </ALinkStyle>
      </PlatformPage>
      <div>
        <CardsWrapper>
          <CardContainer>
            <Card>
              {/* <BulbIcon size="42" /> */}
              <CardHeader>Register Trademarks</CardHeader>
              <CardContent>
                Do you know unregistered trademarks also have rights ?
                Click on more below to read more about it. Blockpied allows you to
                register your Trademarks on the go. Safe and secure. Proof of Ownership? Sorted.   
              </CardContent>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              {/* <TMIcon size="42" /> */}
              <CardHeader>Register Copyrights </CardHeader>
              <CardMeta>Coming Soon..</CardMeta>
              <CardContent>
              Blockpied provides a great system for recording rights that are created in “original works of authorship,” 
              which can be anything from a photograph to a book, to a website, to a doctoral thesis, to a movie story. 
              </CardContent>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              {/* <DesignIcon size="42" /> */}
              <CardHeader>Licensing</CardHeader>
              <CardMeta>Coming Soon..</CardMeta>
              <CardContent>
                Blockpied helps you license your Intellectual Property online. 
                You can also transfer ownerhsip to a different parties. 
              </CardContent>
            </Card>
          </CardContainer>
        </CardsWrapper>
      </div>
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
