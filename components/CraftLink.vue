<template>
  <span>
    <a
      v-if="
        button.type === 'custom' ||
          button.type === 'url' ||
          button.type === 'asset' ||
          button.type === 'email'
      "
      :href="button.url"
      :target="button.target"
    >
      <slot></slot>
    </a>
    <nuxt-link
      v-else
      :to="{ path: button.relative || '/', query: button.query }"
    >
      <slot></slot>
    </nuxt-link>
  </span>
</template>

<script>
  import linkField from '../helpers/linkField'

  export default {
    props: {
      link: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      button() {
        return linkField(this.link)
      }
    }
  }
</script>
