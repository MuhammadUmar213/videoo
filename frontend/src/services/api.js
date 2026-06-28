import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000
})

// Request interceptor - add error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const fetchVideoInfo = async (url) => {
  try {
    const { data } = await api.post('/fetch-info', { url })
    return data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch video info')
  }
}

export const downloadVideo = async (url, format, quality) => {
  try {
    const response = await api.post('/download', { url, format, quality }, {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Download failed')
  }
}

export const getSupportedSites = async () => {
  try {
    const { data } = await api.get('/supported-sites')
    return data
  } catch (error) {
    throw new Error('Failed to fetch supported sites')
  }
}

export const getHealthCheck = async () => {
  try {
    const { data } = await api.get('/health')
    return data
  } catch (error) {
    throw new Error('API is not available')
  }
}

export default api
