import axios from 'axios'
import { useCache } from '../cache/cache'

const cache = useCache()

export const getData = async (url) => {
  const responseCache = cache.readFromCache(url)
  if (responseCache) return responseCache
  console.log('Refresh data...')
  const { data } = await axios.get(url)
  cache.writeToCache(url, data)
  return data
}
