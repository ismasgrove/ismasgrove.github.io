import { createGlobalStyle } from 'styled-components'

const StylesBase = createGlobalStyle`
    .light {
        --bg-primary: #FFFFFF;
        --bg-secondary: #F1F5F9;
        --text-primary: #475569;
        --text-secondary: #1E293B;
        --color-primary: #E11D48;
  }
    .dark {
        --bg-primary: #0F172A;
        --bg-secondary: #1E293B;
        --text-primary: #CBD5E1;
        --text-secondary: #FFFFFF;
        --color-primary: #2563EB;
    }
`

export default StylesBase