<template>
  <div class="container">
    <div class="columns">
      <div class="column is-four-fifths">
        <h1 class="title">
          {{ $t('home.title') }}
        </h1>
      </div>
      <div class="column is-pulled-right">
        <locale-switcher/>
      </div>
    </div>
    <div>
      {{ $t('home.introduction') }}
    </div>
    <div>
      <nuxt-link :to="$i18n.path('about')">{{ $t('home.links.about') }}</nuxt-link>
    </div>
    <TrustPilotWidget/>
  </div>
</template>

<script>
import TrustPilotWidget from '@/components/Landing/TrustPilotWidget'
import LocaleSwitcher from '@/components/Landing/LocaleSwitcher'
export default {
  layout: 'default',
  components: {
    TrustPilotWidget,
    LocaleSwitcher
  },
  head ()
  {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('home.meta') }
      ]
    }
  }
}
</script>

<style>

</style>
