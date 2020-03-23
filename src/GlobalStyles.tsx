import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Fonts from "./assets/fonts";
import theme from "./theme";

const globalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'DungGeunMo';
        src: url(${Fonts.DGMEot});
        src: url(${Fonts.DGMWoff2}) format('woff2'),
            url(${Fonts.DGMWoff}) format('woff'),
            url(${Fonts.DGMTtf}) format('truetype');
    }
    *{
        box-sizing: border-box;
    }
    html, body, pre, code, kbd, samp {
        font-family: 'DungGeunMo';
    }
    body, input {
        background-color: ${theme.whiteColor};
    }
    a,
    a:hover,
    a:active{
        text-decoration: none;
        color: inherit;
    }
    input, button, textarea { 
        &:focus, &:active { 
            outline: none; 
        } 
    }
`;

export default globalStyle;
