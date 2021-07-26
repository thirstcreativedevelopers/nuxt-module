const URI = require('uri-js')

export default (data) => ({
  ...data,
  get URL() {
    return URI.parse(data.url || data.uri || process.env.URL || '/')
  },
  get hash() {
    return this.URL.hash
  },
  get query() {
    if (!data) return '/'

    // Process client means that it's only
    // ran in the browser
    if (data.url) {
      const search = this.URL.query

      if (!search) return {}

      const object = JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value)
        }
      )
      delete object.token
      return object
    }
  },
  get relative() {
    if (!data) return '/'

    // Process client means that it's only
    // ran in the browser
    return this.URL.path
  },
})
