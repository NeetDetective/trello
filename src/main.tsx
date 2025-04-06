import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
 ${reset}
 * {
   box-sizing: border-box;
 }
 body {
   font-weight: 300;
   font-family: 'Source Sans Pro', sans-serif;
   background-color:${(props) => props.theme.bgColor};
   color: black;
   line-height: 1.2;
 }
 a {
   text-decoration:none;
   color:inherit;
 }
 `;

createRoot(document.getElementById("root")!).render(
  <div>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </div>
);
