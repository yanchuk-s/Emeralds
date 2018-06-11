<template>
  <div class="container">
    {{ $t('about.introduction') }}
    <div>
      <nuxt-link :to="$i18n.path('')">{{ $t('about.links.home') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  head ()
  {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('about.meta') }
      ]
    }
  }
}
</script>

<style>

</style>
