module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Emeralds.com',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'The Vue.js front-end for Emeralds.com - online marketplace for emerald loose stones and custom designed jewelry'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato|Lora|Playfair+Display|Raleway'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&amp;subset=latin-ext'
      },
      {
        crossorigin: 'anonymous',
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
        integrity: 'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp'
      },
      {
        type: 'text/javascript',
        href: 'https://cdn.jsdelivr.net/npm/bulma-extensions@1.0.34/bulma-carousel/dist/js/bulma-carousel.min.js'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bulma-extensions@1.0.34/bulma-carousel/dist/css/bulma-carousel.min.css'
      }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  generate: {
    routes: ['/', '/ch']
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#fa923f', height: '4px', duration: 5000},
  loadingIndicator: {
    name: 'circle',
    color: '#fa923f'
  },
  /*
  ** Global CSS
  */
  css: ['bulma', '~assets/styles/main.css', '~/node_modules/lato-font/css/lato-font.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/lazyLoad.js', '~/plugins/i18n.js'],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-i18n'],
    transition: {
      name: 'fade',
      mode: 'out-in'
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev, isClient})
    {
      if (isDev && isClient)
      {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
    }
  }
}
