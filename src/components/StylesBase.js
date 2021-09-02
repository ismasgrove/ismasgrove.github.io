import { createGlobalStyle } from 'styled-components'

const StylesBase = createGlobalStyle`
    *::-webkit-scrollbar {
        height: 6px;
        width: 6px;
    }  
    *::-webkit-scrollbar-track {
        background: var(--bg-color);
    }
    *::-webkit-scrollbar-thumb {
        background-color: var(--scrollable-color);
    }
    * {
        scrollbar-width: thin;
        scrollbar-color: var(--accents-color) var(--bg-color);
    }
    img {
        font-size: 0px;
    }
    .light {
        --bg-color: #efefef;
        --scrollable-color: #afafaf;
        --accents-color: #dbab18;
        --text-color: #2b3b2e;
        --text-highlights: #bdab22;
        --headers-color: #45343d;
        --text-links: #9c9709;
    }
    .dark {
        --bg-color: #1f1f1f;
        --scrollable-color: #3f3f3f;
        --not-scrollable-color: #5f5f5f;
        --accents-color: #bf0059;
        --text-color: #f1f2f3;
        --text-highlights: #b30b59;
        --headers-color: #ebe6e9;
        --text-links: #bd2d7c;
    }
`

export default StylesBase