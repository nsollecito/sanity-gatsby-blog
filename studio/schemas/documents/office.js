import { BiBuildings } from 'react-icons/bi'

export default {
  name: 'office',
  type: 'document',
  title: 'Office',
  icon: BiBuildings,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: "headquarter",
      type: "object",
      title: "Headquarters",
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            layout: 'dropdown',
            list: [
              {title: 'Global', value: 'global'},
              {title: 'Regional', value: 'regional'}
            ]
          }
        },
        {
          name: 'desktop_image',
          type: 'mainImage',
          title: 'Desktop Image'
        },
        {
          name: 'mobile_image',
          type: 'image',
          title: 'Mobile Image'
        }
      ]
    },
    {
      name: 'street',
      type: 'string',
      title: 'Street'
    },
    {
      name: 'street_two',
      type: 'string',
      title: 'Street (cont)'
    },
    {
      name: 'city',
      type: 'string',
      title: 'City'
    },
    {
      name: 'state',
      type: 'string',
      title: 'State'
    },
    {
      name: 'post_code',
      type: 'string',
      title: 'Postal Code'
    },
    {
      name: 'country',
      type: 'string',
      title: 'Country'
    },
    {
      name: 'region',
      type: 'string',
      title: 'Region',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'APAC', value: 'apac'},
          {title: 'EMEA', value: 'emea'},
          {title: 'North America', value: 'north_america'}
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'street',
      media: 'headquarter.mobile_image'
    }
  }
}
