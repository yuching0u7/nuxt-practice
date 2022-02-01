export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'routing-practice',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/core-component.js', '~plugins/date-filter.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    // proxy: true
    baseURL: 'https://nuxt-practice-1cc8e-default-rtdb.asia-southeast1.firebasedatabase.app'
  },
  loading: {
    color: '#6610f2',
    height: '8 px',
    duration: 5000
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
