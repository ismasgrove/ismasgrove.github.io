import { createGlobalStyle } from 'styled-components'

const StylesBase = createGlobalStyle`
    --text-link: #E767A8;
    .light {
        --bg-color: #fbfbfb;
        --accents-color: #F1F5F9;
        --text-color: #4a3b43;
        --text-highlights: #61306e;
        --headers-color: #45343d;
        --text-links: #bd2d7c;
        --nav-buttons-color: #45343d;
  }
    .dark {
        --bg-color: #2f2f2f;
        --accents-color: #9D8491;
        --text-color: #f1f2f3;
        --text-highlights: #fbfbfb;
        --headers-color: #ebe6e9;
        --text-links: #bd2d7c;
        --nav-buttons-color: #ebe6e9;
    }
`

export default StylesBase