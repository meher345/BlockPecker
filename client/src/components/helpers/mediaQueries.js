import { css } from "styled-components";

export const mobile = inner => css`
  @media (max-width: ${999 / 16}em) {
    ${inner};
  }
`;

export const phone = inner => css`
  @media (max-width: ${650 / 16}em) {
    ${inner};
  }
`;

export const web = inner => css`
  @media (min-width: ${1000 / 16}em) {
    ${inner};
  }
`;
