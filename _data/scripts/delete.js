const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'eazrcs7l',
  dataset: 'production',
  token: 'skRnalMn9aTxS5IbCCTlOggAuf9tU8dPTlWgvgntqWpO0z4LEIj2G43BNRMzfohIKS8AH8TlTLQkaoeQ2oLMHuLgSRLsxxavOz1Xnj4ZUEU4O4AxSV8uV5zKtcpkaM14iHO76DNAf5EVHnDarXt6s9099mW5ksxdPS6fnMJ5NOMc5QnIwEE9', // or leave blank to be anonymous user
  useCdn: false
});

const query = '*[_type == "office"]'
const params = {}

client.fetch(query, params).then(offices => {
  offices.forEach(office => {
      console.log(`Deleting: ${ client.delete(office._id) }`);
  })
})
