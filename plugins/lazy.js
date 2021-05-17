import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '<%= options.error %>',
  loading: '<%= options.loading %>',
  attempt: 1
})
