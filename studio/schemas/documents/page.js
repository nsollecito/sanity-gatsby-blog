import fields from './_pageDefaults'
import MdFormatAlignLeft from "react-icons/md";

export default {
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: MdFormatAlignLeft,
  fields: [
    ...fields,
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      isUnique: true,
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      description: 'These values populate meta tags',
      type: 'openGraph',
      options: {
        collapsable: true,
        collapsed: true
      }
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'hero' },
        { type: 'infoRows' },
        { type: 'uiComponentRef' },
        { type: 'ctaColumns' },
        { type: 'ctaPlug' },
      ],
    },
  ],
}