// import components here
import craftLink from './components/CraftLink.vue'

const { resolve, join } = require('path')
const { readdirSync } = require('fs')

export default function ThirstModule(moduleOptions) {
  const OPTIONS = this.options
  const namespace = 'thirst'

  const { lottie = true } = {
    ...moduleOptions,
    ...this.options.thirst,
  }

  // Config
  // 1 - Env file defaults
  this.options.env = {
    API_ENDPOINT: process.env.API_ENDPOINT,
    URL: process.env.URL,
    ...this.options.env,
  }

  // 2 - Scripts
  // 2.a - Lottie
  // TODO: Write doco option lottie
  if (lottie) {
    // fix for IE 11
    this.options.head.script.push({
      src: 'https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-loader.js',
    })
    this.options.head.script.push({
      async: false,
      defer: false,
      src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
    })
  }

  // 3 - Server
  // this.options.server = {
  //   port: 3000,
  //   host: process.env.CROSS_DEVICE_TESTING === '1' ? '0.0.0.0' : 'localhost',
  // }

  // 4 - Middleware
  // this.addPlugin({
  //   src: resolve(__dirname, 'middleware/globals.js'),
  //   fileName: join(namespace, 'middleware/globals.js'),
  // })

  // 5 Modules
  // 5-1 - Router
  this.addModule(
    [
      '@nuxtjs/router',
      {
        keepDefaultRouter: true,
      },
    ],
    true
  )
  // 5-2 - Netlify
  this.addModule('@nuxtjs/netlify-files')

  // 5-3 - GTM
  this.addModule(['@nuxtjs/google-tag-manager', { id: process.env.GTM || '' }])

  // 5-4 - SVG
  this.addModule('@nuxtjs/svg')

  // 5-5 - Portal Vue
  this.addModule('portal-vue/nuxt')

  // 5-6 - Robot
  this.addModule('@nuxtjs/robots')
  this.options.robots = require('./helpers/robots')

  // 5-7 - Axios
  this.addModule('@nuxtjs/axios')

  // 5-8 Sitemap
  this.addModule('@nuxtjs/sitemap')

  // PLUGINS
  // 1 - Lazy loading
  // TODO: Write doco option Lazy loading

  this.addPlugin({
    src: resolve(__dirname, 'plugins/lazy.js'),
    mode: 'client',
    options: OPTIONS.lazyLoading,
    fileName: join(namespace, 'plugins/lazy.js'),
  })

  this.options.storybook = {
    addons: ['@storybook/addon-controls', '@storybook/addon-notes'],
  }

  this.options.build = Object.assign(this.options.build, {
    /*
     ** You can extend webpack config here
     */
    transpile: [
      ...this.options.build.transpile,
      'lodash-es',
      '@nuxtjs/svg',
      '~/module/thirst',
    ],
  })

  this.extendBuild((config, { isClient, isServer }) => {
    if (!config.module.rules) {
      console.log(config)
      return
    }
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
  })

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['helpers']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
      })
    }
  }
}

export const CraftLink = craftLink

module.exports.meta = require('./package.json')
