// Get data from the cache.
export const useCache = ({ cacheName, cacheVersion, cacheLimit }) => {
  const CACHE_NAME = cacheName || 'smartvision'
  const CACHE_VERSION = cacheVersion || 1
  const LIMITE = cacheLimit || 300000

  const getCache = async () => {
    return await caches.open(CACHE_NAME)
  }

  const match = async (cacheStorage, url) => {
    return await cacheStorage.match(url)
  }

  const isExpired = (cachedResponse) => {
    const date = new Date(cachedResponse.headers.get('date'))
    if (Date.now() > date.getTime() + LIMITE) return true
  }

  const getCachedData = async (url) => {
    const cacheStorage = await getCache()
    const cachedResponse = await match(cacheStorage, url)

    if (!cachedResponse || !cachedResponse.ok) return undefined

    return await cachedResponse.json()
  }

  const setCacheData = async (url, response) => {
    const cacheStorage = await getCache()
    await cacheStorage.put(url, response)
  }

  return {
    getCache,
    match,
    isExpired,
    getCachedData,
    setCacheData,
  }
}
