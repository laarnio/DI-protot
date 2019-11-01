const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
  query {
    dippaBackend {
      product {
        id
      }
    }
  }
`)
  data.dippaBackend.product.forEach(({ id }) => {
    console.log(id);
    actions.createPage({
      path: `products/${id}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        id: id,
      },
    })
  })
}