// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'


// document schemas
import author from './documents/author'
import category from './documents/category'
import office from './documents/office'
import page from './documents/page'
import post from './documents/post'
import siteSettings from './documents/siteSettings'

// Object types
import authorReference from './objects/authorReference'
import bioPortableText from './objects/bioPortableText'
import blog from './objects/blog'
import bodyPortableText from './objects/bodyPortableText'
import cta from './objects/cta'
import excerptPortableText from './objects/excerptPortableText'
import link from './objects/link'
import localeString from './objects/localeString'
import mainImage from './objects/mainImage'
import openGraph from './objects/openGraph'
import simpleBlockContent from './objects/simpleBlockContent'

// plugs 
import * as plugs from './plugs'
import plugDefaultFields from './plugs/_plugDefaultFields'

const allPlugs = Object.values(plugs).map((plug) => {
  return { ...plug, fields: plugDefaultFields.concat(plug.fields) }
})

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    author,
    category,
    office,
    page,
    post,
    siteSettings,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    authorReference,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,
    blog,
    cta,
    link,
    localeString,
    mainImage,
    openGraph,
    simpleBlockContent
  ])
  .concat(allPlugs)
})
