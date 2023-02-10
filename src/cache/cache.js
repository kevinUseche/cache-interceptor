const getMilliseconds = (minutes) => minutes * 60000

export const useCache = (limit = undefined) => {
  const DEFAULT_MINUTES = 5
  const TIME_LIMIT = limit || getMilliseconds(DEFAULT_MINUTES)

  const writeToCache = (url, data) => {
    window.localStorage.setItem(
      url,
      JSON.stringify({
        expiration: Date.now() + TIME_LIMIT,
        data,
      })
    )
  }

  const readFromCache = (url) => {
    const responseCache = JSON.parse(window.localStorage.getItem(url)) || null
    if (responseCache) {
      const { expiration, data } = responseCache
      if (Date.now() <= expiration) return data
    }
    return null
  }

  return { readFromCache, writeToCache }
}
