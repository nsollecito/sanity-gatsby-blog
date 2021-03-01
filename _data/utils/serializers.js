const imageUrl = require('./imageUrl')

// Learn more on https://www.sanity.io/guides/introduction-to-portable-text
module.exports = {
  types: {
    author: ({node}) => `name: ${node.name}\n  slug: ${node.slug.current}`,
    blog: ({node}) => `${node.name}`,
    code: ({node}) =>
      '```' + node.language + '\n' + node.code + '\n```',
    mainImage: ({node}) => `![${node.alt}](${imageUrl(node).width(600).url()})`
  }
}
