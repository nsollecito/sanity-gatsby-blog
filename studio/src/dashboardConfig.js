export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '601d93dfa96f4c678817c036',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-5kw4xh12',
                  apiId: '3c47d454-da1b-425a-9ffb-532800a4ec58'
                },
                {
                  buildHookId: '601d93df0aa75d5fb594c828',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-z7294eko',
                  apiId: '12942ffd-bca5-4747-97b2-91e8a2d3be0d'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/nsollecito/sanity-gatsby-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-gatsby-blog-web-z7294eko.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
