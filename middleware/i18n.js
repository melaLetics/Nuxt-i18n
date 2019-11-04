export default function({ app, store, error, req }) {
  const defaultLocale = app.i18n.fallbackLocale
  // try to get locale from Cookie
  let locale
  if (req) {
    if (req.headers) {
      if (req.headers.cookie) {
        const localeCookie = req.headers.cookie
          .split(';')
          .find((c) => c.trim().startsWith('locale='))
        if (localeCookie) locale = localeCookie.split('=')[1]
      }
      if (!locale) locale = store.state.locale.locale || defaultLocale
    }
  }
  // if not a Cookie getting locale from store
  else locale = store.state.locale.locale || defaultLocale
  if (!store.state.locale.locales.includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.dispatch('locale/setLanguage', locale, { root: true })
  app.i18n.locale = store.state.locale.locale
}
