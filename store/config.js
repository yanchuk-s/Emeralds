export const state = () => ({
  locales: ['en', 'ch'],
  locale: 'en'
})

export const getters = {
  locale: (store) => store.locale
}

export const actions = {
  setLocale ({commit}, locale)
  {
    commit('SET_LANG', locale)
  }
}

export const mutations = {
  SET_LANG (state, locale)
  {
    if (state.locales.indexOf(locale) !== -1)
    {
      state.locale = locale
    }
  }
}
