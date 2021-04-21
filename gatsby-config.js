/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'ismasgrove'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('./tailwind.config.js')
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        // eslint-disable-next-line node/no-path-concat
        path: `${__dirname}/src/`
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ismasgrove',
        start_url: '/',
        icon: 'src/images/icon-by-javier-guerrero-diaz-javier.png'
      }
    }
  ]
}
