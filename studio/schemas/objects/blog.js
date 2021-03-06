export default {
  title: 'Blog',
  name: 'blog',
  type: 'object',
  fields: [
    {
      name: 'name', 
      type: 'string', 
      options: {
        layout: 'dropdown',
        list: [
          {value: '/blog', title: 'The Monitor'},
          {value: '/blog/engineering', title: 'Engineering'},
          {value: '/blog/pup-culture', title: 'Pup Culture'},
          {value: '/blog/community', title: 'Community'},
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
