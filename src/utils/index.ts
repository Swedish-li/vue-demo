import { BASE_URL } from '@/constant'

export const getUrl = (path: string = '') => `${BASE_URL}${path}`

export * from './filter'
