import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Fonts from "./assets/fonts";

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
    a{
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
