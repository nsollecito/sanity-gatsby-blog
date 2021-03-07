import S from '@sanity/desk-tool/structure-builder'
import blog from './blog'

import IframePreview from '../previews/IframePreview'

import {
  MdSettings,
  MdEdit,
  MdRemoveRedEye
} from "react-icons/md";

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
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages by category')
            .items([
              S.documentTypeListItem('page')
                .title('All pages'),
              // List out all categories
              S.listItem()
                .title('Pages by category')
                .child(
                  // List out all categories
                  S.documentTypeList('category')
                    .title('Pages by category')
                    .child(catId =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('page')
                        .title('Pages')
                        .filter(
                          '_type == "page" && $catId in categories[]._ref'
                        )
                        .params({ catId })
                    )
                )
            ])
        ),
      ...S.documentTypeListItems().filter(
        listItem =>
          !['category', 'author', 'post', 'page', 'siteSettings'].includes(
            listItem.getId()
          )
      )
    ])


export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  // const {schemaType} = props
  return S.document()
    .views([
      S.view.form().icon(MdEdit),
      S.view.component(IframePreview).title('Web Preview').icon(MdRemoveRedEye)
    ])
}