import S from '@sanity/desk-tool/structure-builder'
import blog from './blog'

import { MdSettings } from "react-icons/md";

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      blog,
      ...S.documentTypeListItems().filter(
        listItem =>
          !['category', 'author', 'post', 'siteSettings'].includes(
            listItem.getId()
          )
      )
    ])
