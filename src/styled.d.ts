import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    boardColor: string;
    cardColor: string;
  }
}
