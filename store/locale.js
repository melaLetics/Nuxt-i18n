import Cookie from 'js-cookie'

export const state = () => ({
  locales: ['en', 'de'],
  locale: 'en',
  loadedLanguages: [
    { key: 'en', description: 'English' },
    { key: 'de', description: 'German' }
  ]
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const actions = {
  setLanguage({ commit }, myLocale) {
    commit('SET_LANG', myLocale)
    Cookie.set('locale', myLocale)
  }
}

export const getters = {
  locale(state) {
    return state.locale
  },
  loadedLanguages(state) {
    return state.loadedLanguages
  }
}
