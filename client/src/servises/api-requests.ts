const API_URL = 'http://localhost:3000/api'

export const request = async (
  rout: string,
  method = 'GET',
  body?: Record<string, any>
) => {
  const url: RequestInfo = API_URL + rout
  const headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  const init: RequestInit = {
    method,
    headers,
    body: JSON.stringify(body) || null
  }
  const response = await fetch(url, init)
  return await response.json()
}
