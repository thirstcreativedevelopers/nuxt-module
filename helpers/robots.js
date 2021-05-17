export default () => {
  if (process.env.PREVENT_INDEXING) {
    return {
      UserAgent: '*',
      Disallow: '/'
    }
  }
}
