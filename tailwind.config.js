module.exports = {
  purge: ['./src/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      mono: ['Consolas']
    },
    extend: {
      zIndex: {
        '-1': '-1'
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              marginTop: '1rem',
              marginBottom: '1rem'
            },
            h2: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem'
            },
            h3: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            },
            p: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            },
            ul: {
              marginTop: '0.4rem',
              marginBottom: '0.75rem'
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem'
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  corePlugins: {
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
