
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(glsl|vert|frag|vs|fs)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader'
          ]
        }
      ]
    }
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  await graphql(`
    query {
        allMarkdownRemark {
            edges {
                node {
                   fields {
                     slug
                   }
                }
            }
        }
    }
  `).then((result) => {
    if (result.errors) {
      reporter.panicOnBuild('Error while running GraphQL query.')
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: require('path').resolve('src/templates/content.js'),
        context: {
          slug: node.fields.slug
        }
      })
    })
  })
}
