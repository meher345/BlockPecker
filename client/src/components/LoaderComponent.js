import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const LoaderComponent = () => (
  <LoaderWrapper>
    <ContentLoader
      height={1440}
      width={1440}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="1440" height="63" />
      <rect x="312" y="20" rx="0" ry="0" width="0" height="0" />
      <rect x="658" y="156" rx="0" ry="0" width="258" height="30" />
      <rect x="661" y="230" rx="0" ry="0" width="251" height="29" />
      <rect x="742" y="300" rx="0" ry="0" width="84" height="21" />
      <rect x="662" y="418" rx="0" ry="0" width="251" height="29" />
      <rect x="742" y="482" rx="0" ry="0" width="84" height="21" />
    </ContentLoader>
  </LoaderWrapper>
);

export default LoaderComponent;
