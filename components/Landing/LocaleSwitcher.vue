<template>
  <div class="select is-pulled-right">
    <select
      @change="onSelectLocale"
      :value="locale"
    >
      <option value="en">English</option>
      <option value="ch">Chinese</option>
    </select>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'LocaleSelector',

  watch: {
    locale: {
      immediate: true,
      handler (val)
      {
        this.$i18n.locale = val
        this.$nuxt._router.push(this.$route.fullPath)
      }
    }
  },

  methods: {
    ...mapActions({
      setLocale: 'config/setLocale'
    }),
    onSelectLocale ()
    {
      const locale = event.target.value
      this.setLocale(locale)
    }
  },

  computed: {
    ...mapGetters({
      locale: 'config/locale'
    })
  }
}
</script>
