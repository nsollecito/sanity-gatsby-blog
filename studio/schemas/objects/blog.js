export default {
  title: 'Blog',
  name: 'blog',
  type: 'object',
  fields: [
    {
      name: 'name', 
      type: 'string', 
      title: 'Blog Name',
      options: {
        layout: 'dropdown',
        list: [
          {value: '/blog', title: 'The Monitor'},
          {value: '/blog/engineering', title: 'Engineering'}
        ]
      }
    },
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}