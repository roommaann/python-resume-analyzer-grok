import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const analyzeResume   = (data)     => api.post('/analyze', data).then(r => r.data)
export const rewriteBullet   = (data)     => api.post('/rewrite', data).then(r => r.data)
export const generateSummary = (data)     => api.post('/generate-summary', data).then(r => r.data)
export const extractPDF      = (formData) => api.post('/extract-pdf', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
}).then(r => r.data)

export default api
