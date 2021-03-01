module.exports = {
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || 'eazrcs7l',
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_READ_TOKEN || '',
    useCdn: false
  }
}
