import axios from 'axios'
import { useCache } from './cache'

const cache = useCache({
  cacheName: 'prueba-1',
  cacheVersion: 1,
})

export const getData = async (url) => {
  const data = await cache.getCachedData(url)
  if (data) return data
  console.log('Refresh data...')
  const response = await fetch(url)
  if (!response.ok) throw Error('Error getData')
  await cache.setCacheData(url, response)
  return await response.json()
}
