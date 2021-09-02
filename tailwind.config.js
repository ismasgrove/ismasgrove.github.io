module.exports = {
  purge: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Roboto Mono"', '"Space Mono"', 'monospace']
      },
      backgroundColor: {
        primary: 'var(--bg-color)',
        secondary: 'var(--accents-color)',
      },
      textColor: {
        primary: 'var(--text-color)',
        secondary: 'var(--text-highlights)',
        links: 'var(--text-links)',
        headers: 'var(--headers-color)',
      },
      zIndex: {
        '-1': '-1'
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-color)',
            a: {
              color: 'var(--text-links)',
              '&:hover': {
                color: 'var(--headers-color)'
              }
            },
            strong: {
              color: 'var(--text-highlights)'
            },
            h1: {
              color: 'var(--headers-color)',
              marginTop: '1rem',
              marginBottom: '1rem'
            },
            h2: {
              color: 'var(--headers-color)',
              marginTop: '0.75rem',
              marginBottom: '0.75rem'
            },
            h3: {
              color: 'var(--headers-color)',
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            },
            p: {
              color: 'var(--text-colors)',
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
            },
            button: {
              color: 'var(--nav-buttons-color)'
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
